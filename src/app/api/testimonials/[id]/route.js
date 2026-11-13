import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/requireAdmin";
import { validateTestimonialPayload } from "@/lib/testimonialValidation";

export async function PUT(req, { params }) {
  const { id } = await params;
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const validation = validateTestimonialPayload(body, { partial: true });
  if (validation.error) return NextResponse.json({ error: validation.error }, { status: 400 });
  const existing = await Testimonial.findById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (validation.payload.isPublished === true && existing.publicationConsent !== true && validation.payload.publicationConsent !== true) {
    return NextResponse.json({ error: "Publication is blocked until client consent is recorded" }, { status: 400 });
  }
  const testimonial = await Testimonial.findByIdAndUpdate(id, validation.payload, { new: true, runValidators: true });
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ testimonial });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const testimonial = await Testimonial.findByIdAndDelete(id);
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
