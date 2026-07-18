import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { requireAdmin } from "@/lib/requireAdmin";

// Public: Book an appointment
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  if (!body.clientName || !body.clientPhone || !body.serviceRequired || !body.preferredDate) {
    return NextResponse.json(
      { error: "Required fields: clientName, clientPhone, serviceRequired, preferredDate" },
      { status: 400 }
    );
  }

  const appointment = await Appointment.create({
    clientName: body.clientName,
    clientEmail: body.clientEmail || "",
    clientPhone: body.clientPhone,
    serviceRequired: body.serviceRequired,
    preferredDate: body.preferredDate,
    preferredTime: body.preferredTime || "",
    notes: body.notes || ""
  });

  return NextResponse.json({ appointment }, { status: 201 });
}

// Admin only: View all appointments
export async function GET(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { clientName: { $regex: search, $options: "i" } },
      { clientPhone: { $regex: search, $options: "i" } },
      { serviceRequired: { $regex: search, $options: "i" } }
    ];
  }

  const appointments = await Appointment.find(query).sort({ preferredDate: 1, createdAt: -1 });
  return NextResponse.json({ appointments });
}
