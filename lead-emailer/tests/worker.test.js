"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { createWorker } = require("../src/worker");

function fixture(send) {
  const updates = [];
  const lead = { _id: "lead-1", email: "client@example.com", name: "Client", service: "GST" };
  const db = {
    markSent: async (...args) => updates.push(["sent", ...args]),
    markFailed: async (...args) => updates.push(["failed", ...args]),
    releaseClaim: async (...args) => updates.push(["released", ...args]),
    claimBatch: async () => [lead]
  };
  const metrics = { sent: { inc() {} }, failed: { inc() {} }, inFlight: { inc() {}, dec() {} } };
  const config = { UNSUBSCRIBE_BASE_URL: "https://example.com/unsubscribe", UNSUBSCRIBE_SECRET: "x".repeat(32), MAX_PER_MINUTE: 100, MAX_RETRIES: 0, RETRY_BASE_DELAY_MS: 1, DRY_RUN: false };
  return { worker: createWorker({ db, emailer: { provider: "mock" }, config, metrics, send, sleep: async () => {} }), updates };
}

test("marks lead sent when mocked provider succeeds", async () => {
  const { worker, updates } = fixture(async () => ({ messageId: "mock-id" }));
  assert.equal(await worker.processLead({ _id: "lead-1", email: "client@example.com" }), "sent");
  assert.equal(updates[0][0], "sent");
});
test("marks lead failed when mocked provider rejects", async () => {
  const { worker, updates } = fixture(async () => { const e = new Error("mock fail"); e.statusCode = 400; throw e; });
  assert.equal(await worker.processLead({ _id: "lead-1", email: "client@example.com" }), "failed");
  assert.equal(updates[0][0], "failed");
});
