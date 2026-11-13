import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/requireAdmin";
import { validateBlogPayload } from "@/lib/blogValidation";

// Public: list published blog posts
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";
  // Draft and unpublished editorial content must only be visible to admins.
  if (all) {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;
  }

  const query = all ? {} : { isPublished: true };
  const posts = await Blog.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ posts: JSON.parse(JSON.stringify(posts)) });
}

// Admin only: create blog post
export async function POST(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBlogPayload(body);
  if (validation.error) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const blog = await Blog.create(validation.payload);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "A blog post with this URL slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
