import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Metric from "@/models/SearchConsoleMetric";
import {requireAdmin} from "@/lib/requireAdmin";
import {searchConsoleConfig,searchConsoleDateRange,querySearchConsole} from "@/lib/searchConsole";
export const dynamic="force-dynamic";
export const maxDuration=60;
export async function POST(req){const denied=await requireAdmin(req);if(denied)return denied;const c=searchConsoleConfig();if(!c.configured)return NextResponse.json({error:"Google Search Console credentials are not configured.",missing:c.missing},{status:409});try{const range=searchConsoleDateRange();const [pages,queries]=await Promise.all([querySearchConsole(range.startDate,range.endDate,"page"),querySearchConsole(range.startDate,range.endDate,"query")]);await connectDB();const ops=[...pages.map(x=>({updateOne:{filter:{date:range.endDate,dimension:"page",key:x.key},update:{$set:{...x,date:range.endDate,dimension:"page"}},upsert:true}})),...queries.map(x=>({updateOne:{filter:{date:range.endDate,dimension:"query",key:x.key},update:{$set:{...x,date:range.endDate,dimension:"query"}},upsert:true}}))];if(ops.length)await Metric.bulkWrite(ops,{ordered:false});return NextResponse.json({success:true,...range,pages:pages.length,queries:queries.length});}catch(e){console.error("Search Console sync failed",e?.message);return NextResponse.json({error:"Search Console sync failed. Check OAuth credentials and property permissions."},{status:502});}}
