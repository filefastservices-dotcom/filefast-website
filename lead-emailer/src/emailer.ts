import nodemailer, { type Transporter } from "nodemailer";
import sgMail from "@sendgrid/mail";
import Handlebars from "handlebars";
import fs from "node:fs";
import path from "node:path";
import type { Config } from "./config.js";
import type { Lead } from "./mongo.js";
import { createUnsubscribeUrl } from "./unsubscribe.js";
import { log } from "./logger.js";

export interface EmailResponse { provider: string; messageId?: string | null; statusCode?: number; response?: string; accepted?: unknown; }
export interface EmailPayload { to: string; subject: string; html: string; text: string; leadId: string; }
export interface EmailProvider { name: string; send(payload: EmailPayload): Promise<EmailResponse>; health(): Promise<boolean>; close(): Promise<void>; }
const htmlSource = fs.readFileSync(path.join(process.cwd(), "src/templates/email.html.hbs"), "utf8");
const textSource = fs.readFileSync(path.join(process.cwd(), "src/templates/email.txt.hbs"), "utf8");
const renderHtml = Handlebars.compile(htmlSource);
const renderText = Handlebars.compile(textSource);
export function renderEmail(lead: Lead, unsubscribeUrl: string): Omit<EmailPayload, "to"> {
  const context = { name: lead.name || "there", service: lead.service || "your enquiry", lead_id: String(lead._id), unsubscribe_url: unsubscribeUrl };
  return { subject: "We received your enquiry — FileFast Global", html: renderHtml(context), text: renderText(context), leadId: String(lead._id) };
}
export function createEmailProvider(config: Config): EmailProvider {
  if (config.EMAIL_PROVIDER === "smtp") {
    const transport: Transporter = nodemailer.createTransport({
      host: config.SMTP_HOST, port: config.SMTP_PORT, secure: config.SMTP_PORT === 465,
      auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
      requireTLS: config.SMTP_PORT !== 465,
      tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      pool: true, maxConnections: 3, maxMessages: 100
    });
    return {
      name: "smtp",
      async send(payload) {
        const result = await transport.sendMail({
          from: { name: config.FROM_NAME, address: config.FROM_EMAIL }, to: payload.to,
          subject: payload.subject, html: payload.html, text: payload.text,
          headers: { "X-FileFast-Lead-ID": payload.leadId, "List-Unsubscribe": `<${config.UNSUBSCRIBE_BASE_URL}>` }
        });
        return { provider: "smtp", messageId: result.messageId, response: result.response, accepted: result.accepted };
      },
      async health() { await transport.verify(); return true; },
      async close() { transport.close(); }
    };
  }
  sgMail.setApiKey(config.SENDGRID_API_KEY!);
  return {
    name: "sendgrid",
    async send(payload) {
      const [response] = await sgMail.send({
        to: payload.to, from: { email: config.FROM_EMAIL, name: config.FROM_NAME },
        subject: payload.subject, html: payload.html, text: payload.text,
        headers: { "X-FileFast-Lead-ID": payload.leadId, "List-Unsubscribe": `<${config.UNSUBSCRIBE_BASE_URL}>` }
      });
      return { provider: "sendgrid", statusCode: response.statusCode, messageId: response.headers["x-message-id"] || null };
    },
    async health() { return Boolean(config.SENDGRID_API_KEY); },
    async close() {}
  };
}
export function createUnsubscribeLink(config: Config, lead: Lead): string {
  return createUnsubscribeUrl(config.UNSUBSCRIBE_BASE_URL, String(lead._id), lead.email, config.HMAC_SECRET);
}
export async function sendWithRetry(provider: EmailProvider, payload: EmailPayload, maxRetries: number, baseDelayMs = 500, sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))): Promise<EmailResponse> {
  let attempt = 0;
  for (;;) {
    try { return await provider.send(payload); }
    catch (error) {
      const e = error as { code?: string; statusCode?: number; responseCode?: number; message?: string };
      const status = Number(e.statusCode || e.responseCode || 0);
      const retryable = status === 429 || status >= 500 || ["ETIMEDOUT", "ECONNECTION", "ECONNRESET", "ESOCKET", "EAI_AGAIN"].includes(String(e.code));
      if (!retryable || attempt >= maxRetries) throw error;
      const delay = baseDelayMs * 2 ** attempt + Math.floor(Math.random() * 200);
      log("warn", "email_retry", { provider: provider.name, attempt: attempt + 1, retry_in_ms: delay, error: e.message });
      attempt++;
      await sleep(delay);
    }
  }
}
