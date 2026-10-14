const SITE_URL = "https://www.filefastglobal.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"]
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
