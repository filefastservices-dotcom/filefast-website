import { createHmac, timingSafeEqual } from "node:crypto";

const encoder = new TextEncoder();

function base64UrlEncode(value) {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(value) {
  const padded =
    value.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((value.length + 3) % 4);

  return atob(padded);
}

async function getSigningKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signAdminToken(payload) {
  const now = Math.floor(Date.now() / 1000);

  const header = base64UrlEncode(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT"
    })
  );

  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      iat: now,
      exp: now + 60 * 60 * 24 * 7
    })
  );

  const unsignedToken = `${header}.${body}`;
  const key = await getSigningKey();

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(unsignedToken)
  );

  const signatureBytes = String.fromCharCode(
    ...new Uint8Array(signature)
  );

  return `${unsignedToken}.${base64UrlEncode(signatureBytes)}`;
}

// Synchronous verification keeps existing requireAdmin call sites safe:
// callers must never treat an unresolved Promise as an authenticated payload.
export function verifyAdminToken(token) {
  try {
    if (typeof token !== "string" || !token || token.length > 8192) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerPart, bodyPart, signaturePart] = parts;
    const header = JSON.parse(Buffer.from(headerPart, "base64url").toString("utf8"));
    if (header.alg !== "HS256" || header.typ !== "JWT") return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    const expected = createHmac("sha256", secret)
      .update(headerPart + "." + bodyPart)
      .digest();
    const received = Buffer.from(signaturePart, "base64url");
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null;

    const payload = JSON.parse(Buffer.from(bodyPart, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isFinite(payload.exp) || payload.exp <= now) return null;
    if (payload.iat !== undefined && (!Number.isFinite(payload.iat) || payload.iat > now + 60)) return null;

    return payload;
  } catch {
    return null;
  }
}
