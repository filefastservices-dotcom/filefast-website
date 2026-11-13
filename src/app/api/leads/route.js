import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SERVICE_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;
const LEAD_STATUSES = ["new", "contacted", "qualified", "converted", "lost"];

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Public: accept consultation requests without exposing stored lead records.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  if (cleanText(body?.website, 200)) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const name = cleanText(body?.name, MAX_NAME_LENGTH);
  const mobile = cleanText(body?.mobile, 30);
  const email = cleanText(body?.email, MAX_EMAIL_LENGTH);
  const serviceInterested = cleanText(body?.serviceInterested, MAX_SERVICE_LENGTH);
  const message = cleanText(body?.message, MAX_MESSAGE_LENGTH);
  const source = cleanText(body?.source, 300) || "website";
  const mobileDigits = mobile.replace(/\D/g, "");

  if (name.length < 2) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  if (mobileDigits.length < 7 || mobileDigits.length > 15) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address or leave it blank." }, { status: 400 });

  try {
    await connectDB();
    await Lead.create({ name, mobile, email, serviceInterested, message, source });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "We could not save your request right now. Please contact us by WhatsApp or phone." }, { status: 503 });
  }
}

// Admin only: search and filter lead records.
export async function GET(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").slice(0, 100);
    const service = (searchParams.get("service") || "").slice(0, MAX_SERVICE_LENGTH);
    const status = (searchParams.get("status") || "").slice(0, 20);
    const followUp = (searchParams.get("followUp") || "").slice(0, 20);
    const now = new Date();
    const query = {};

    if (service) query.serviceInterested = service;
    if (status === "new") query.$or = [{ status: "new" }, { status: { $exists: false } }];
    else if (LEAD_STATUSES.includes(status)) query.status = status;
    if (followUp === "due") {
      query.followUpAt = { $ne: null, $lte: now };
      query.status = { $nin: ["converted", "lost"] };
    } else if (followUp === "upcoming") {
      const end = new Date(now);
      end.setDate(end.getDate() + 7);
      query.followUpAt = { $gt: now, $lte: end };
      query.status = { $nin: ["converted", "lost"] };
    }

    if (search) {
      const safeSearch = escapeRegex(search);
      const searchConditions = [
        { name: { $regex: safeSearch, $options: "i" } },
        { mobile: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } }
      ];
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchConditions }];
        delete query.$or;
      } else {
        query.$or = searchConditions;
      }
    }

    const sort = followUp ? { followUpAt: 1, createdAt: -1 } : { createdAt: -1 };
    const leads = await Lead.find(query).sort(sort).limit(500).lean();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Lead list failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to load leads." }, { status: 503 });
  }
}
