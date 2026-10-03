import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("ff_admin_token")?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
