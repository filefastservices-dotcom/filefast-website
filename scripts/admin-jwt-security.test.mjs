import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { webcrypto } from "node:crypto";

globalThis.crypto ??= webcrypto;
process.env.JWT_SECRET = "filefast-jwt-regression-test-secret";

const source = await readFile(new URL("../src/lib/auth.js", import.meta.url), "utf8");
const authUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const { signAdminToken, verifyAdminToken } = await import(authUrl);

const encoder = new TextEncoder();
const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

async function signedToken(header, payload) {
  const unsigned = `${encode(header)}.${encode(payload)}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(process.env.JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(unsigned));
  return `${unsigned}.${Buffer.from(signature).toString("base64url")}`;
}

test("accepts a valid HS256 admin token issued by signAdminToken", async () => {
  const token = await signAdminToken({ email: "admin@example.test", role: "admin" });
  const payload = await verifyAdminToken(token);
  assert.equal(payload?.role, "admin");
  assert.equal(payload?.email, "admin@example.test");
  assert.ok(payload.exp > Math.floor(Date.now() / 1000));
});

test("rejects a token with a tampered payload or signature", async () => {
  const token = await signAdminToken({ role: "admin" });
  const [header, body, signature] = token.split(".");
  const changedBody = encode({ role: "admin", exp: Math.floor(Date.now() / 1000) + 3600 });
  assert.equal(await verifyAdminToken(`${header}.${changedBody}.${signature}`), null);
  const changedSignature = `${signature[0] === "A" ? "B" : "A"}${signature.slice(1)}`;
  assert.equal(await verifyAdminToken(`${header}.${body}.${changedSignature}`), null);
});

test("rejects expired tokens", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "HS256", typ: "JWT" }, { role: "admin", iat: now - 120, exp: now - 1 });
  assert.equal(await verifyAdminToken(token), null);
});

test("rejects tokens without an expiry claim", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "HS256", typ: "JWT" }, { role: "admin", iat: now });
  assert.equal(await verifyAdminToken(token), null);
});

test("rejects tokens with a non-numeric expiry", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "HS256", typ: "JWT" }, { role: "admin", iat: now, exp: "tomorrow" });
  assert.equal(await verifyAdminToken(token), null);
});

test("rejects tokens issued too far in the future", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "HS256", typ: "JWT" }, { role: "admin", iat: now + 120, exp: now + 3600 });
  assert.equal(await verifyAdminToken(token), null);
});

test("rejects expiry values that do not follow issue time", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "HS256", typ: "JWT" }, { role: "admin", iat: now, exp: now });
  assert.equal(await verifyAdminToken(token), null);
});

test("rejects a correctly signed token using an unexpected algorithm", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "none", typ: "JWT" }, { role: "admin", iat: now, exp: now + 3600 });
  assert.equal(await verifyAdminToken(token), null);
});

test("rejects a correctly signed token with an unexpected type", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "HS256", typ: "JWS" }, { role: "admin", iat: now, exp: now + 3600 });
  assert.equal(await verifyAdminToken(token), null);
});

test("rejects malformed, empty-segment and oversized tokens", async () => {
  assert.equal(await verifyAdminToken("not-a-jwt"), null);
  assert.equal(await verifyAdminToken(".."), null);
  assert.equal(await verifyAdminToken("a.b.c"), null);
  assert.equal(await verifyAdminToken("A".repeat(4097)), null);
});

test("rejects non-object JWT payloads", async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = await signedToken({ alg: "HS256", typ: "JWT" }, [{ role: "admin", iat: now, exp: now + 3600 }]);
  assert.equal(await verifyAdminToken(token), null);
});
