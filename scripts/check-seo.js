const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const checks = [
  {
    file: "src/app/layout.js",
    description: "Production metadata base is the canonical domain",
    test: (content) => content.includes('metadataBase: new URL("https://www.filefastglobal.com")')
  },
  {
    file: "src/app/sitemap.js",
    description: "Sitemap uses the canonical production domain",
    test: (content) => content.includes('const SITE_URL = "https://www.filefastglobal.com";')
  },
  {
    file: "src/app/robots.js",
    description: "Robots sitemap points to the canonical production domain",
    test: (content) => content.includes('const SITE_URL = "https://www.filefastglobal.com";') &&
      content.includes('${SITE_URL}/sitemap.xml')
  },
  {
    file: "src/app/services/[slug]/page.js",
    description: "Service JSON-LD includes canonical Service and Breadcrumb IDs",
    test: (content) => content.includes('"@id": serviceUrl + "#service"') &&
      content.includes('"@id": serviceUrl + "#breadcrumb"') &&
      content.includes('"@id": serviceUrl + "#faq"')
  },
  {
    file: "src/app/services/[slug]/page.js",
    description: "Service FAQ schema is generated from visible service FAQ data",
    test: (content) => content.includes('service.faqs.map((faq) => ({') &&
      content.includes('name: faq.question') &&
      content.includes('text: faq.answer')
  },
  {
    file: "src/app/testimonials/page.js",
    description: "Testimonials page does not promise fabricated review verification",
    test: (content) => !/verified Google reviews|100% genuine reviews|guaranteed reviews/i.test(content)
  }
];

let failed = false;
for (const check of checks) {
  const filePath = path.join(root, check.file);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: ${check.description} — missing file ${check.file}`);
    failed = true;
    continue;
  }
  const content = fs.readFileSync(filePath, "utf8");
  if (!check.test(content)) {
    console.error(`FAIL: ${check.description} (${check.file})`);
    failed = true;
  } else {
    console.log(`PASS: ${check.description}`);
  }
}

if (failed) {
  console.error("\nSEO safeguard checks failed.");
  process.exit(1);
}
console.log("\nAll SEO safeguard checks passed.");
