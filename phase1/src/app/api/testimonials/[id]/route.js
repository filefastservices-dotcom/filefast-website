import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req, { params }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();
  const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true });
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ testimonial });
}

export async function DELETE(req, { params }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const testimonial = await Testimonial.findByIdAndDelete(params.id);
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
