import { describe, it, expect } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, ObjectId } from "mongodb";
import { LeadStore } from "../src/mongo.js";
import { loadConfig } from "../src/config.js";

describe.skipIf(process.env.RUN_INTEGRATION !== "true")("Mongo integration", () => {
  it("atomically claims new leads and persists status", async () => {
    const memory = await MongoMemoryServer.create();
    const uri = memory.getUri();
    const config = loadConfig({
      MONGODB_URI: uri, MONGODB_DB: "integration", MONGODB_COLLECTION: "leads", EMAIL_PROVIDER: "smtp",
      SMTP_HOST: "localhost", SMTP_USER: "u", SMTP_PASS: "p", FROM_EMAIL: "a@example.com",
      UNSUBSCRIBE_BASE_URL: "https://example.com/unsubscribe", HMAC_SECRET: "x".repeat(32)
    });
    const client = new MongoClient(uri); await client.connect();
    const collection = client.db("integration").collection("leads");
    const id = new ObjectId();
    await collection.insertOne({ _id: id, name: "Test", email: "test@example.com", service: "GST", source: "integration", created_at: new Date(), email_status: "new", attempts: 0, last_attempt_at: null, email_response: null });
    const store = new LeadStore(config, "worker-test");
    try {
      await store.connect();
      const claimed = await store.claimBatch(5);
      expect(claimed).toHaveLength(1);
      expect(claimed[0]?.email_status).toBe("pending");
      expect(claimed[0]?.worker_id).toBe("worker-test");
      expect(await store.claimBatch(5)).toHaveLength(0);
    } finally { await store.close(); await client.close(); await memory.stop(); }
  });
});
