const encoder = new TextEncoder();
const MAX_TOKEN_LENGTH = 4096;
const CLOCK_SKEW_SECONDS = 60;

function base64UrlEncode(value) {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error("Invalid base64url segment");
  }

  const padded =
    value.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((value.length + 3) % 4);

  return atob(padded);
}

async function getSigningKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");

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
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify({
    ...payload,
    iat: now,
    exp: now + 60 * 60 * 24 * 7
  }));
  const unsignedToken = `${header}.${body}`;
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(unsignedToken));
  const signatureBytes = String.fromCharCode(...new Uint8Array(signature));

  return `${unsignedToken}.${base64UrlEncode(signatureBytes)}`;
}

export async function verifyAdminToken(token) {
  try {
    if (typeof token !== "string" || token.length === 0 || token.length > MAX_TOKEN_LENGTH) {
      return null;
    }

    const parts = token.split(".");
    if (parts.length !== 3 || parts.some((part) => !part)) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    if (header.alg !== "HS256" || header.typ !== "JWT") return null;

    const key = await getSigningKey();
    const signatureBytes = Uint8Array.from(
      base64UrlDecode(encodedSignature),
      (char) => char.charCodeAt(0)
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(`${encodedHeader}.${encodedPayload}`)
    );
    if (!valid) return null;

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (
      !payload ||
      typeof payload !== "object" ||
      Array.isArray(payload) ||
      !Number.isFinite(payload.exp) ||
      payload.exp <= now ||
      !Number.isFinite(payload.iat) ||
      payload.iat > now + CLOCK_SKEW_SECONDS ||
      payload.exp <= payload.iat
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
