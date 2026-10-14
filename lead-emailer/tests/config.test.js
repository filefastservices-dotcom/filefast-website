"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadConfig } = require("../src/config");

const valid = {
  MONGODB_URI: "mongodb://localhost:27017",
  MONGODB_DB: "test",
  MONGODB_COLLECTION: "leads",
  EMAIL_PROVIDER: "smtp",
  SMTP_HOST: "localhost",
  SMTP_PORT: "1025",
  SMTP_USER: "user",
  SMTP_PASS: "pass",
  FROM_EMAIL: "sender@example.com",
  UNSUBSCRIBE_BASE_URL: "https://example.com/unsubscribe",
  UNSUBSCRIBE_SECRET: "x".repeat(40)
};

test("loads valid SMTP configuration", () => {
  const config = loadConfig(valid);
  assert.equal(config.EMAIL_PROVIDER, "smtp");
  assert.equal(config.BATCH_SIZE, 25);
});
test("fails fast when required configuration is missing", () => {
  assert.throws(() => loadConfig({}), /MONGODB_URI/);
});
test("requires a SendGrid key for SendGrid", () => {
  assert.throws(() => loadConfig({ ...valid, EMAIL_PROVIDER: "sendgrid", SENDGRID_API_KEY: "" }), /SENDGRID_API_KEY/);
});
test("rejects weak unsubscribe secrets", () => {
  assert.throws(() => loadConfig({ ...valid, UNSUBSCRIBE_SECRET: "short" }), /at least 32 characters/);
});
test("rejects unsupported provider", () => {
  assert.throws(() => loadConfig({ ...valid, EMAIL_PROVIDER: "mailgun" }), /smtp or sendgrid/);
});
