const fs = require("node:fs");
const path = require("node:path");
const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const checks = [
  ["src/components/LeadForm.jsx", ["utm_source", "utm_medium", "utm_campaign", "landingPage: window.location.pathname", "referrerHost", "required checked={form.consent}", "consent: form.consent"]],
  ["src/app/api/leads/route.js", ["utmSource", "utmMedium", "utmCampaign", "startsWith(\"//\")", "referrerHost", "body?.consent !== true", "consentAt: new Date()", "consentVersion"]],
  ["src/models/Lead.js", ["utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm", "landingPage", "referrerHost", "consent", "consentAt", "consentVersion"]],
  ["src/app/admin/leads/page.js", ["Campaign", "Landing page", "l.utmCampaign", "l.landingPage"]],
  ["src/app/api/admin/analytics/route.js", ["await requireAdmin(req)", "byCampaign", "byLandingPage", "utmCampaign", "landingPage"]],
  ["src/app/admin/analytics/page.js", ["fetch(\"/api/admin/analytics\")", "Enquiries by campaign", "Top landing pages"]],
  ["src/app/api/leads/export/route.js", ["UTM Source", "UTM Campaign", "Landing Page", "Referrer Host", "l.utmCampaign", "Enquiry Consent", "Consent Recorded At", "l.consentVersion"]]
];
const failures = [];
for (const [file, tokens] of checks) {
  const content = read(file);
  for (const token of tokens) {
    if (!content.includes(token)) failures.push(file + " is missing expected attribution safeguard: " + token);
  }
}
const leadForm = read("src/components/LeadForm.jsx");
const emailInput = leadForm.match(/<input\s+type="email"[\s\S]*?\/>/);
const serviceSelect = leadForm.match(/<select\s+aria-label="Service you need"[\s\S]*?<\/select>/);
if (!emailInput || /\brequired\b/.test(emailInput[0])) {
  failures.push("Standard enquiry email field should remain optional.");
}
if (!serviceSelect || /\brequired\b/.test(serviceSelect[0])) {
  failures.push("Standard enquiry service selector should remain optional.");
}
const adminLeads = read("src/app/admin/leads/page.js");
for (const token of ["Enquiry consent", "l.consentAt", "l.consent === true"]) {
  if (!adminLeads.includes(token)) failures.push("Admin leads page is missing consent audit display: " + token);
}

const appointmentPage = read("src/app/appointments/page.js");
const appointmentRoute = read("src/app/api/appointments/route.js");
const appointmentModel = read("src/models/Appointment.js");
for (const [file, content, tokens] of [
  ["appointment page", appointmentPage, ["required checked={form.consent}", "Appointment request received", "Privacy Policy"]],
  ["appointment API", appointmentRoute, ["body.consent !== true", "clientPhone", "emailIsValid", "dateIsValid", "consentAt: new Date()", "consentVersion", "appointmentId"]],
  ["appointment model", appointmentModel, ["consent", "consentAt", "consentVersion"]],
  ["admin appointments", read("src/app/admin/appointments/page.js"), ["apt.consent === true", "apt.consentAt"]],
  ["sitemap", read("src/app/sitemap.js"), ["/appointments"]],
  ["appointment metadata", read("src/app/appointments/layout.js"), ["Book a Consultation", 'canonical: "/appointments"']]
]) {
  for (const token of tokens) {
    if (!content.includes(token)) failures.push(file + " is missing expected safeguard: " + token);
  }
}
const leadRoute = read("src/app/api/leads/route.js");
const leadModel = read("src/models/Lead.js");
for (const token of ['status: { type: String', 'internalNote:', 'followUpAt:', 'statusUpdatedAt:']) {
  if (!leadModel.includes(token)) failures.push("Lead model is missing pipeline field: " + token);
}
for (const token of ['export async function PATCH(req)', 'await requireAdmin(req)', 'allowedStatuses', 'findByIdAndUpdate', 'update.status', 'update.followUpAt']) {
  if (!leadRoute.includes(token)) failures.push("Lead pipeline API is missing safeguard or update: " + token);
}
const leadAdmin = read("src/app/admin/leads/page.js");
for (const token of ['Lead pipeline', 'Qualified', 'Converted', 'Private team note', 'Save update', 'followUpAt']) {
  if (!leadAdmin.includes(token)) failures.push("Admin lead pipeline is missing feature: " + token);
}
const analyticsRoute = read("src/app/api/admin/analytics/route.js");
const analyticsPage = read("src/app/admin/analytics/page.js");
if (!analyticsRoute.includes("byStatus") || !analyticsPage.includes("Lead pipeline status")) {
  failures.push("Admin analytics must report lead pipeline stages.");
}
const exportRoute = read("src/app/api/leads/export/route.js");
for (const token of ['"Lead Status"', '"Follow-up Date"', '"Internal Note"', 'l.status || "new"', 'l.internalNote']) {
  if (!exportRoute.includes(token)) failures.push("Lead CSV export is missing pipeline data: " + token);
}


if (/document\.referrer|req\.headers\.get\(["']referer/i.test(leadRoute)) {
  failures.push("Server route must not store a full referrer URL.");
}

const analyticsConsent = read("src/components/AnalyticsConsent.jsx");
for (const token of ["analytics_storage: granted ? \"granted\" : \"denied\"", "window.localStorage.getItem(CONSENT_KEY) !== \"accepted\"", "generate_lead", "Reject analytics", "Accept analytics"]) {
  if (!analyticsConsent.includes(token)) failures.push("Analytics consent component is missing safeguard or event: " + token);
}
const rootLayout = read("src/app/layout.js");
for (const token of ["NEXT_PUBLIC_GA_MEASUREMENT_ID", "filefast-google-consent-default", "ad_storage: \"denied\"", "AnalyticsConsent", "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"]) {
  if (!rootLayout.includes(token)) failures.push("Root layout is missing analytics or Search Console configuration: " + token);
}
const privacyPolicy = read("src/app/privacy-policy/page.js");
if (!privacyPolicy.includes("Optional website analytics") || !privacyPolicy.includes("not required to submit an enquiry")) {
  failures.push("Privacy policy must explain optional analytics separately from enquiry consent.");
}

if (failures.length) {
  console.error("Lead attribution checks failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("Lead attribution checks passed.");
