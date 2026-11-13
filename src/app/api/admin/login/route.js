import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

const MAX_LOGIN_BODY_BYTES = 8 * 1024;

async function readLimitedBody(request) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_LOGIN_BODY_BYTES) {
    return { tooLarge: true };
  }
  if (!request.body) return { text: "" };

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_LOGIN_BODY_BYTES) {
        await reader.cancel();
        return { tooLarge: true };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { text: new TextDecoder("utf-8", { fatal: true }).decode(body) };
  } catch {
    return { invalidEncoding: true };
  }
}

export async function POST(req) {
  const contentType = (req.headers.get("content-type") || "")
    .split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Invalid request" }, { status: 415 });
  }

  let limitedBody;
  try {
    limitedBody = await readLimitedBody(req);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (limitedBody.tooLarge) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  if (limitedBody.invalidEncoding) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let body;
  try {
    body = JSON.parse(limitedBody.text);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const { email, password } = body;
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length === 0 ||
    email.length > 254 ||
    password.length === 0 ||
    password.length > 1024
  ) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;
  if (!validEmail || !validPassword) {
    return NextResponse.json(
      { error: "Admin authentication is temporarily unavailable" },
      { status: 503 }
    );
  }
  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signAdminToken({ email, role: "admin" });
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
