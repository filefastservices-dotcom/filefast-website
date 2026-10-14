#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const repoRoot = path.resolve(__dirname, "../..");
const assets = ["hero.json", "process.json", "success.json"];
const pairs = [
  { source: path.join(repoRoot, "mobile-ux-demo/demo/assets"), served: path.join(repoRoot, "public/mobile-ux-demo/assets") },
];

let failed = false;
for (const { source, served } of pairs) {
  for (const file of assets) {
    const sourcePath = path.join(source, file);
    const servedPath = path.join(served, file);
    let sourceBytes;
    let servedBytes;
    try {
      sourceBytes = fs.readFileSync(sourcePath);
      servedBytes = fs.readFileSync(servedPath);
      JSON.parse(sourceBytes.toString("utf8"));
      JSON.parse(servedBytes.toString("utf8"));
    } catch (error) {
      failed = true;
      const missing = error.code === "ENOENT" ? "missing file" : "invalid JSON";
      console.error(`FAIL ${file}: ${missing} in source or public assets`);
      continue;
    }
    const hash = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
    if (hash(sourceBytes) !== hash(servedBytes)) {
      failed = true;
      console.error(`FAIL ${file}: source and public copies differ; sync both files before merging`);
    } else {
      console.log(`PASS ${file}: source and public copies match (${sourceBytes.length} bytes)`);
    }
  }
}
if (failed) process.exit(1);
console.log("All served Lottie assets match their validated source files.");
