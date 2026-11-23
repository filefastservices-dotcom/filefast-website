import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const now = new Date();
    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);
    const endToday = new Date(startToday);
    endToday.setDate(endToday.getDate() + 1);
    const endWindow = new Date(startToday);
    endWindow.setDate(endWindow.getDate() + 8);

    const openStatuses = ["new", "contacted", "qualified"];
    const base = { status: { $in: openStatuses } };
    const [overdue, dueToday, upcoming, unscheduled, totals] = await Promise.all([
      Lead.find({ ...base, followUpAt: { $lt: startToday, $ne: null } }).sort({ followUpAt: 1 }).limit(100).lean(),
      Lead.find({ ...base, followUpAt: { $gte: startToday, $lt: endToday } }).sort({ followUpAt: 1 }).limit(100).lean(),
      Lead.find({ ...base, followUpAt: { $gte: endToday, $lt: endWindow } }).sort({ followUpAt: 1 }).limit(100).lean(),
      Lead.countDocuments({ ...base, $or: [{ followUpAt: null }, { followUpAt: { $exists: false } }] }),
      Lead.countDocuments(base)
    ]);

    return NextResponse.json({
      generatedAt: now.toISOString(),
      summary: {
        overdue: overdue.length,
        dueToday: dueToday.length,
        upcoming: upcoming.length,
        unscheduled,
        openLeads: totals
      },
      overdue,
      dueToday,
      upcoming
    });
  } catch (error) {
    console.error("Follow-up dashboard failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to load follow-up tasks." }, { status: 503 });
  }
}
