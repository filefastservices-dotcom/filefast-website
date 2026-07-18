import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { requireAdmin } from "@/lib/requireAdmin";

// :key may be a URL slug (public reads) or a Mongo _id (admin edit screens)
async function findService(key) {
  const byId = key.match(/^[0-9a-fA-F]{24}$/) ? await Service.findById(key) : null;
  return byId || (await Service.findOne({ slug: key }));
}

export async function GET(req, { params }) {
  await connectDB();
  const service = await findService(params.slug);
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ service });
}

export async function PUT(req, { params }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();
  const service = await findService(params.slug);
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

  Object.assign(service, body);

  try {
    await service.save();
    return NextResponse.json({ service });
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

export async function DELETE(req, { params }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const service = await findService(params.slug);
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await service.deleteOne();
  return NextResponse.json({ success: true });
}
