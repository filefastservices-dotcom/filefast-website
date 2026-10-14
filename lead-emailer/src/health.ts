import express from "express";
import type { Server } from "node:http";
import { Registry, Counter, Gauge, collectDefaultMetrics } from "prom-client";
import type { LeadStore } from "./mongo.js";
import type { EmailProvider } from "./emailer.js";
import { log } from "./logger.js";

export const registry = new Registry();
collectDefaultMetrics({ register: registry });
export const emailsSent = new Counter({ name: "emails_sent_total", help: "Lead emails successfully sent", registers: [registry] });
export const emailsFailed = new Counter({ name: "emails_failed_total", help: "Lead email send failures", registers: [registry] });
export const emailsInFlight = new Gauge({ name: "emails_in_flight", help: "Email sends in flight", registers: [registry] });

export function startHealthServer(db: LeadStore, provider: EmailProvider, port: number): Server {
  const app = express();
  app.get("/health", async (_req, res) => {
    const checks: Record<string, string> = { database: "error", email_provider: "error" };
    try { await db.ping(); checks.database = "ok"; } catch { /* do not leak credentials */ }
    try { if (await provider.health()) checks.email_provider = "ok"; } catch { /* status only */ }
    const healthy = Object.values(checks).every((value) => value === "ok");
    res.status(healthy ? 200 : 503).json({ status: healthy ? "ok" : "degraded", checks, timestamp: new Date().toISOString() });
  });
  app.get("/metrics", async (_req, res) => { res.set("Content-Type", registry.contentType); res.send(await registry.metrics()); });
  const server = app.listen(port, "0.0.0.0", () => log("info", "health_server_started", { port }));
  return server;
}
