"use strict";

const express = require("express");

function startHealthServer({ db, emailer, metrics, port }) {
  const app = express();
  app.get("/health", async (_req, res) => {
    const checks = { database: "unknown", email_provider: "configured" };
    try { await db.ping(); checks.database = "ok"; } catch { checks.database = "error"; }
    try { await emailer.health(); } catch { checks.email_provider = "error"; }
    const ok = checks.database === "ok" && checks.email_provider === "configured";
    res.status(ok ? 200 : 503).json({ status: ok ? "ok" : "degraded", checks, timestamp: new Date().toISOString() });
  });
  app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", metrics.registry.contentType);
    res.send(await metrics.registry.metrics());
  });
  const server = app.listen(port, "0.0.0.0", () => {
    require("./logger").log("info", "health_server_started", { port });
  });
  return () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}

module.exports = { startHealthServer };
