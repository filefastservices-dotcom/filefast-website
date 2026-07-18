import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featuredOnly = searchParams.get("featured") === "true";
  const includeUnpublished = searchParams.get("all") === "true";

  const query = {};
  if (!includeUnpublished) query.isPublished = true;
  if (category) query.category = category;
  if (featuredOnly) query.isFeatured = true;

  const services = await Service.find(query).sort({ sortOrder: 1, createdAt: -1 });
  return NextResponse.json({ services });
}

export async function POST(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();

  if (!body.name || !body.slug || !body.category || !body.shortDescription) {
    return NextResponse.json(
      { error: "name, slug, category and shortDescription are required" },
      { status: 400 }
    );
  }

  try {
    const service = await Service.create(body);
    return NextResponse.json({ service }, { status: 201 });
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "A service with this URL slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
