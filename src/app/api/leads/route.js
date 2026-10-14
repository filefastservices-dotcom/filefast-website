import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SERVICE_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

// Public: accept consultation requests without exposing stored lead records.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  // Hidden honeypot helps filter simple automated spam submissions.
  if (cleanText(body?.website, 200)) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const name = cleanText(body?.name, MAX_NAME_LENGTH);
  const mobile = cleanText(body?.mobile, 30);
  const email = cleanText(body?.email, MAX_EMAIL_LENGTH);
  const serviceInterested = cleanText(body?.serviceInterested, MAX_SERVICE_LENGTH);
  const message = cleanText(body?.message, MAX_MESSAGE_LENGTH);
  const mobileDigits = mobile.replace(/\D/g, "");

  if (name.length < 2) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  if (mobileDigits.length < 7 || mobileDigits.length > 15) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  try {
    await connectDB();
    await Lead.create({ name, mobile, email, serviceInterested, message, source: "website" });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "We could not save your request right now. Please contact us by WhatsApp or phone." }, { status: 503 });
  }
}

// Admin only: view leads, with simple search + filter.
export async function GET(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").slice(0, 100);
    const service = (searchParams.get("service") || "").slice(0, MAX_SERVICE_LENGTH);
    const query = {};
    if (service) query.serviceInterested = service;
    if (search) {
      const safeSearch = search.replace(/[^a-zA-Z0-9 @+._-]/g, "").replace(/[.+]/g, "\\$&");
      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { mobile: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } }
      ];
    }
    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(500).lean();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Lead list failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to load leads." }, { status: 503 });
  }
}
