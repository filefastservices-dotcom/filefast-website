import { getServices, getBlogPosts } from "@/lib/data";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.filefastglobal.com").replace(/\/+$/, "");

function lastModified(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap() {
  const [services, posts] = await Promise.all([getServices({}), getBlogPosts({})]);

  // Do not assign today's date to unchanged pages. lastModified is a hint to
  // search engines and should only be present when a real update date exists.
  const staticRoutes = [
    "",
    "/services",
    "/about",
    "/testimonials",
    "/blog",
    "/contact",
    "/global",
    "/appointments",
    "/privacy-policy"
  ].map((path) => ({ url: `${SITE_URL}${path}` }));

  const serviceRoutes = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    ...(lastModified(service.updatedAt) ? { lastModified: lastModified(service.updatedAt) } : {})
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(lastModified(post.updatedAt) ? { lastModified: lastModified(post.updatedAt) } : {})
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
