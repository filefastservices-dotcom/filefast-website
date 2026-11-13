const fs = require("node:fs");
const source = fs.readFileSync("src/app/api/admin/login/route.js", "utf8");
const checks = [
  [/timingSafeEqual\s*\(/, "Credential comparison must use timingSafeEqual."],
  [/createHash\(["']sha256["']\)/, "Credential comparison must hash both inputs to fixed-length digests."],
  [/Cache-Control["'],\s*["']no-store/, "Login responses must disable caching."],
  [/MAX_LOGIN_BODY_BYTES/, "Login request bodies must have a size limit."],
  [/content-type/, "Login endpoint must validate request content type."]
];
const failures = checks.filter(([pattern]) => !pattern.test(source)).map(([, message]) => message);
if (failures.length) {
  console.error("Admin login security check failed:");
  failures.forEach((message) => console.error("- " + message));
  process.exit(1);
}
console.log("Admin login security checks passed.");
