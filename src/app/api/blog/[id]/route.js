import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req, { params }) {
  await connectDB();
  const blog = await Blog.findById(params.id).lean();
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) });
}

export async function PUT(req, { params }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();
  const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ blog: JSON.parse(JSON.stringify(blog)) });
}

export async function DELETE(req, { params }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const blog = await Blog.findByIdAndDelete(params.id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
