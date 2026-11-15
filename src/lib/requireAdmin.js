import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

// Must be awaited by every protected API route.
export async function requireAdmin(req) {
  const token = req.cookies.get("ff_admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
