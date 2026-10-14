"use strict";

const client = require("prom-client");
const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });
const sent = new client.Counter({ name: "emails_sent_total", help: "Successfully sent lead emails", registers: [registry] });
const failed = new client.Counter({ name: "emails_failed_total", help: "Failed lead email attempts", registers: [registry] });
const inFlight = new client.Gauge({ name: "emails_in_flight", help: "Email sends currently in flight", registers: [registry] });

module.exports = { registry, sent, failed, inFlight };
