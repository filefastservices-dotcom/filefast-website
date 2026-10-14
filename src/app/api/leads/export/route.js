import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

function csvCell(value) {
  let text = String(value ?? "").replace(/\r?\n/g, " ");
  if (/^[\t ]*[=+@-]/.test(text)) text = "'" + text;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCSV(leads) {
  const headers = ["Name", "Mobile", "Email", "Service Interested", "Message", "Source", "Date"];
  const rows = leads.map((l) => [
    l.name, l.mobile, l.email, l.serviceInterested, l.message, l.source,
    new Date(l.createdAt).toLocaleString("en-IN")
  ]);
  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export async function GET(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 }).limit(5000).lean();
    const csv = toCSV(leads);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="filefast-leads-${Date.now()}.csv"`
      }
    });
  } catch (error) {
    console.error("Lead export failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to export leads." }, { status: 503 });
  }
}
