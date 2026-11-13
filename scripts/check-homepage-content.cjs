const fs = require("node:fs");

const read = (path) => fs.readFileSync(path, "utf8");
const checks = [
  ["src/models/HomepageContent.js", ["heroTitle", "heroHighlight", "announcementEnabled", "metaTitle", "unique: true"]],
  ["src/lib/homepageContent.js", ["DEFAULT_HOMEPAGE_CONTENT", "getHomepageContent", "HomepageContent.findOne"]],
  ["src/app/api/admin/homepage/route.js", ["requireAdmin(req)", "TEXT_LIMITS", "revalidatePath(\"/\")", "findOneAndUpdate"]],
  ["src/app/admin/homepage/page.js", ["Save Homepage Changes", "/api/admin/homepage", "announcementEnabled", "metaDescription"]],
  ["src/app/page.js", ["export const dynamic = \"force-dynamic\"", "getHomepageContent()", "homeContent.heroTitle", "homeContent.heroHighlight", "homeContent.announcementEnabled"]],
  ["src/app/admin/layout.js", ["/admin/homepage", "Homepage"]],
  ["src/app/services/page.js", ["export const dynamic = \"force-dynamic\""]],
  ["src/app/services/[slug]/page.js", ["export const dynamic = \"force-dynamic\""]],
  ["src/app/blog/page.js", ["export const dynamic = \"force-dynamic\""]],
  ["src/app/blog/[slug]/page.js", ["export const dynamic = \"force-dynamic\""]],
  ["src/app/testimonials/page.js", ["export const dynamic = \"force-dynamic\""]],
  ["src/app/sitemap.js", ["export const dynamic = \"force-dynamic\""]],
  ["src/app/admin/dashboard/page.js", ["publishedBlogs", "Homepage Editor", "/api/blog?all=true"]],
  ["src/app/admin/services/page.js", ["toggleFeatured", "Add to homepage"]],
  ["src/app/api/blog/import-editorial/route.js", ["editorialSlugs", "$setOnInsert", "isPublished: true"]]
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
