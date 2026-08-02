import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import Blog from "@/models/Blog";
import { starterBlogPosts, starterServices, starterTestimonials } from "@/lib/starterContent";

function filterServices(services, { category, featured } = {}) {
  return services.filter((service) =>
    (!category || service.category === category) && (!featured || service.isFeatured)
  );
}

// These helpers are used directly inside Server Components. They fall back to
// bundled starter content so public pages remain available before MongoDB is ready.

export async function getServices({ category, featured } = {}) {
  try {
    await connectDB();
    const query = { isPublished: true };
    if (category) query.category = category;
    if (featured) query.isFeatured = true;
    const services = await Service.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean();
    const result = JSON.parse(JSON.stringify(services));
    return result.length ? result : filterServices(starterServices, { category, featured });
  } catch (err) {
    console.error("getServices failed:", err.message);
    return filterServices(starterServices, { category, featured });
  }
}

export async function getServiceBySlug(slug) {
  try {
    await connectDB();
    const service = await Service.findOne({ slug, isPublished: true }).lean();
    return service ? JSON.parse(JSON.stringify(service)) : starterServices.find((item) => item.slug === slug) || null;
  } catch (err) {
    console.error("getServiceBySlug failed:", err.message);
    return starterServices.find((item) => item.slug === slug) || null;
  }
}

export async function getTestimonials() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    const result = JSON.parse(JSON.stringify(testimonials));
    const verified = result.filter((item) =>
      item.clientName?.toLowerCase() !== "sample client" && !item.quote?.startsWith("Example feedback:")
    );
    return verified.length ? verified : starterTestimonials;
  } catch (err) {
    console.error("getTestimonials failed:", err.message);
    return starterTestimonials;
  }
}

export async function getBlogPosts({ limit } = {}) {
  try {
    await connectDB();
    let q = Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    const posts = await q.lean();
    const result = JSON.parse(JSON.stringify(posts));
    const slugs = new Set(result.map((post) => post.slug));
    const merged = [...result, ...starterBlogPosts.filter((post) => !slugs.has(post.slug))];
    return limit ? merged.slice(0, limit) : merged;
  } catch (err) {
    console.error("getBlogPosts failed:", err.message);
    return limit ? starterBlogPosts.slice(0, limit) : starterBlogPosts;
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    await connectDB();
    const post = await Blog.findOne({ slug, isPublished: true }).lean();
    return post ? JSON.parse(JSON.stringify(post)) : starterBlogPosts.find((item) => item.slug === slug) || null;
  } catch (err) {
    console.error("getBlogPostBySlug failed:", err.message);
    return starterBlogPosts.find((item) => item.slug === slug) || null;
  }
}
