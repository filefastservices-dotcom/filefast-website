import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const ninetyDaysAgo = new Date(now);
    ninetyDaysAgo.setDate(now.getDate() - 90);
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 5, 1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const [totalLeads, last30Days, last90Days, converted, monthly, byService, bySource, byStatus, blogStats] = await Promise.all([
      Lead.countDocuments({}),
      Lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Lead.countDocuments({ createdAt: { $gte: ninetyDaysAgo } }),
      Lead.countDocuments({ status: "converted" }),
      Lead.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt", timezone: "Asia/Kolkata" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Lead.aggregate([
        { $group: { _id: { $ifNull: ["$serviceInterested", "Not specified"] }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Lead.aggregate([
        { $group: { _id: { $ifNull: ["$source", "website"] }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Lead.aggregate([
        { $group: { _id: { $ifNull: ["$status", "new"] }, count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Blog.aggregate([
        { $group: { _id: null, total: { $sum: 1 }, published: { $sum: { $cond: ["$isPublished", 1, 0] } } } }
      ])
    ]);

    return NextResponse.json({
      generatedAt: now.toISOString(),
      leads: {
        total: totalLeads,
        last30Days,
        last90Days,
        converted,
        conversionRate: totalLeads ? Number(((converted / totalLeads) * 100).toFixed(1)) : 0
      },
      monthly: monthly.map((item) => ({ month: item._id, count: item.count })),
      byService: byService.map((item) => ({ label: item._id || "Not specified", count: item.count })),
      bySource: bySource.map((item) => ({ label: item._id || "website", count: item.count })),
      byStatus: byStatus.map((item) => ({ label: item._id || "new", count: item.count })),
      blogs: blogStats[0] || { total: 0, published: 0 }
    });
  } catch (error) {
    console.error("Admin analytics failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to load analytics right now." }, { status: 503 });
  }
}
