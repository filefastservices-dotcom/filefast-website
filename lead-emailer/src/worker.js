"use strict";

const { buildUnsubscribeUrl } = require("./unsubscribe");
const { renderEmail } = require("./templates");
const { log } = require("./logger");

function createWorker({ db, emailer, config, metrics, send = (message) => emailer.send(message), sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) }) {
  let lastSentAt = [];
  async function rateLimit() {
    const now = Date.now();
    lastSentAt = lastSentAt.filter((time) => now - time < 60000);
    if (lastSentAt.length >= config.MAX_PER_MINUTE) {
      const waitMs = Math.max(0, 60000 - (now - lastSentAt[0]));
      await sleep(waitMs);
      return rateLimit();
    }
    lastSentAt.push(Date.now());
  }
  async function processLead(lead, { dryRun = config.DRY_RUN } = {}) {
    const leadId = String(lead._id);
    const email = String(lead.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await db.markFailed(lead._id, new Error("Lead has missing or invalid email"), false, config.MAX_RETRIES);
      metrics.failed.inc();
      log("warn", "email_skipped_invalid_address", { lead_id: leadId, email: email || null, status: "failed" });
      return "failed";
    }
    const unsubscribeUrl = buildUnsubscribeUrl(config.UNSUBSCRIBE_BASE_URL, leadId, email, config.UNSUBSCRIBE_SECRET);
    const rendered = renderEmail(lead, unsubscribeUrl);
    const message = { to: email, ...rendered, leadId };
    if (dryRun) {
      log("info", "email_dry_run", { lead_id: leadId, email, provider: emailer.provider, status: "dry_run", subject: rendered.subject });
      // Do not mutate lead status in dry-run; release the claim for a later real run.
      await db.releaseClaim(lead._id);
      return "dry_run";
    }
    let attempt = 0;
    while (true) {
      await rateLimit();
      metrics.inFlight.inc();
      try {
        const response = await send(message);
        await db.markSent(lead._id, response);
        metrics.sent.inc();
        log("info", "email_sent", { lead_id: leadId, email, provider: emailer.provider, status: "sent", provider_response: response, attempt: attempt + 1 });
        return "sent";
      } catch (error) {
        const retryable = require("./mongo").isRetryable(error);
        if (retryable && attempt < config.MAX_RETRIES) {
          const delay = config.RETRY_BASE_DELAY_MS * (2 ** attempt) + Math.floor(Math.random() * 250);
          log("warn", "email_retry", { lead_id: leadId, email, provider: emailer.provider, attempt: attempt + 1, retry_in_ms: delay, error: String(error.message || error) });
          attempt += 1;
          await sleep(delay);
          continue;
        }
        await db.markFailed(lead._id, error, retryable, config.MAX_RETRIES);
        metrics.failed.inc();
        log("error", "email_failed", { lead_id: leadId, email, provider: emailer.provider, status: "failed", error: String(error.message || error), code: error.code, status_code: error.statusCode, attempt: attempt + 1 });
        return "failed";
      } finally {
        metrics.inFlight.dec();
      }
    }
  }
  async function runOnce({ limit = config.BATCH_SIZE, dryRun = config.DRY_RUN } = {}) {
    const leads = await db.claimBatch(limit);
    const totals = { claimed: leads.length, sent: 0, failed: 0, dry_run: 0 };
    for (const lead of leads) {
      const result = await processLead(lead, { dryRun });
      if (Object.prototype.hasOwnProperty.call(totals, result)) totals[result] += 1;
    }
    log("info", "batch_finished", totals);
    return totals;
  }
  return { runOnce, processLead };
}

module.exports = { createWorker };
