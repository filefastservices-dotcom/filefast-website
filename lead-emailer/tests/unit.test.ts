import { describe, it, expect, vi } from "vitest";
import { loadConfig } from "../src/config.js";
import { generateUnsubscribeToken, verifyUnsubscribeToken } from "../src/unsubscribe.js";
import { renderEmail, sendWithRetry, type EmailProvider } from "../src/emailer.js";
import type { Lead } from "../src/mongo.js";

const env = {
  MONGODB_URI: "mongodb://localhost:27017", MONGODB_DB: "test", MONGODB_COLLECTION: "leads",
  EMAIL_PROVIDER: "smtp", SMTP_HOST: "localhost", SMTP_PORT: "1025", SMTP_USER: "u", SMTP_PASS: "p",
  FROM_EMAIL: "sender@example.com", UNSUBSCRIBE_BASE_URL: "https://example.com/unsubscribe", HMAC_SECRET: "x".repeat(40)
};
describe("configuration", () => {
  it("loads valid config and defaults collection", () => { expect(loadConfig(env).MONGODB_COLLECTION).toBe("leads"); });
  it("fails fast with missing env", () => { expect(() => loadConfig({})).toThrow(/MONGODB_URI/); });
  it("requires provider credentials", () => { expect(() => loadConfig({ ...env, SMTP_PASS: "" })).toThrow(/SMTP_PASS/); });
  it("requires SendGrid key", () => { expect(() => loadConfig({ ...env, EMAIL_PROVIDER: "sendgrid", SENDGRID_API_KEY: "" })).toThrow(/SENDGRID_API_KEY/); });
});
describe("unsubscribe HMAC", () => {
  it("verifies valid token and normalizes email", () => {
    const token = generateUnsubscribeToken("abc", "Test@Example.com", "x".repeat(32), 300);
    const result = verifyUnsubscribeToken(token, "x".repeat(32));
    expect(result.valid).toBe(true);
    if (result.valid) expect(result.claims.email).toBe("test@example.com");
  });
  it("rejects tampering and expiration", () => {
    const token = generateUnsubscribeToken("abc", "a@example.com", "x".repeat(32), 10);
    expect(verifyUnsubscribeToken(token + "x", "x".repeat(32)).valid).toBe(false);
    expect(verifyUnsubscribeToken(token, "x".repeat(32), Math.floor(Date.now() / 1000) + 11)).toMatchObject({ valid: false, reason: "expired" });
  });
});
describe("email templates and retry", () => {
  it("renders escaped HTML and plain text placeholders", () => {
    const lead = { _id: "lead-1", name: "<script>x</script>", email: "a@example.com", service: "GST", email_status: "new", attempts: 0 } as unknown as Lead;
    const result = renderEmail(lead, "https://example.com/unsubscribe?token=x");
    expect(result.html).toContain("&lt;script&gt;");
    expect(result.text).toContain("GST");
    expect(result.html).toContain("lead-1");
  });
  it("retries mocked transient send then succeeds", async () => {
    const send = vi.fn().mockRejectedValueOnce(Object.assign(new Error("busy"), { statusCode: 503 })).mockResolvedValue({ provider: "mock", messageId: "x" });
    const provider = { name: "mock", send, health: async () => true, close: async () => {} } as EmailProvider;
    const result = await sendWithRetry(provider, { to: "a@example.com", subject: "s", html: "h", text: "t", leadId: "1" }, 1, 1, async () => {});
    expect(result.messageId).toBe("x");
    expect(send).toHaveBeenCalledTimes(2);
  });
});
