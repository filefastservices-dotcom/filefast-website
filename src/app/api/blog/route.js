import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/requireAdmin";

// Public: list published blog posts
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";

  const query = all ? {} : { isPublished: true };
  const posts = await Blog.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ posts: JSON.parse(JSON.stringify(posts)) });
}

// Admin only: create blog post
export async function POST(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();

  if (!body.title || !body.slug || !body.content) {
    return NextResponse.json(
      { error: "title, slug, and content are required" },
      { status: 400 }
    );
  }

  try {
    const blog = await Blog.create(body);
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
