"use strict";

function log(level, event, fields = {}) {
  const record = { timestamp: new Date().toISOString(), level, service: "filefast-lead-emailer", event, ...fields };
  const line = JSON.stringify(record);
  (level === "error" || level === "warn" ? console.error : console.log)(line);
}

module.exports = { log };
