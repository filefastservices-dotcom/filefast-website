#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const ASSETS_DIR = path.resolve(__dirname, "../demo/assets");
const TARGETS = {
  "hero.json": 120 * 1024,
  "process.json": 30 * 1024,
  "success.json": 20 * 1024,
};

let failed = false;

for (const [file, targetBytes] of Object.entries(TARGETS)) {
  const filePath = path.join(ASSETS_DIR, file);
  let data;

  try {
    data = fs.readFileSync(filePath);
    JSON.parse(data.toString("utf8"));
  } catch (error) {
    failed = true;
    console.error(`FAIL ${file}: ${error.code === "ENOENT" ? "file is missing" : "invalid JSON"}`);
    continue;
  }

  const rawBytes = data.length;
  const label = `${rawBytes} B / ${targetBytes} B target`;
  if (rawBytes > targetBytes) {
    failed = true;
    console.error(`FAIL ${file}: ${label} (over by ${rawBytes - targetBytes} B)`);
  } else {
    console.log(`PASS ${file}: ${label}`);
  }
}

if (failed) {
  console.error("Lottie validation failed. Optimize the listed assets before merging.");
  process.exit(1);
}

console.log("All Lottie JSON files are valid and within raw-size targets.");
