"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { signToken, verifyToken, buildUnsubscribeUrl } = require("../src/unsubscribe");

test("creates and verifies signed unsubscribe tokens", () => {
  const token = signToken("abc", "Person@Example.com", "x".repeat(32), 300);
  const result = verifyToken(token, "x".repeat(32));
  assert.equal(result.valid, true);
  assert.equal(result.leadId, "abc");
  assert.equal(result.email, "person@example.com");
});
test("rejects tampered and expired tokens", () => {
  const token = signToken("abc", "a@example.com", "x".repeat(32), 300);
  assert.equal(verifyToken(token + "x", "x".repeat(32)).valid, false);
  assert.equal(verifyToken(token, "x".repeat(32), Math.floor(Date.now() / 1000) + 500).reason, "expired");
});
test("builds unsubscribe URL with token", () => {
  const url = new URL(buildUnsubscribeUrl("https://example.com/unsubscribe", "1", "a@example.com", "x".repeat(32)));
  assert.ok(url.searchParams.get("token"));
});
