import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

function toCSV(leads) {
  const headers = ["Name", "Mobile", "Email", "Service Interested", "Message", "Date"];
  const rows = leads.map((l) => [
    l.name,
    l.mobile,
    l.email,
    l.serviceInterested,
    (l.message || "").replace(/[\r\n,]+/g, " "),
    new Date(l.createdAt).toLocaleString("en-IN")
  ]);
  return [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
}

export async function GET(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const leads = await Lead.find({}).sort({ createdAt: -1 });
  const csv = toCSV(leads);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="filefast-leads-${Date.now()}.csv"`
    }
  });
}
