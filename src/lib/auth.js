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

export async function verifyAdminToken(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");

    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const key = await getSigningKey();

    const signatureBytes = Uint8Array.from(
      base64UrlDecode(signature),
      (char) => char.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(`${header}.${body}`)
    );

    if (!valid) return null;

    const payload = JSON.parse(base64UrlDecode(body));

    if (
      payload.exp &&
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
