#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const TARGETS = {
  "og-image.png": 1_700_000,
  "logo.png": 100_000,
};

let failed = false;

for (const [file, maxBytes] of Object.entries(TARGETS)) {
  const filePath = path.join(PUBLIC_DIR, file);
  try {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    if (bytes > maxBytes) {
      failed = true;
      console.error(`FAIL public/${file}: ${bytes} bytes exceeds ${maxBytes} byte budget`);
    } else {
      console.log(`PASS public/${file}: ${bytes} / ${maxBytes} bytes`);
    }
  } catch {
    failed = true;
    console.error(`FAIL public/${file}: file is missing`);
  }
}

if (failed) {
  console.error("Image size budget check failed. Optimize oversized assets or explicitly review the budget change.");
  process.exit(1);
}
console.log("All tracked public images are within their size budgets.");
