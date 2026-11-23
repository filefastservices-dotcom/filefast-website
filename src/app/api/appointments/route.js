import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { requireAdmin } from "@/lib/requireAdmin";

const MAX = {
  name: 100,
  email: 254,
  phone: 30,
  service: 120,
  notes: 2000
};

function cleanText(value, limit) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

// Public: accept a consultation request without exposing stored appointment records.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid appointment request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Please submit a valid appointment request." }, { status: 400 });
  }

  const clientName = cleanText(body.clientName, MAX.name);
  const clientEmail = cleanText(body.clientEmail, MAX.email);
  const clientPhone = cleanText(body.clientPhone, MAX.phone);
  const serviceRequired = cleanText(body.serviceRequired, MAX.service);
  const preferredDate = cleanText(body.preferredDate, 10);
  const preferredTime = cleanText(body.preferredTime, 10);
  const notes = cleanText(body.notes, MAX.notes);
  const phoneDigits = clientPhone.replace(/\D/g, "");
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail);
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(preferredDate)
    ? new Date(preferredDate + "T00:00:00.000Z")
    : null;
  const dateIsValid = parsedDate && !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === preferredDate;
  const todayInIndia = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());

  if (clientName.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!emailIsValid) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (phoneDigits.length < 7 || phoneDigits.length > 15) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (!serviceRequired) return NextResponse.json({ error: "Please select the service you need." }, { status: 400 });
  if (!dateIsValid || preferredDate < todayInIndia) return NextResponse.json({ error: "Please choose a valid future date." }, { status: 400 });
  if (preferredTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(preferredTime)) return NextResponse.json({ error: "Please choose a valid preferred time." }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ error: "Please confirm that FileFast may use your details to respond to this request." }, { status: 400 });

  try {
    await connectDB();
    const appointment = await Appointment.create({
      clientName,
      clientEmail,
      clientPhone,
      serviceRequired,
      preferredDate: parsedDate,
      preferredTime,
      notes,
      consent: true,
      consentAt: new Date(),
      consentVersion: "2026-11-23-v1"
    });

    return NextResponse.json({ success: true, appointmentId: String(appointment._id) }, { status: 201 });
  } catch (error) {
    console.error("Appointment submission failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "We could not save your request right now. Please contact FileFast by WhatsApp or phone." }, { status: 503 });
  }
}

// Admin only: View all appointments
export async function GET(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = (searchParams.get("search") || "").slice(0, 100);
    const query = {};
    if (status) query.status = status;
    if (search) {
      const safeSearch = search.replace(/[^a-zA-Z0-9 @+._-]/g, "").replace(/[.+]/g, "\\$&");
      query.$or = [
        { clientName: { $regex: safeSearch, $options: "i" } },
        { clientPhone: { $regex: safeSearch, $options: "i" } },
        { serviceRequired: { $regex: safeSearch, $options: "i" } }
      ];
    }

    const appointments = await Appointment.find(query).sort({ preferredDate: 1, createdAt: -1 });
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Appointment list failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to load appointments." }, { status: 503 });
  }
}
