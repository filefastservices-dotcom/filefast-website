import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import HomepageContent from "@/models/HomepageContent";
import { requireAdmin } from "@/lib/requireAdmin";
import { DEFAULT_HOMEPAGE_CONTENT } from "@/lib/homepageContent";

const TEXT_LIMITS = {
  heroEyebrow: 100,
  heroTitle: 120,
  heroHighlight: 100,
  heroDescription: 400,
  heroLocation: 400,
  primaryCtaLabel: 40,
  secondaryCtaLabel: 40,
  announcementText: 180,
  metaTitle: 60,
  metaDescription: 160
};

function validatePayload(body) {
  const payload = {};
  for (const [field, max] of Object.entries(TEXT_LIMITS)) {
    if (body[field] === undefined) continue;
    if (typeof body[field] !== "string") return { error: field + " must be text." };
    const value = body[field].trim();
    if (value.length > max) return { error: field + " must be " + max + " characters or fewer." };
    payload[field] = value;
  }
  if (body.announcementEnabled !== undefined) {
    if (typeof body.announcementEnabled !== "boolean") return { error: "announcementEnabled must be true or false." };
    payload.announcementEnabled = body.announcementEnabled;
  }
  if (payload.heroTitle !== undefined && !payload.heroTitle) return { error: "Hero title cannot be empty." };
  if (payload.heroHighlight !== undefined && !payload.heroHighlight) return { error: "Hero highlight cannot be empty." };
  if (payload.metaTitle !== undefined && !payload.metaTitle) return { error: "SEO title cannot be empty." };
  if (payload.metaDescription !== undefined && !payload.metaDescription) return { error: "SEO description cannot be empty." };
  return { payload };
}

export async function GET(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const saved = await HomepageContent.findOne({ key: "home" }).lean();
    return NextResponse.json({ content: { ...DEFAULT_HOMEPAGE_CONTENT, ...(saved ? JSON.parse(JSON.stringify(saved)) : {}) } });
  } catch (error) {
    return NextResponse.json({ error: "Unable to load homepage content." }, { status: 503 });
  }
}

export async function PUT(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const validation = validatePayload(body);
  if (validation.error) return NextResponse.json({ error: validation.error }, { status: 400 });
  try {
    await connectDB();
    const content = await HomepageContent.findOneAndUpdate(
      { key: "home" },
      { $set: validation.payload, $setOnInsert: { key: "home" } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    revalidatePath("/");
    return NextResponse.json({ success: true, content: { ...DEFAULT_HOMEPAGE_CONTENT, ...JSON.parse(JSON.stringify(content)) } });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save homepage content. Please retry." }, { status: 503 });
  }
}
