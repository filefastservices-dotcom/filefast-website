import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

// Call at the top of any admin-only API route handler.
// Returns a NextResponse to send back (and stop the handler) if unauthorized,
// or null if the request is authorized and the handler should continue.
export function requireAdmin(req) {
  const token = req.cookies.get("ff_admin_token")?.value;
  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
