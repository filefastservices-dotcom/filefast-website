#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const pages = [
  path.join(root, "mobile-ux-demo/demo/index.html"),
  path.join(root, "public/mobile-ux-demo/index.html"),
];
const requiredLabels = ["leadName", "leadEmail", "leadMobile", "leadService", "leadWebsite"];
let failed = false;

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const labelIds = [...html.matchAll(/<label\b[^>]*\bfor=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]));
  const relative = path.relative(root, file);

  for (const id of requiredLabels) {
    if (!ids.has(id)) {
      failed = true;
      console.error(`FAIL ${relative}: missing form control id "${id}"`);
    }
    if (!labelIds.includes(id)) {
      failed = true;
      console.error(`FAIL ${relative}: missing explicit label for "${id}"`);
    }
  }
  for (const labelFor of labelIds) {
    if (!ids.has(labelFor)) {
      failed = true;
      console.error(`FAIL ${relative}: label points to missing id "${labelFor}"`);
    }
  }
  for (const id of ["leadModal", "modalTitle", "modalDescription", "formError", "formSuccess"]) {
    if (!ids.has(id)) {
      failed = true;
      console.error(`FAIL ${relative}: missing accessibility/status target "${id}"`);
    }
  }
  if (!/<section\b[^>]*role=["']dialog["'][^>]*aria-modal=["']true["']/i.test(html)) {
    failed = true;
    console.error(`FAIL ${relative}: modal must expose dialog role and aria-modal=true`);
  }
  if (!/role=["']tablist["']/i.test(html) || !/role=["']tabpanel["']/i.test(html)) {
    failed = true;
    console.error(`FAIL ${relative}: process tabs need tablist and tabpanel semantics`);
  }
  if (!/aria-live=["']polite["']/i.test(html) || !/role=["']alert["']/i.test(html)) {
    failed = true;
    console.error(`FAIL ${relative}: status and error messages need live announcement semantics`);
  }
  if (/Share two details so we can understand what you need/.test(html)) {
    failed = true;
    console.error(`FAIL ${relative}: modal copy says two details but form asks for more`);
  }
  if (!failed) console.log(`PASS ${relative}: required form labels and accessible interaction semantics found`);
}
if (failed) process.exit(1);
console.log("Demo accessibility contract checks passed.");
