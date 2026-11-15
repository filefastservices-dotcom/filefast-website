const fs = require("node:fs");

const source = fs.readFileSync("src/middleware.js", "utf8");
const exactLoginBypass = /pathname\s*===\s*["']\/admin\/login["']\s*\|\|\s*pathname\s*===\s*["']\/admin\/login\/["']/;
const roleGuard = /payload\.role\s*!==\s*["']admin["']/;
const tokenRead = /req\.cookies\.get\(["']ff_admin_token["']\)/;

const failures = [];
if (!exactLoginBypass.test(source)) failures.push("Login bypass must match only /admin/login and /admin/login/ exactly.");
if (!roleGuard.test(source)) failures.push("Middleware must reject tokens without the admin role.");
if (!tokenRead.test(source)) failures.push("Middleware must read the HttpOnly admin token cookie.");

if (failures.length) {
  console.error("Admin middleware security check failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("Admin middleware security checks passed.");
