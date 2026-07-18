import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";

  const query = all ? {} : { isPublished: true };
  const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ testimonials });
}

export async function POST(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();
  if (!body.clientName || !body.quote) {
    return NextResponse.json(
      { error: "clientName and quote are required" },
      { status: 400 }
    );
  }
  const testimonial = await Testimonial.create(body);
  return NextResponse.json({ testimonial }, { status: 201 });
}
