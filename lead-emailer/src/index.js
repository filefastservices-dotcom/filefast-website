"use strict";

require("dotenv").config();
const { loadConfig } = require("./config");
const { createMongo } = require("./mongo");
const { createEmailer } = require("./emailer");
const { createWorker } = require("./worker");
const metrics = require("./metrics");
const { startHealthServer } = require("./health");
const { log } = require("./logger");

function parseArgs(argv) {
  const options = { once: false, cron: false, dryRun: false, limit: undefined };
  for (const arg of argv) {
    if (arg === "--once") options.once = true;
    else if (arg === "--cron") options.cron = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("--limit=")) {
      const value = Number(arg.slice("--limit=".length));
      if (!Number.isInteger(value) || value < 1) throw new Error("--limit must be a positive integer");
      options.limit = value;
    } else if (arg === "--help") {
      console.log("Usage: node src/index.js [--once|--cron] [--dry-run] [--limit=N]");
      process.exit(0);
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.once && options.cron) throw new Error("Use either --once or --cron, not both");
  if (!options.once && !options.cron) options.once = true;
  return options;
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const config = loadConfig();
  const db = createMongo(config);
  const emailer = createEmailer(config);
  let stopHealth = async () => {};
  let stopping = false;
  try {
    await db.connect();
    const worker = createWorker({ db, emailer, config, metrics });
    if (options.cron) stopHealth = startHealthServer({ db, emailer, metrics, port: config.HEALTH_PORT });
    const run = async () => {
      try { await worker.runOnce({ limit: options.limit, dryRun: options.dryRun }); }
      catch (error) { log("error", "batch_error", { error: String(error.message || error) }); }
    };
    if (options.once) {
      await worker.runOnce({ limit: options.limit, dryRun: options.dryRun });
    } else {
      await run();
      const timer = setInterval(run, config.POLL_INTERVAL_MS);
      const shutdown = async (signal) => {
        if (stopping) return;
        stopping = true;
        clearInterval(timer);
        log("info", "shutdown_started", { signal });
        await stopHealth();
        await emailer.close();
        await db.close();
        process.exit(0);
      };
      process.once("SIGINT", shutdown);
      process.once("SIGTERM", shutdown);
      await new Promise((resolve) => {
        process.once("SIGINT", resolve);
        process.once("SIGTERM", resolve);
      });
    }
  } finally {
    if (options.once) {
      await emailer.close();
      await db.close();
    }
  }
}

if (require.main === module) {
  main().catch((error) => {
    log("error", "startup_failed", { error: String(error.message || error) });
    process.exitCode = 1;
  });
}

module.exports = { parseArgs, main };
