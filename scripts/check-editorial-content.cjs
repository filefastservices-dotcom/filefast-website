const fs = require("node:fs");

const file = fs.readFileSync("src/lib/seoEditorialExpansion.js", "utf8");
const start = file.indexOf("=");
if (start < 0) throw new Error("Editorial export is missing an assignment");
const source = file.slice(start + 1).trim().replace(/;\\s*$/, "");
const posts = JSON.parse(source);
const failures = [];
const slugs = new Set();

if (posts.length < 8) failures.push("At least eight new editorial guides are expected.");
for (const post of posts) {
  if (!post.slug || slugs.has(post.slug)) failures.push("Missing or duplicate slug: " + post.slug);
  slugs.add(post.slug);
  if (!post.title || post.title.length > 90) failures.push("Missing or excessively long title: " + post.slug);
  if (!post.metaTitle || post.metaTitle.length < 30 || post.metaTitle.length > 70) failures.push("Meta title should be 30–70 characters: " + post.slug);
  if (!post.metaDescription || post.metaDescription.length < 70 || post.metaDescription.length > 170) failures.push("Meta description should be 70–170 characters: " + post.slug);
  if (!post.excerpt || post.excerpt.length < 80) failures.push("Excerpt is too short: " + post.slug);
  if (!post.content || post.content.length < 1800) failures.push("Article content is too short: " + post.slug);
  if (!/Official reference:|Reference:/.test(post.content)) failures.push("Add a relevant official reference: " + post.slug);
  if (!/## How FileFast can help/.test(post.content)) failures.push("Missing relevant service next step: " + post.slug);
}

if (failures.length) {
  console.error("Editorial quality checks failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("Editorial quality checks passed for " + posts.length + " articles.");
