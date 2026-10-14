"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Handlebars = require("handlebars");

const templateDir = path.join(__dirname, "templates");
const htmlTemplate = Handlebars.compile(fs.readFileSync(path.join(templateDir, "lead-notification.hbs"), "utf8"), { strict: false });
const textTemplate = Handlebars.compile(fs.readFileSync(path.join(templateDir, "lead-notification.txt.hbs"), "utf8"), { strict: false });

function renderEmail(lead, unsubscribeUrl) {
  const context = {
    name: String(lead.name || "there").slice(0, 200),
    service: String(lead.service || lead.serviceName || "your enquiry").slice(0, 200),
    lead_id: String(lead._id),
    unsubscribe_url: unsubscribeUrl
  };
  return {
    subject: "We received your enquiry — FileFast Global",
    html: htmlTemplate(context),
    text: textTemplate(context)
  };
}

module.exports = { renderEmail };
