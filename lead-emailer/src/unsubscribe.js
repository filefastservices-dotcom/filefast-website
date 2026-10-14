"use strict";

const crypto = require("node:crypto");

function signToken(leadId, email, secret, expiresInSeconds = 60 * 60 * 24 * 365) {
  if (!leadId || !email || !secret) throw new Error("leadId, email and secret are required");
  const payload = Buffer.from(JSON.stringify({
    sub: String(leadId),
    email: String(email).trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function verifyToken(token, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (typeof token !== "string" || !token.includes(".")) return { valid: false, reason: "malformed" };
  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length) return { valid: false, reason: "malformed" };
  const expected = crypto.createHmac("sha256", secret).update(payload).digest();
  let supplied;
  try { supplied = Buffer.from(signature, "base64url"); } catch { return { valid: false, reason: "signature" }; }
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) return { valid: false, reason: "signature" };
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.sub || !data.email || !Number.isFinite(data.exp)) return { valid: false, reason: "payload" };
    if (data.exp <= nowSeconds) return { valid: false, reason: "expired" };
    return { valid: true, leadId: data.sub, email: data.email, expiresAt: data.exp };
  } catch { return { valid: false, reason: "payload" }; }
}

function buildUnsubscribeUrl(baseUrl, leadId, email, secret) {
  const url = new URL(baseUrl);
  url.searchParams.set("token", signToken(leadId, email, secret));
  return url.toString();
}

module.exports = { signToken, verifyToken, buildUnsubscribeUrl };
