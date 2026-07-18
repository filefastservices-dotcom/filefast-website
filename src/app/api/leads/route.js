import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

// Public: anyone submitting the contact / lead form on the website
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  if (!body.name || !body.mobile) {
    return NextResponse.json(
      { error: "name and mobile are required" },
      { status: 400 }
    );
  }

  const lead = await Lead.create({
    name: body.name,
    mobile: body.mobile,
    email: body.email || "",
    serviceInterested: body.serviceInterested || "",
    message: body.message || "",
    source: body.source || "website"
  });

  return NextResponse.json({ lead }, { status: 201 });
}

// Admin only: view leads, with simple search + filter
export async function GET(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const service = searchParams.get("service");

  const query = {};
  if (service) query.serviceInterested = service;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ leads });
}
