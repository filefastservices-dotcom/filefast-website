import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/requireAdmin";
import { validateBlogPayload } from "@/lib/blogValidation";

export async function GET(req, { params }) {
  const { id } = await params;
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const blog = await Blog.findById(id).lean();
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) });
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const validation = validateBlogPayload(body, { partial: true });
  if (validation.error) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const blog = await Blog.findByIdAndUpdate(id, validation.payload, { new: true, runValidators: true });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
