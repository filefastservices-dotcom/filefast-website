import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

// Call at the top of any admin-only API route handler.
// Returns a 401 response when the cookie is missing, invalid, or expired.
export async function requireAdmin(req) {
  const token = req.cookies.get("ff_admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
