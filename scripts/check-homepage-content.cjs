const fs = require("node:fs");

const read = (path) => fs.readFileSync(path, "utf8");
const checks = [
  ["src/models/HomepageContent.js", ["heroTitle", "heroHighlight", "announcementEnabled", "metaTitle", "unique: true"]],
  ["src/lib/homepageContent.js", ["DEFAULT_HOMEPAGE_CONTENT", "getHomepageContent", "HomepageContent.findOne"]],
  ["src/app/api/admin/homepage/route.js", ["requireAdmin(req)", "TEXT_LIMITS", "revalidatePath(\"/\")", "findOneAndUpdate"]],
  ["src/app/admin/homepage/page.js", ["Save Homepage Changes", "/api/admin/homepage", "announcementEnabled", "metaDescription"]],
  ["src/app/page.js", ["export const dynamic = \"force-dynamic\"", "getHomepageContent()", "homeContent.heroTitle", "homeContent.heroHighlight", "homeContent.announcementEnabled"]],
  ["src/app/layout.js", ["/admin/homepage", "Homepage"]]
];
const failures = [];
for (const [path, tokens] of checks) {
  const content = read(path);
  for (const token of tokens) if (!content.includes(token)) failures.push(path + " missing " + token);
}
if (failures.length) {
  console.error("Homepage content checks failed:");
  failures.forEach((item) => console.error("- " + item));
  process.exit(1);
}
console.log("Homepage content-management checks passed.");
