import { MongoClient, ObjectId, type Collection, type Db, type Filter, type WithId } from "mongodb";
import type { Config } from "./config.js";
import { log } from "./logger.js";

export interface Lead {
  _id: ObjectId | string;
  name: string;
  email: string;
  service: string;
  source?: string;
  created_at?: Date;
  email_status: "new" | "pending" | "sent" | "failed" | "retry";
  attempts: number;
  last_attempt_at?: Date | null;
  email_response?: Record<string, unknown> | null;
  worker_id?: string;
  email_unsubscribed?: boolean;
}
export class LeadStore {
  readonly client: MongoClient;
  readonly db: Db;
  readonly leads: Collection<Lead>;
  readonly workerId: string;
  constructor(private config: Config, workerId: string) {
    this.workerId = workerId;
    this.client = new MongoClient(config.MONGODB_URI, { maxPoolSize: config.MONGODB_MAX_POOL_SIZE, minPoolSize: 0, serverSelectionTimeoutMS: 10000, retryWrites: true });
    this.db = this.client.db(config.MONGODB_DB);
    this.leads = this.db.collection<Lead>(config.MONGODB_COLLECTION);
  }
  async connect(): Promise<void> {
    await this.client.connect();
    await this.leads.createIndex({ email_status: 1, created_at: 1 });
    await this.leads.createIndex({ email: 1 });
    log("info", "mongo_connected", { db: this.config.MONGODB_DB, collection: this.config.MONGODB_COLLECTION });
  }
  async claimBatch(limit: number): Promise<WithId<Lead>[]> {
    const claimed: WithId<Lead>[] = [];
    const staleBefore = new Date(Date.now() - 15 * 60 * 1000);
    for (let i = 0; i < limit; i++) {
      const filter: Filter<Lead> = {
        $or: [
          { email_status: { $in: ["new", "retry"] } },
          { email_status: "pending", last_attempt_at: { $lt: staleBefore } }
        ],
        email_unsubscribed: { $ne: true }
      };
      const result = await this.leads.findOneAndUpdate(filter, {
        $set: { email_status: "pending", worker_id: this.workerId, last_attempt_at: new Date() },
        $inc: { attempts: 1 }
      }, { sort: { created_at: 1, _id: 1 }, returnDocument: "after" });
      if (!result) break;
      claimed.push(result as WithId<Lead>);
    }
    return claimed;
  }
  async markSent(id: Lead["_id"], response: Record<string, unknown>): Promise<void> {
    const result = await this.leads.updateOne({ _id: id as ObjectId, email_status: "pending", worker_id: this.workerId }, {
      $set: { email_status: "sent", last_attempt_at: new Date(), email_response: response, email_sent_at: new Date() },
      $unset: { email_error: "", worker_id: "" }
    });
    if (!result.modifiedCount) throw new Error("Lead claim lost before sent acknowledgement");
  }
  async markFailed(id: Lead["_id"], error: unknown, retryable: boolean, maxRetries: number, response?: Record<string, unknown>): Promise<void> {
    const lead = await this.leads.findOne({ _id: id as ObjectId, worker_id: this.workerId }, { projection: { attempts: 1 } });
    const retry = retryable && (lead?.attempts ?? maxRetries + 1) <= maxRetries;
    await this.leads.updateOne({ _id: id as ObjectId, email_status: "pending", worker_id: this.workerId }, {
      $set: { email_status: retry ? "retry" : "failed", last_attempt_at: new Date(), email_response: response ?? null, email_error: String(error instanceof Error ? error.message : error).slice(0, 1000) },
      $unset: { worker_id: "" }
    });
  }
  async releaseClaim(id: Lead["_id"]): Promise<void> {
    await this.leads.updateOne({ _id: id as ObjectId, email_status: "pending", worker_id: this.workerId }, { $set: { email_status: "retry" }, $unset: { worker_id: "" } });
  }
  async findById(id: string): Promise<WithId<Lead> | null> {
    return this.leads.findOne({ _id: /^[a-f\d]{24}$/i.test(id) ? new ObjectId(id) : id } as Filter<Lead>);
  }
  async ping(): Promise<void> { await this.db.command({ ping: 1 }); }
  async close(): Promise<void> { await this.client.close(); }
}
