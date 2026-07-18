import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  await connectDB();
  const payments = await Payment.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ payments });
}
