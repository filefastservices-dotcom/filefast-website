"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { renderEmail } = require("../src/templates");

test("renders HTML and text placeholders and escapes HTML input", () => {
  const output = renderEmail({ _id: "lead-123", name: "<script>alert(1)</script>", service: "GST registration" }, "https://example.com/unsubscribe?token=abc");
  assert.match(output.html, /&lt;script&gt;/);
  assert.match(output.text, /GST registration/);
  assert.match(output.html, /lead-123/);
  assert.match(output.html, /https://example.com/unsubscribe/);
});
