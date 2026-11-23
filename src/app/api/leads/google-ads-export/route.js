import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

function hash(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized ? createHash("sha256").update(normalized, "utf8").digest("hex") : "";
}

function cell(value) {
  let text = String(value ?? "").replace(/[\r\n]/g, " ");
  if (/^[\t ]*[=+@-]/.test(text)) text = "'" + text;
  return '"' + text.replace(/"/g, '""') + '"';
}

export async function GET(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const leads = await Lead.find({
      adsMeasurementConsent: true,
      status: { $in: ["qualified", "converted"] },
      statusUpdatedAt: { $ne: null }
    }).sort({ statusUpdatedAt: 1 }).limit(5000).lean();

    const headers = [
      "conversion_action", "conversion_date_time", "conversion_value", "currency_code",
      "order_id", "gclid", "gbraid", "wbraid", "user_email_sha256", "user_phone_sha256",
      "lead_status", "service_category"
    ];
    const rows = leads.map((lead) => [
      lead.status === "converted" ? "Converted Lead" : "Qualified Lead",
      new Date(lead.statusUpdatedAt).toISOString().replace("T", " ").replace("Z", "+00:00"),
      "", "INR", String(lead._id), lead.gclid || "", lead.gbraid || "", lead.wbraid || "",
      hash(lead.email), hash(lead.mobile), lead.status, lead.serviceInterested || ""
    ]);
    const csv = [headers, ...rows].map((row) => row.map(cell).join(",")).join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="filefast-google-ads-qualified-conversions.csv"',
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("Google Ads conversion export failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to export opted-in conversions." }, { status: 503 });
  }
}
