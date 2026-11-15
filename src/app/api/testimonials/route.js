import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/requireAdmin";
import { validateTestimonialPayload } from "@/lib/testimonialValidation";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";
  if (all) {
    const unauthorized = await requireAdmin(req);
    if (unauthorized) return unauthorized;
  }

  const query = all ? {} : { isPublished: true };
  const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ testimonials });
}

export async function POST(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const validation = validateTestimonialPayload(body);
  if (validation.error) return NextResponse.json({ error: validation.error }, { status: 400 });
  const testimonial = await Testimonial.create(validation.payload);
  return NextResponse.json({ testimonial }, { status: 201 });
}
