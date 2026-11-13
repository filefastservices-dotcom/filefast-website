import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

const ALLOWED_STATUSES = ["new", "contacted", "qualified", "converted", "lost"];

export async function PATCH(req, { params }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid update request." }, { status: 400 });
  }

  const update = {};
  if (body.status !== undefined) {
    if (!ALLOWED_STATUSES.includes(body.status)) return NextResponse.json({ error: "Choose a valid lead status." }, { status: 400 });
    update.status = body.status;
  }
  if (body.internalNotes !== undefined) {
    if (typeof body.internalNotes !== "string" || body.internalNotes.length > 5000) return NextResponse.json({ error: "Internal notes must be 5,000 characters or fewer." }, { status: 400 });
    update.internalNotes = body.internalNotes.trim();
  }
  if (body.followUpAt !== undefined) {
    if (body.followUpAt === null || body.followUpAt === "") update.followUpAt = null;
    else {
      const date = new Date(body.followUpAt);
      if (Number.isNaN(date.getTime())) return NextResponse.json({ error: "Enter a valid follow-up date." }, { status: 400 });
      update.followUpAt = date;
    }
  }
  if (body.estimatedValue !== undefined) {
    const value = Number(body.estimatedValue);
    if (!Number.isFinite(value) || value < 0 || value > 1000000000) return NextResponse.json({ error: "Enter a valid estimated value." }, { status: 400 });
    update.estimatedValue = value;
  }
  if (!Object.keys(update).length) return NextResponse.json({ error: "No valid fields supplied." }, { status: 400 });

  try {
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(params.id, { $set: update }, { new: true, runValidators: true }).lean();
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ lead });
  } catch (error) {
    console.error("Lead update failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to update this lead." }, { status: 503 });
  }
}
