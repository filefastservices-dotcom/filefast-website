const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const appRoot = path.join(root, "src", "app");
const sourceRoots = [
  path.join(root, "src", "app"),
  path.join(root, "src", "components")
];
const starterPath = path.join(root, "src", "lib", "starterContent.js");
const starter = fs.readFileSync(starterPath, "utf8");
const serviceSection = starter.split("export const starterBlogPosts")[0];
const blogSection = starter.split("export const starterBlogPosts")[1] || "";
const serviceSlugs = new Set([...serviceSection.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map((m) => m[1]));
const blogSlugs = new Set([...blogSection.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map((m) => m[1]));

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : /\.(js|jsx|ts|tsx)$/.test(entry.name) ? [file] : [];
  });
}

const appRoutes = new Set(["/"]);
for (const file of walk(appRoot)) {
  if (!/page\.(js|jsx|ts|tsx)$/.test(file)) continue;
  let route = path.relative(appRoot, path.dirname(file)).split(path.sep).filter(Boolean)
    .filter((segment) => !/^\(.+\)$/.test(segment) && !segment.startsWith("@"));
  if (route.some((segment) => segment.startsWith("["))) continue;
  appRoutes.add("/" + route.join("/"));
}
const publicRoot = path.join(root, "public");
function routeExists(route) {
  const clean = route.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (appRoutes.has(clean)) return true;
  if (clean.startsWith("/services/")) return serviceSlugs.has(clean.slice("/services/".length));
  if (clean.startsWith("/blog/")) return blogSlugs.has(clean.slice("/blog/".length));
  const asset = path.join(publicRoot, clean.replace(/^\//, ""));
  return fs.existsSync(asset) && fs.statSync(asset).isFile();
}

let checked = 0;
let failed = false;
const seen = new Set();
for (const file of sourceRoots.flatMap(walk)) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/\bhref="(\/[^"]*)"/g)) {
    const route = match[1];
    if (route.includes("${") || route.startsWith("//")) continue;
    const key = file + "::" + route;
    if (seen.has(key)) continue;
    seen.add(key);
    checked += 1;
    if (!routeExists(route)) {
      failed = true;
      console.error(`FAIL: ${path.relative(root, file)} links to missing internal route ${route}`);
    }
  }
}

console.log(`Checked ${checked} literal internal hrefs against App Router pages, starter slugs, and public assets.`);
if (failed) {
  console.error("Internal route validation failed.");
  process.exit(1);
}
console.log("All checked internal routes exist.");
