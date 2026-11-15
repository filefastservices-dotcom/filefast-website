import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { signAdminToken } from "@/lib/auth";

const MAX_LOGIN_BODY_BYTES = 8 * 1024;

function safeCredentialMatch(received, expected) {
  const receivedDigest = createHash("sha256").update(received, "utf8").digest();
  const expectedDigest = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(receivedDigest, expectedDigest);
}

function jsonResponse(payload, status) {
  const response = NextResponse.json(payload, { status });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  return response;
}

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
    return jsonResponse({ error: "Invalid request" }, 415);
  }

  let limitedBody;
  try {
    limitedBody = await readLimitedBody(req);
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400);
  }
  if (limitedBody.tooLarge) {
    return jsonResponse({ error: "Request too large" }, 413);
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
    return jsonResponse({ error: "Invalid email or password" }, 400);
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
    return jsonResponse(
      { error: "Admin authentication is temporarily unavailable" },
      503
    );
  }
  if (!safeCredentialMatch(email, validEmail) || !safeCredentialMatch(password, validPassword)) {
    return jsonResponse({ error: "Invalid email or password" }, 401);
  }

  const token = await signAdminToken({ email, role: "admin" });
  const res = jsonResponse({ success: true }, 200);
  res.cookies.set("ff_admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
