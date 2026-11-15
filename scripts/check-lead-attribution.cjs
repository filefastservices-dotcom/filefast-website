const fs = require("node:fs");
const path = require("node:path");
const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const checks = [
  ["src/components/LeadForm.jsx", ["utm_source", "utm_medium", "utm_campaign", "landingPage: window.location.pathname", "referrerHost"]],
  ["src/app/api/leads/route.js", ["utmSource", "utmMedium", "utmCampaign", "startsWith(\"//\")", "referrerHost"]],
  ["src/models/Lead.js", ["utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm", "landingPage", "referrerHost"]],
  ["src/app/admin/leads/page.js", ["Campaign", "Landing page", "l.utmCampaign", "l.landingPage"]],
  ["src/app/admin/analytics/route.js", ["await requireAdmin(req)", "byCampaign", "byLandingPage", "utmCampaign", "landingPage"]],
  ["src/app/admin/analytics/page.js", ["Enquiries by campaign", "Top landing pages"]],
  ["src/app/api/leads/export/route.js", ["UTM Source", "UTM Campaign", "Landing Page", "Referrer Host", "l.utmCampaign"]]
];
const failures = [];
for (const [file, tokens] of checks) {
  const content = read(file);
  for (const token of tokens) {
    if (!content.includes(token)) failures.push(file + " is missing expected attribution safeguard: " + token);
  }
}
const leadRoute = read("src/app/api/leads/route.js");
if (/document\.referrer|req\.headers\.get\(["']referer/i.test(leadRoute)) {
  failures.push("Server route must not store a full referrer URL.");
}
if (failures.length) {
  console.error("Lead attribution checks failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("Lead attribution checks passed.");
