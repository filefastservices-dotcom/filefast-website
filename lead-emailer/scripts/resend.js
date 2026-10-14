"use strict";

require("dotenv").config();
const { loadConfig } = require("../src/config");
const { createMongo } = require("../src/mongo");
const { createEmailer } = require("../src/emailer");
const { createWorker } = require("../src/worker");
const metrics = require("../src/metrics");

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("Usage: node scripts/resend.js <lead-id> [--dry-run]");
  const dryRun = process.argv.includes("--dry-run");
  const config = loadConfig();
  const db = createMongo(config);
  const emailer = createEmailer(config);
  try {
    await db.connect();
    const lead = await db.findById(id);
    if (!lead) throw new Error(`Lead not found: ${id}`);
    if (!lead.email) throw new Error("Lead has no email address");
    // Explicitly claim this lead; the worker's send path only finalizes pending records.
    const claimed = await db.collection.updateOne(
      { _id: lead._id, email_status: { $ne: "pending" } },
      { $set: { email_status: "pending", last_attempt_at: new Date() }, $inc: { attempts: 1 } }
    );
    if (!claimed.modifiedCount) throw new Error("Lead is pending in another worker; refusing duplicate send");
    const worker = createWorker({ db, emailer, config, metrics });
    await worker.processLead({ ...lead, email_status: "pending" }, { dryRun });
  } finally {
    await emailer.close();
    await db.close();
  }
}
main().catch((error) => { console.error(JSON.stringify({ level: "error", event: "resend_failed", error: error.message })); process.exitCode = 1; });
