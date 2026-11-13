import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

// Await this guard in every protected route:
// const unauthorized = await requireAdmin(req);
// if (unauthorized) return unauthorized;
export async function requireAdmin(req) {
  const token = req.cookies.get("ff_admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
