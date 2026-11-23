const fs = require("node:fs");

function readEditorial(path, exportName) {
  const file = fs.readFileSync(path, "utf8");
  const start = file.indexOf("=");
  if (start < 0) throw new Error(exportName + " export is missing an assignment");
  return JSON.parse(file.slice(start + 1).trim().replace(/;\s*$/, ""));
}

const expansion = readEditorial("src/lib/seoEditorialExpansion.js", "seoEditorialExpansion");
const phaseTwo = readEditorial("src/lib/phaseTwoEditorialPosts.js", "phaseTwoEditorialPosts");
const starterFile = fs.readFileSync("src/lib/starterContent.js", "utf8");
const starterStart = starterFile.indexOf("const starterBlogPostsBase = [");
const starterEnd = starterFile.indexOf("\n];", starterStart);
if (starterStart < 0 || starterEnd < 0) throw new Error("Starter blog catalogue could not be read");
const starterSource = starterFile.slice(starterStart, starterEnd);
const starterSlugs = [...starterSource.matchAll(/"slug":\s*"([^"]+)"/g)].map((match) => match[1]);
const editorialPosts = [...expansion, ...phaseTwo];
const allSlugs = [...starterSlugs, ...editorialPosts.map((post) => post.slug)];
const failures = [];
const slugs = new Set();

if (allSlugs.length < 100) failures.push("The public starter catalogue must contain at least 100 articles.");
for (const slug of allSlugs) {
  if (!slug || slugs.has(slug)) failures.push("Missing or duplicate slug: " + slug);
  slugs.add(slug);
}
for (const post of editorialPosts) {
  if (!post.title || post.title.length > 90) failures.push("Missing or excessively long title: " + post.slug);
  if (!post.metaTitle || post.metaTitle.length < 30 || post.metaTitle.length > 70) failures.push("Meta title should be 30–70 characters: " + post.slug);
  if (!post.metaDescription || post.metaDescription.length < 70 || post.metaDescription.length > 170) failures.push("Meta description should be 70–170 characters: " + post.slug);
  if (!post.excerpt || post.excerpt.length < 80) failures.push("Excerpt is too short: " + post.slug);
  if (!post.content || post.content.length < 1800) failures.push("Article content is too short: " + post.slug);
  if (!/Official reference:|Official verification|Reference:/.test(post.content)) failures.push("Add an official verification reference: " + post.slug);
  if (!/## How FileFast(?: Global)? can help/.test(post.content)) failures.push("Missing relevant service next step: " + post.slug);
}

if (failures.length) {
  console.error("Editorial quality checks failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("Editorial quality checks passed for " + allSlugs.length + " unique articles (" + editorialPosts.length + " expanded guides).");
