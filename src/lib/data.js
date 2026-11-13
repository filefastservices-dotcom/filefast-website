import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import Blog from "@/models/Blog";
import { starterBlogPosts, starterServices } from "@/lib/starterContent";
import { googleReviewFallbacks } from "@/lib/googleReviews";

function filterServices(services, { category, featured } = {}) {
  return services.filter((service) =>
    (!category || service.category === category) && (!featured || service.isFeatured)
  );
}

function applyStarterPricing(service) {
  if (!service) return service;
  const fallback = starterServices.find((item) => item.slug === service.slug);
  if (!fallback || service.offerPrice || service.regularPrice || service.pricingNote || (!fallback.offerPrice && !fallback.pricingNote)) return service;
  return {
    ...service,
    regularPrice: fallback.regularPrice,
    offerPrice: fallback.offerPrice,
    pricingUnit: fallback.pricingUnit,
    offerLabel: fallback.offerLabel,
    pricingNote: fallback.pricingNote,
    pricingInfo: fallback.pricingInfo
  };
}

// These helpers are used directly inside Server Components. They fall back to
// bundled starter content so public pages remain available before MongoDB is ready.

export async function getServices({ category, featured } = {}) {
  try {
    await connectDB();
    const query = { isPublished: true };
    if (category) query.category = category;
    if (featured) query.isFeatured = true;
    const [services, knownServices] = await Promise.all([
      Service.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean(),
      Service.find({}, { slug: 1 }).lean()
    ]);
    const result = JSON.parse(JSON.stringify(services));
    // A starter fallback is only for a service that has never been created in
    // MongoDB. Do not re-publish an admin-hidden service through fallback data.
    const knownSlugs = new Set(knownServices.map((service) => service.slug));
    const missingStarterServices = starterServices.filter((service) => !knownSlugs.has(service.slug));
    return filterServices([...result.map(applyStarterPricing), ...missingStarterServices], { category, featured });
  } catch (err) {
    console.error("getServices failed:", err.message);
    return filterServices(starterServices, { category, featured });
  }
}

export async function getServiceBySlug(slug) {
  try {
    await connectDB();
    const storedService = await Service.findOne({ slug }).lean();
    if (storedService) {
      if (!storedService.isPublished) return null;
      return applyStarterPricing(JSON.parse(JSON.stringify(storedService)));
    }
    return starterServices.find((item) => item.slug === slug) || null;
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
    return [...verified, ...googleReviewFallbacks];
  } catch (err) {
    console.error("getTestimonials failed:", err.message);
    return googleReviewFallbacks;
  }
}

function mergeEditorialBlogContent(databasePosts) {
  const editorialBySlug = new Map(starterBlogPosts.map((post) => [post.slug, post]));
  const merged = databasePosts.map((post) => {
    const editorial = editorialBySlug.get(post.slug);
    if (!editorial) return post;
    // Prefer the more complete editorial fallback when the database copy is shorter.
    // Keep database identity and timestamps for existing published records.
    if ((editorial.content || "").length > (post.content || "").length) {
      return {
        ...post,
        title: editorial.title,
        category: editorial.category,
        excerpt: editorial.excerpt,
        content: editorial.content,
        metaTitle: editorial.metaTitle,
        metaDescription: editorial.metaDescription
      };
    }
    return post;
  });
  const existingSlugs = new Set(merged.map((post) => post.slug));
  return [...merged, ...starterBlogPosts.filter((post) => !existingSlugs.has(post.slug))];
}

export async function getBlogPosts({ limit } = {}) {
  try {
    await connectDB();
    const [posts, knownPosts] = await Promise.all([
      Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean(),
      Blog.find({}, { slug: 1 }).lean()
    ]);
    const result = JSON.parse(JSON.stringify(posts));
    const merged = mergeEditorialBlogContent(result);
    // Do not reintroduce a starter article that an admin has deliberately unpublished.
    const knownSlugs = new Set(knownPosts.map((post) => post.slug));
    const visiblePosts = merged.filter((post) => !knownSlugs.has(post.slug) || result.some((stored) => stored.slug === post.slug));
    return limit ? visiblePosts.slice(0, limit) : visiblePosts;
  } catch (err) {
    console.error("getBlogPosts failed:", err.message);
    return limit ? starterBlogPosts.slice(0, limit) : starterBlogPosts;
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    await connectDB();
    const storedPost = await Blog.findOne({ slug }).lean();
    if (storedPost) {
      if (!storedPost.isPublished) return null;
      const result = JSON.parse(JSON.stringify(storedPost));
      return mergeEditorialBlogContent([result])[0] || result;
    }
    return starterBlogPosts.find((item) => item.slug === slug) || null;
  } catch (err) {
    console.error("getBlogPostBySlug failed:", err.message);
    return starterBlogPosts.find((item) => item.slug === slug) || null;
  }
}
