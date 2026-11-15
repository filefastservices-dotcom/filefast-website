const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(process.cwd(), "src", "app");
const EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);
const failures = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.isFile() || !EXTENSIONS.has(path.extname(entry.name))) continue;
    const relative = path.relative(process.cwd(), fullPath);
    if (!relative.split(path.sep).some((segment) => /^\[.+\]$/.test(segment))) continue;

    const source = fs.readFileSync(fullPath, "utf8");
    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (/\bparams\s*\.\s*[A-Za-z_$][\w$]*/.test(line)) {
        failures.push(`${relative}:${index + 1}: direct params property access; await params first`);
      }
    });
  }
}

walk(ROOT);

if (failures.length) {
  console.error("Dynamic route params compatibility check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dynamic route params compatibility check passed.");
