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
  const source = cleanText(body?.source, 300) || "website";
  const utmSource = cleanText(body?.utmSource, 120);
  const utmMedium = cleanText(body?.utmMedium, 120);
  const utmCampaign = cleanText(body?.utmCampaign, 160);
  const utmContent = cleanText(body?.utmContent, 160);
  const utmTerm = cleanText(body?.utmTerm, 160);
  const landingPageRaw = cleanText(body?.landingPage, 300);
  const landingPage = landingPageRaw.startsWith("/") && !landingPageRaw.startsWith("//") ? landingPageRaw.split(/[?#]/)[0] : "";
  const referrerHost = cleanText(body?.referrerHost, 120).replace(/[^a-zA-Z0-9.-]/g, "");
  const mobileDigits = mobile.replace(/\D/g, "");

  if (name.length < 2) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  if (mobileDigits.length < 7 || mobileDigits.length > 15) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (body?.consent !== true) return NextResponse.json({ error: "Please confirm that FileFast may use your details to respond to this enquiry." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address or leave it blank." }, { status: 400 });

  try {
    await connectDB();
    await Lead.create({ name, mobile, email, serviceInterested, message, source, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, landingPage, referrerHost, consent: true, consentAt: new Date(), consentVersion: "2026-11-23-v1" });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "We could not save your request right now. Please contact us by WhatsApp or phone." }, { status: 503 });
  }
}

// Admin only: view leads, with simple search + filter.
export async function GET(req) {
  const unauthorized = await requireAdmin(req);
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


// Admin only: update a lead's pipeline status and internal follow-up details.
export async function PATCH(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid update." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Please submit a valid update." }, { status: 400 });
  }

  const id = cleanText(body.id, 40);
  if (!/^[a-f\d]{24}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid lead reference." }, { status: 400 });
  }

  const allowedStatuses = ["new", "contacted", "qualified", "converted", "lost"];
  const update = {};
  if (Object.prototype.hasOwnProperty.call(body, "status")) {
    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Choose a valid lead status." }, { status: 400 });
    }
    update.status = body.status;
    update.statusUpdatedAt = new Date();
  }
  if (Object.prototype.hasOwnProperty.call(body, "internalNote")) {
    update.internalNote = cleanText(body.internalNote, 1200);
  }
  if (Object.prototype.hasOwnProperty.call(body, "followUpAt")) {
    if (body.followUpAt === null || body.followUpAt === "") {
      update.followUpAt = null;
    } else if (typeof body.followUpAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.followUpAt)) {
      const parsed = new Date(body.followUpAt + "T00:00:00.000Z");
      if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== body.followUpAt) {
        return NextResponse.json({ error: "Enter a valid follow-up date." }, { status: 400 });
      }
      update.followUpAt = parsed;
    } else {
      return NextResponse.json({ error: "Enter a valid follow-up date." }, { status: 400 });
    }
  }
  if (!Object.keys(update).length) {
    return NextResponse.json({ error: "No changes were provided." }, { status: 400 });
  }

  try {
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true }).lean();
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Lead update failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to update this lead." }, { status: 503 });
  }
}
