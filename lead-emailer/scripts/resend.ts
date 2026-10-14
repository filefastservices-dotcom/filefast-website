import "dotenv/config";
import { loadConfig } from "../src/config.js";
import { LeadStore } from "../src/mongo.js";
import { createEmailProvider, createUnsubscribeLink, renderEmail, sendWithRetry } from "../src/emailer.js";
import { log } from "../src/logger.js";

async function run(): Promise<void> {
  const idIndex = process.argv.indexOf("--id");
  const id = idIndex >= 0 ? process.argv[idIndex + 1] : undefined;
  const dryRun = process.argv.includes("--dry-run");
  if (!id) throw new Error("Usage: npm run resend -- --id <leadId> [--dry-run]");
  const config = loadConfig();
  const db = new LeadStore(config, `resend-${process.pid}`);
  const provider = createEmailProvider(config);
  try {
    await db.connect();
    const lead = await db.findById(id);
    if (!lead) throw new Error(`Lead not found: ${id}`);
    const claim = await db.leads.updateOne({ _id: lead._id, email_status: { $in: ["new", "retry", "failed", "sent"] } }, {
      $set: { email_status: "pending", worker_id: db.workerId, last_attempt_at: new Date() }, $inc: { attempts: 1 }
    });
    if (!claim.modifiedCount) throw new Error("Lead is already pending or could not be claimed; refusing duplicate send");
    if (dryRun) {
      await db.releaseClaim(lead._id);
      log("info", "resend_dry_run", { lead_id: String(lead._id), email: lead.email });
      return;
    }
    const payload = { to: lead.email, ...renderEmail(lead, createUnsubscribeLink(config, lead)) };
    const response = await sendWithRetry(provider, payload, config.MAX_RETRIES);
    await db.markSent(lead._id, response as unknown as Record<string, unknown>);
    log("info", "resend_sent", { lead_id: String(lead._id), email: lead.email, status: "sent", provider_response: response });
  } finally { await provider.close(); await db.close(); }
}
run().catch((error) => { log("error", "resend_failed", { error: error instanceof Error ? error.message : String(error) }); process.exitCode = 1; });
