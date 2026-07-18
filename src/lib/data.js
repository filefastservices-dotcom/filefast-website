import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import Blog from "@/models/Blog";

// These helpers are used directly inside Server Components.
// Each one fails safe (returns []) so the site still renders
// even before MONGODB_URI is configured.

export async function getServices({ category, featured } = {}) {
  try {
    await connectDB();
    const query = { isPublished: true };
    if (category) query.category = category;
    if (featured) query.isFeatured = true;
    const services = await Service.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch (err) {
    console.error("getServices failed:", err.message);
    return [];
  }
}

export async function getServiceBySlug(slug) {
  try {
    await connectDB();
    const service = await Service.findOne({ slug, isPublished: true }).lean();
    return service ? JSON.parse(JSON.stringify(service)) : null;
  } catch (err) {
    console.error("getServiceBySlug failed:", err.message);
    return null;
  }
}

export async function getTestimonials() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(testimonials));
  } catch (err) {
    console.error("getTestimonials failed:", err.message);
    return [];
  }
}

export async function getBlogPosts({ limit } = {}) {
  try {
    await connectDB();
    let q = Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    if (limit) q = q.limit(limit);
    const posts = await q.lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (err) {
    console.error("getBlogPosts failed:", err.message);
    return [];
  }
}
