import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/requireAdmin";
import { starterBlogPosts } from "@/lib/starterContent";

const editorialSlugs = [
  "gst-input-tax-credit-reconciliation-guide",
  "lut-export-goods-services-gst-guide",
  "ecommerce-marketplace-gst-tcs-reconciliation",
  "tds-freelancers-contractors-business-checklist",
  "small-business-month-end-accounting-checklist-india"
];

export async function POST(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const selected = starterBlogPosts.filter((post) => editorialSlugs.includes(post.slug));
  let created = 0;
  let existing = 0;

  for (const post of selected) {
    const result = await Blog.updateOne(
      { slug: post.slug },
      {
        $setOnInsert: {
          title: post.title,
          slug: post.slug,
          category: post.category,
          excerpt: post.excerpt,
          content: post.content,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          isPublished: true
        }
      },
      { upsert: true }
    );
    if (result.upsertedCount) created += 1;
    else existing += 1;
  }

  return NextResponse.json({ success: true, created, existing, total: selected.length });
}
