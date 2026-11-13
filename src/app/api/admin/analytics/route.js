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

    const [totalLeads, last30Days, last90Days, monthly, byService, bySource, blogStats, pipeline, followUpsDue, estimatedPipelineValue] = await Promise.all([
      Lead.countDocuments({}),
      Lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Lead.countDocuments({ createdAt: { $gte: ninetyDaysAgo } }),
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
      Blog.aggregate([
        { $group: { _id: null, total: { $sum: 1 }, published: { $sum: { $cond: ["$isPublished", 1, 0] } } } }
      ]),
      Lead.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Lead.countDocuments({ followUpAt: { $ne: null, $lte: now }, status: { $nin: ["converted", "lost"] } }),
      Lead.aggregate([
        { $match: { status: { $in: ["qualified", "converted"] } } },
        { $group: { _id: null, total: { $sum: "$estimatedValue" } } }
      ])
    ]);

    return NextResponse.json({
      generatedAt: now.toISOString(),
      leads: { total: totalLeads, last30Days, last90Days },
      monthly: monthly.map((item) => ({ month: item._id, count: item.count })),
      byService: byService.map((item) => ({ label: item._id || "Not specified", count: item.count })),
      bySource: bySource.map((item) => ({ label: item._id || "website", count: item.count })),
      blogs: blogStats[0] || { total: 0, published: 0 },
      pipeline: pipeline.map((item) => ({ status: item._id || "new", count: item.count })),
      followUpsDue,
      estimatedPipelineValue: estimatedPipelineValue[0]?.total || 0
    });
  } catch (error) {
    console.error("Admin analytics failed:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Unable to load analytics right now." }, { status: 503 });
  }
}
