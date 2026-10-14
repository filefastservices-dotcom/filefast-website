import crypto from "node:crypto";
import type { Express, Request, Response } from "express";
import { ObjectId, type Collection } from "mongodb";

export interface UnsubscribeClaims { leadId: string; email: string; exp: number; }
export function generateUnsubscribeToken(leadId: string, email: string, secret: string, ttlSeconds = 31536000): string {
  if (!leadId || !email || secret.length < 32) throw new Error("leadId, email and a 32-character secret are required");
  const payload = Buffer.from(JSON.stringify({ leadId, email: email.trim().toLowerCase(), exp: Math.floor(Date.now() / 1000) + ttlSeconds })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}
export function verifyUnsubscribeToken(token: string, secret: string, nowSeconds = Math.floor(Date.now() / 1000)): { valid: true; claims: UnsubscribeClaims } | { valid: false; reason: string } {
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { valid: false, reason: "malformed" };
  const [payload, signature] = parts as [string, string];
  const expected = crypto.createHmac("sha256", secret).update(payload).digest();
  const actual = Buffer.from(signature, "base64url");
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return { valid: false, reason: "signature" };
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as UnsubscribeClaims;
    if (!claims.leadId || !claims.email || !Number.isFinite(claims.exp)) return { valid: false, reason: "payload" };
    if (claims.exp <= nowSeconds) return { valid: false, reason: "expired" };
    return { valid: true, claims };
  } catch { return { valid: false, reason: "payload" }; }
}
export function createUnsubscribeUrl(base: string, leadId: string, email: string, secret: string): string {
  const url = new URL(base);
  url.searchParams.set("token", generateUnsubscribeToken(leadId, email, secret));
  return url.toString();
}

/** Example opt-out endpoint. Persist suppression state before confirming; adapt collection/field to your schema. */
export function registerUnsubscribeEndpoint(app: Express, secret: string, leads: Collection, suppressionCollection?: Collection): void {
  app.get("/unsubscribe", async (req: Request, res: Response) => {
    const token = String(req.query.token || "");
    const result = verifyUnsubscribeToken(token, secret);
    if (!result.valid) { res.status(400).send("This unsubscribe link is invalid or expired."); return; }
    const email = result.claims.email;
    try {
      if (suppressionCollection) {
        await suppressionCollection.updateOne({ email }, { $set: { email, suppressedAt: new Date(), source: "unsubscribe-link" } }, { upsert: true });
      }
      await leads.updateOne({ _id: isObjectId(result.claims.leadId) ? toObjectId(result.claims.leadId) : new ObjectId("000000000000000000000000") }, { $set: { email_unsubscribed: true, email_unsubscribed_at: new Date() } });
      res.status(200).send("You have been unsubscribed from further email updates.");
    } catch {
      res.status(503).send("We could not process this request right now. Please try again later.");
    }
  });
}
function isObjectId(value: string): boolean { return /^[a-f\d]{24}$/i.test(value); }
function toObjectId(value: string): ObjectId { return new ObjectId(value); }
