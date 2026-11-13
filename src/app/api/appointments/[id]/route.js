import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req, { params }) {
  const { id } = await params;
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();
  const appointment = await Appointment.findByIdAndUpdate(id, body, { new: true });
  if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ appointment });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
