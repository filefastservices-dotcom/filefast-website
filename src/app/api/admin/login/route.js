import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword) {
    return NextResponse.json(
      { error: "Admin credentials are not configured on the server" },
      { status: 500 }
    );
  }

  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = signAdminToken({ email, role: "admin" });

  const res = NextResponse.json({ success: true });
  res.cookies.set("ff_admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
