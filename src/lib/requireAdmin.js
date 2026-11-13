import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

// Call at the top of any admin-only API route handler.
// Returns a NextResponse when the request is unauthorized, or null when authorized.
export async function requireAdmin(req) {
  const token = req.cookies.get("ff_admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
