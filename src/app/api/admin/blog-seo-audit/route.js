import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/requireAdmin";

function wordCount(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").trim().split(/\\s+/).filter(Boolean).length;
}

function auditPost(post) {
  const issues = [];
  const title = String(post.metaTitle || "").trim();
  const description = String(post.metaDescription || "").trim();
  const excerpt = String(post.excerpt || "").trim();
  const slug = String(post.slug || "").trim();
  const words = wordCount(post.content);
  if (!title) issues.push({ code: "missing_title", severity: "high", message: "Add a unique SEO title." });
  else if (title.length < 30 || title.length > 60) issues.push({ code: "title_length", severity: "medium", message: "Review title length; current length is " + title.length + " characters." });
  if (!description) issues.push({ code: "missing_description", severity: "high", message: "Add a useful meta description." });
  else if (description.length < 70 || description.length > 160) issues.push({ code: "description_length", severity: "medium", message: "Review description length; current length is " + description.length + " characters." });
  if (!excerpt) issues.push({ code: "missing_excerpt", severity: "medium", message: "Add a concise article excerpt." });
  if (!post.featuredImageUrl) issues.push({ code: "missing_image", severity: "medium", message: "Add a relevant featured image and descriptive alt text in the publishing workflow." });
  if (!slug || slug.length > 75 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) issues.push({ code: "slug_format", severity: "medium", message: "Use a short, readable, lowercase hyphenated URL slug." });
  if (words < 300) issues.push({ code: "thin_content_review", severity: "medium", message: "Article has " + words + " words; review whether it fully answers the reader's question. Do not add filler just to reach a word count." });
  if (!post.category) issues.push({ code: "missing_category", severity: "low", message: "Assign a relevant content category." });
  return {
    id: String(post._id),
    title: post.title,
    slug,
    url: "https://www.filefastglobal.com/blog/" + slug,
    isPublished: Boolean(post.isPublished),
    updatedAt: post.updatedAt || post.createdAt || null,
    wordCount: words,
    titleLength: title.length,
    descriptionLength: description.length,
    issueCount: issues.length,
    issues
  };
}

export async function GET(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const posts = await Blog.find({})
      .select("title slug category excerpt content featuredImageUrl metaTitle metaDescription isPublished createdAt updatedAt")
      .sort({ updatedAt: -1 })
      .limit(500)
      .lean();
    const audited = posts.map(auditPost);
    const summary = {
      total: audited.length,
      published: audited.filter((post) => post.isPublished).length,
      drafts: audited.filter((post) => !post.isPublished).length,
      needsReview: audited.filter((post) => post.issueCount > 0).length,
      highPriorityIssues: audited.reduce((sum, post) => sum + post.issues.filter((issue) => issue.severity === "high").length, 0)
    };
    return NextResponse.json({ summary, posts: audited });
  } catch (error) {
    console.error("Blog SEO audit failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to audit blog content." }, { status: 503 });
  }
}
