const test = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");

const source = readFileSync("src/lib/blogValidation.js", "utf8")
  .replace("export function validateBlogPayload", "function validateBlogPayload");
const sandbox = { module: { exports: {} }, URL, Set, Object, RegExp };
vm.runInNewContext(source + "\nmodule.exports = { validateBlogPayload };", sandbox);
const { validateBlogPayload } = sandbox.module.exports;

const validPost = {
  title: "GST input tax credit guide",
  slug: "gst-input-tax-credit-guide",
  content: "A practical guide for businesses."
};

test("new posts default to unpublished drafts", () => {
  const result = validateBlogPayload(validPost);
  assert.equal(result.error, undefined);
  assert.equal(result.payload.isPublished, false);
});

test("explicit publishing choice is preserved", () => {
  const result = validateBlogPayload({ ...validPost, isPublished: true });
  assert.equal(result.payload.isPublished, true);
});

test("rejects blank required fields", () => {
  for (const field of ["title", "slug", "content"]) {
    const result = validateBlogPayload({ ...validPost, [field]: "   " });
    assert.ok(result.error, field + " should not be blank");
  }
});

test("rejects malformed slugs", () => {
  assert.ok(validateBlogPayload({ ...validPost, slug: "GST guide / 2026" }).error);
});

test("rejects unknown fields to prevent mass assignment", () => {
  assert.ok(validateBlogPayload({ ...validPost, role: "admin" }).error);
});

test("rejects unsafe featured image protocols", () => {
  assert.ok(validateBlogPayload({ ...validPost, featuredImageUrl: "javascript:alert(1)" }).error);
  assert.ok(validateBlogPayload({ ...validPost, featuredImageUrl: "http://example.com/image.jpg" }).error);
});

test("allows HTTPS and site-relative featured image URLs", () => {
  assert.equal(validateBlogPayload({ ...validPost, featuredImageUrl: "https://cdn.example.com/cover.webp" }).error, undefined);
  assert.equal(validateBlogPayload({ ...validPost, featuredImageUrl: "/images/cover.webp" }).error, undefined);
});

test("rejects empty partial updates", () => {
  assert.ok(validateBlogPayload({}, { partial: true }).error);
});

test("allows a valid partial update", () => {
  const result = validateBlogPayload({ excerpt: "Updated summary" }, { partial: true });
  assert.equal(result.error, undefined);
  assert.equal(result.payload.excerpt, "Updated summary");
});

test("rejects fields exceeding configured limits", () => {
  assert.ok(validateBlogPayload({ ...validPost, title: "x".repeat(121) }).error);
});
