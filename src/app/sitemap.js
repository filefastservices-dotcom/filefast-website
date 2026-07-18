import { getServices, getBlogPosts } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://filefast.in";

export default async function sitemap() {
  const [services, posts] = await Promise.all([getServices({}), getBlogPosts({})]);

  const staticRoutes = ["", "/services", "/about", "/testimonials", "/blog", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date()
    })
  );

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date()
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date()
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
