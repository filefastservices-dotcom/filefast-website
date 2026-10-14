"use strict";

const PROVIDERS = new Set(["smtp", "sendgrid"]);
const DEFAULTS = {
  MONGODB_DB: "filefast",
  MONGODB_COLLECTION: "leads",
  MONGODB_MAX_POOL_SIZE: "10",
  EMAIL_PROVIDER: "smtp",
  SMTP_PORT: "587",
  BATCH_SIZE: "25",
  MAX_PER_MINUTE: "30",
  MAX_RETRIES: "3",
  RETRY_BASE_DELAY_MS: "1000",
  POLL_INTERVAL_MS: "300000",
  MAX_LEAD_AGE_DAYS: "30",
  PORT: "8080",
  HEALTH_PORT: "8080",
  FROM_NAME: "FileFast Global",
  LOG_LEVEL: "info",
  DRY_RUN: "false"
};

function positiveInt(env, name, { min = 1, max = 1000000 } = {}) {
  const value = Number(env[name]);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${name} must be an integer between ${min} and ${max}`);
  }
  return value;
}

function loadConfig(env = process.env) {
  const merged = { ...DEFAULTS, ...env };
  const required = ["MONGODB_URI", "MONGODB_DB", "MONGODB_COLLECTION", "FROM_EMAIL", "UNSUBSCRIBE_BASE_URL", "UNSUBSCRIBE_SECRET"];
  for (const name of required) {
    if (!String(merged[name] || "").trim()) throw new Error(`Missing required environment variable: ${name}`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(merged.FROM_EMAIL)) throw new Error("FROM_EMAIL must be a valid email address");
  if (!PROVIDERS.has(merged.EMAIL_PROVIDER)) throw new Error("EMAIL_PROVIDER must be smtp or sendgrid");
  if (merged.UNSUBSCRIBE_SECRET.length < 32) throw new Error("UNSUBSCRIBE_SECRET must be at least 32 characters");
  try {
    const url = new URL(merged.UNSUBSCRIBE_BASE_URL);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    throw new Error("UNSUBSCRIBE_BASE_URL must be a valid http(s) URL");
  }
  if (merged.EMAIL_PROVIDER === "smtp") {
    for (const name of ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"]) {
      if (!String(merged[name] || "").trim()) throw new Error(`Missing required environment variable for SMTP: ${name}`);
    }
    positiveInt(merged, "SMTP_PORT", { max: 65535 });
  } else if (!String(merged.SENDGRID_API_KEY || "").trim()) {
    throw new Error("Missing required environment variable for SendGrid: SENDGRID_API_KEY");
  }
  const config = {
    ...merged,
    SMTP_PORT: positiveInt(merged, "SMTP_PORT", { max: 65535 }),
    MONGODB_MAX_POOL_SIZE: positiveInt(merged, "MONGODB_MAX_POOL_SIZE"),
    BATCH_SIZE: positiveInt(merged, "BATCH_SIZE", { max: 1000 }),
    MAX_PER_MINUTE: positiveInt(merged, "MAX_PER_MINUTE", { max: 10000 }),
    MAX_RETRIES: positiveInt(merged, "MAX_RETRIES", { min: 0, max: 10 }),
    RETRY_BASE_DELAY_MS: positiveInt(merged, "RETRY_BASE_DELAY_MS"),
    POLL_INTERVAL_MS: positiveInt(merged, "POLL_INTERVAL_MS"),
    MAX_LEAD_AGE_DAYS: positiveInt(merged, "MAX_LEAD_AGE_DAYS"),
    HEALTH_PORT: positiveInt(merged, "HEALTH_PORT", { max: 65535 }),
    DRY_RUN: String(merged.DRY_RUN).toLowerCase() === "true"
  };
  return Object.freeze(config);
}

module.exports = { loadConfig, positiveInt };
