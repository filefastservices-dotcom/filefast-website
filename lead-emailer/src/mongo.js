"use strict";

const { MongoClient, ObjectId } = require("mongodb");

function createMongo(config, { MongoClientClass = MongoClient } = {}) {
  const client = new MongoClientClass(config.MONGODB_URI, {
    maxPoolSize: config.MONGODB_MAX_POOL_SIZE,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    retryWrites: true
  });
  let collection;
  return {
    async connect() {
      await client.connect();
      const db = client.db(config.MONGODB_DB);
      collection = db.collection(config.MONGODB_COLLECTION);
      await collection.createIndex({ email_status: 1, createdAt: 1 });
      await collection.createIndex({ email: 1 });
      return this;
    },
    get collection() {
      if (!collection) throw new Error("MongoDB is not connected");
      return collection;
    },
    async claimBatch(limit) {
      const claimed = [];
      for (let i = 0; i < limit; i += 1) {
        const now = new Date();
        const result = await this.collection.findOneAndUpdate(
          {
            $and: [
              { $or: [
                { email_status: { $in: ["new", "retry"] } },
                { email_status: { $exists: false }, email_sent: { $ne: true } },
                { email_status: "pending", last_attempt_at: { $lt: new Date(Date.now() - 15 * 60 * 1000) } }
              ] }
            ]
          },
          { $set: { email_status: "pending", last_attempt_at: now }, $inc: { attempts: 1 } },
          { sort: { createdAt: 1, _id: 1 }, returnDocument: "after" }
        );
        const doc = result && Object.prototype.hasOwnProperty.call(result, "value") ? result.value : result;
        if (!doc) break;
        claimed.push(doc);
      }
      return claimed;
    },
    async releaseClaim(id) {
      return this.collection.updateOne({ _id: id, email_status: "pending" }, {
        $set: { email_status: "retry", updatedAt: new Date() }
      });
    },
    async markSent(id, response) {
      return this.collection.updateOne({ _id: id, email_status: "pending" }, {
        $set: { email_status: "sent", email_sent: true, email_response: response, email_sent_at: new Date(), updatedAt: new Date() },
        $unset: { email_error: "" }
      });
    },
    async markFailed(id, error, retryable, maxRetries) {
      return this.collection.updateOne({ _id: id, email_status: "pending" }, {
        $set: {
          email_status: retryable && Number(this.config?.MAX_RETRIES ?? maxRetries) > 0 ? "retry" : "failed",
          email_error: String(error?.message || error).slice(0, 1000),
          last_attempt_at: new Date(),
          updatedAt: new Date()
        }
      });
    },
    async findById(id) {
      let objectId = id;
      if (ObjectId.isValid(id)) objectId = new ObjectId(id);
      return this.collection.findOne({ _id: objectId });
    },
    async close() { await client.close(); },
    async ping() { await client.db(config.MONGODB_DB).command({ ping: 1 }); return true; }
  };
}

function isRetryable(error) {
  const status = Number(error?.statusCode || error?.responseCode || 0);
  if (status === 429 || status >= 500) return true;
  const code = String(error?.code || "");
  return ["ETIMEDOUT", "ECONNECTION", "ECONNRESET", "ESOCKET", "EAI_AGAIN", "ENOTFOUND", "ETLS"].includes(code);
}

module.exports = { createMongo, isRetryable };
