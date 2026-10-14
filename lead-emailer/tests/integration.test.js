"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const { SMTPServer } = require("smtp-server");
const { loadConfig } = require("../src/config");
const { createMongo } = require("../src/mongo");
const { createEmailer } = require("../src/emailer");
const { createWorker } = require("../src/worker");
const metrics = require("../src/metrics");

test("integration: claims a Mongo lead and sends through mock SMTP", { skip: !process.env.MONGODB_TEST_URI }, async () => {
  const uri = process.env.MONGODB_TEST_URI;
  const server = new SMTPServer({ authOptional: true, disabledCommands: ["STARTTLS"], onData(_stream, _session, callback) { callback(null); } });
  await new Promise((resolve, reject) => server.listen(0, "127.0.0.1", (err) => err ? reject(err) : resolve()));
  const port = server.server.address().port;
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = "filefast_emailer_test";
  const collection = client.db(dbName).collection("leads");
  const inserted = await collection.insertOne({ email: "integration@example.com", name: "Integration", service: "GST", email_status: "new", createdAt: new Date() });
  const config = loadConfig({
    MONGODB_URI: uri, MONGODB_DB: dbName, MONGODB_COLLECTION: "leads", EMAIL_PROVIDER: "smtp",
    SMTP_HOST: "127.0.0.1", SMTP_PORT: String(port), SMTP_USER: "test", SMTP_PASS: "test",
    FROM_EMAIL: "sender@example.com", FROM_NAME: "Test", UNSUBSCRIBE_BASE_URL: "http://localhost/unsubscribe",
    UNSUBSCRIBE_SECRET: "x".repeat(32), MAX_PER_MINUTE: "100", BATCH_SIZE: "5"
  });
  const db = createMongo(config);
  const emailer = createEmailer(config, { transport: nodemailer.createTransport({ host: "127.0.0.1", port, secure: false, ignoreTLS: true, auth: { user: "test", pass: "test" } }) });
  try {
    await db.connect();
    const worker = createWorker({ db, emailer, config, metrics });
    const result = await worker.runOnce({ limit: 5 });
    assert.equal(result.sent, 1);
    assert.equal((await collection.findOne({ _id: inserted.insertedId })).email_status, "sent");
  } finally {
    await db.close();
    await client.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
