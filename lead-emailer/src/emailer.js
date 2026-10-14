"use strict";

const nodemailer = require("nodemailer");
const sendgrid = require("@sendgrid/mail");

function createEmailer(config, { transport, sendgridClient } = {}) {
  if (config.EMAIL_PROVIDER === "smtp") {
    const smtpTransport = transport || nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT === 465,
      auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
      requireTLS: config.SMTP_PORT !== 465,
      tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      pool: true,
      maxConnections: 3,
      maxMessages: 100
    });
    return {
      provider: "smtp",
      async send({ to, subject, html, text, leadId }) {
        const result = await smtpTransport.sendMail({
          from: { name: config.FROM_NAME, address: config.FROM_EMAIL },
          to, subject, html, text,
          headers: { "X-FileFast-Lead-ID": String(leadId), "List-Unsubscribe": `<${config.UNSUBSCRIBE_BASE_URL}>` }
        });
        return { provider: "smtp", messageId: result.messageId, accepted: result.accepted, rejected: result.rejected, response: result.response };
      },
      async close() { if (typeof smtpTransport.close === "function") smtpTransport.close(); },
      async health() { if (typeof smtpTransport.verify === "function") await smtpTransport.verify(); return true; }
    };
  }
  const client = sendgridClient || sendgrid;
  if (!sendgridClient) client.setApiKey(config.SENDGRID_API_KEY);
  return {
    provider: "sendgrid",
    async send({ to, subject, html, text, leadId }) {
      const [response] = await client.send({
        to, from: { email: config.FROM_EMAIL, name: config.FROM_NAME },
        subject, html, text,
        headers: { "X-FileFast-Lead-ID": String(leadId), "List-Unsubscribe": `<${config.UNSUBSCRIBE_BASE_URL}>` }
      });
      return { provider: "sendgrid", statusCode: response.statusCode, messageId: response.headers?.["x-message-id"] || null };
    },
    async close() {},
    async health() { return Boolean(config.SENDGRID_API_KEY); }
  };
}

module.exports = { createEmailer };
