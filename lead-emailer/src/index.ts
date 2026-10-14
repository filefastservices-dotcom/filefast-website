import "dotenv/config";
import os from "node:os";
import cron from "node-cron";
import { loadConfig } from "./config.js";
import { LeadStore } from "./mongo.js";
import { createEmailProvider, createUnsubscribeLink, renderEmail, sendWithRetry } from "./emailer.js";
import { startHealthServer, emailsSent, emailsFailed, emailsInFlight } from "./health.js";
import { log } from "./logger.js";

export interface CliOptions { once: boolean; cronExpression?: string; dryRun: boolean; limit?: number; }
export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = { once: false, dryRun: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === "--once") options.once = true;
    else if (arg === "--cron") {
      const next = args[i + 1];
      if (!next || next.startsWith("--")) throw new Error('--cron requires an expression, e.g. "--cron \\"*/5 * * * *\\""');
      options.cronExpression = next; i++;
    } else if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("--limit=")) {
      const n = Number(arg.slice(8));
      if (!Number.isInteger(n) || n < 1) throw new Error("--limit must be a positive integer");
      options.limit = n;
    } else if (arg === "--help") {
      console.log('Usage: npm run start -- --once | --cron "*/5 * * * *" [--dry-run] [--limit=N]');
      process.exit(0);
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.once && options.cronExpression) throw new Error("Use --once or --cron, not both");
  if (!options.once && !options.cronExpression) options.once = true;
  if (options.cronExpression && !cron.validate(options.cronExpression)) throw new Error("Invalid cron expression");
  return options;
}
export async function main(args = process.argv.slice(2)): Promise<void> {
  const options = parseArgs(args);
  const config = loadConfig();
  const workerId = config.WORKER_ID || `${os.hostname()}-${process.pid}`;
  const db = new LeadStore(config, workerId);
  const provider = createEmailProvider(config);
  let healthServer: ReturnType<typeof startHealthServer> | undefined;
  let stopping = false;
  await db.connect();
  if (options.cronExpression) healthServer = startHealthServer(db, provider, config.PORT);
  const runBatch = async (): Promise<void> => {
    const limit = options.limit ?? config.BATCH_SIZE;
    const leads = await db.claimBatch(limit);
    let sent = 0; let failed = 0; let dryRunCount = 0;
    for (const lead of leads) {
      const leadId = String(lead._id);
      const email = String(lead.email || "").trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        await db.markFailed(lead._id, new Error("Missing or invalid email address"), false, config.MAX_RETRIES);
        emailsFailed.inc(); failed++;
        log("warn", "email_failed", { lead_id: leadId, email: email || null, status: "failed", error: "Missing or invalid email address" });
        continue;
      }
      if (lead.email_unsubscribed) { await db.releaseClaim(lead._id); continue; }
      const message = { to: email, ...renderEmail(lead, createUnsubscribeLink(config, lead)) };
      if (options.dryRun || config.DRY_RUN) {
        await db.releaseClaim(lead._id); dryRunCount++;
        log("info", "email_dry_run", { lead_id: leadId, email, status: "dry_run", provider: provider.name, subject: message.subject });
        continue;
      }
      emailsInFlight.inc();
      try {
        const response = await sendWithRetry({
          ...provider,
          async send(payload) {
            // Rolling per-process minute limiter; one worker is expected per queue partition.
            await rateLimiter.wait(config.MAX_PER_MINUTE);
            return provider.send(payload);
          }
        }, message, config.MAX_RETRIES);
        await db.markSent(lead._id, response as unknown as Record<string, unknown>);
        emailsSent.inc(); sent++;
        log("info", "email_sent", { lead_id: leadId, email, status: "sent", provider: provider.name, provider_response: response });
      } catch (error) {
        const e = error as { message?: string; code?: string; statusCode?: number };
        const retryable = Boolean(e.code && ["ETIMEDOUT", "ECONNECTION", "ECONNRESET", "ESOCKET", "EAI_AGAIN"].includes(e.code)) || Number(e.statusCode) === 429 || Number(e.statusCode) >= 500;
        await db.markFailed(lead._id, error, retryable, config.MAX_RETRIES);
        emailsFailed.inc(); failed++;
        log("error", "email_failed", { lead_id: leadId, email, status: "failed", provider: provider.name, error: e.message, code: e.code, status_code: e.statusCode });
        if (failed >= 5) await sendSlackAlert(process.env.SLACK_WEBHOOK_URL, { event: "repeated_email_failures", failed, batch_size: leads.length });
      } finally { emailsInFlight.dec(); }
    }
    log("info", "batch_finished", { claimed: leads.length, sent, failed, dry_run: dryRunCount, worker_id: workerId });
  };
  const shutdown = async (signal: string): Promise<void> => {
    if (stopping) return;
    stopping = true;
    log("info", "shutdown_started", { signal });
    if (healthServer) await new Promise<void>((resolve) => healthServer!.close(() => resolve()));
    await provider.close(); await db.close();
  };
  const onSignal = (signal: NodeJS.Signals) => { void shutdown(signal).finally(() => process.exit(0)); };
  process.once("SIGINT", onSignal); process.once("SIGTERM", onSignal);
  try {
    if (options.once) await runBatch();
    else {
      await runBatch();
      if (options.cronExpression) {
        cron.schedule(options.cronExpression, () => { void runBatch().catch((error) => log("error", "batch_error", { error: String(error) })); });
        await new Promise<void>((resolve) => { process.once("SIGINT", resolve); process.once("SIGTERM", resolve); });
      }
    }
  } finally {
    if (options.once) { await provider.close(); await db.close(); }
  }
}
const rateLimiter = {
  sentAt: [] as number[],
  async wait(maxPerMinute: number) {
    for (;;) {
      const now = Date.now(); this.sentAt = this.sentAt.filter((stamp) => now - stamp < 60000);
      if (this.sentAt.length < maxPerMinute) { this.sentAt.push(now); return; }
      await new Promise((resolve) => setTimeout(resolve, Math.max(50, 60000 - (now - this.sentAt[0]!))));
    }
  }
};
async function sendSlackAlert(webhook: string | undefined, payload: Record<string, unknown>): Promise<void> {
  if (!webhook) return;
  try {
    const response = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: `FileFast lead emailer alert: ${JSON.stringify(payload)}` }) });
    if (!response.ok) log("warn", "slack_alert_failed", { status_code: response.status });
  } catch (error) { log("warn", "slack_alert_failed", { error: String(error) }); }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => { log("error", "startup_failed", { error: error instanceof Error ? error.message : String(error) }); process.exitCode = 1; });
}
