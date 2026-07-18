"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "GST",
  "Income Tax",
  "MSME",
  "FSSAI",
  "Compliance",
  "Accounting",
  "Business Registration",
  "Digital Business"
];

function toSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogForm({ initialBlog, blogId }) {
  const router = useRouter();
  const isEdit = Boolean(blogId);

  const [form, setForm] = useState({
    title: initialBlog?.title || "",
    slug: initialBlog?.slug || "",
    category: initialBlog?.category || CATEGORIES[0],
    excerpt: initialBlog?.excerpt || "",
    content: initialBlog?.content || "",
    featuredImageUrl: initialBlog?.featuredImageUrl || "",
    metaTitle: initialBlog?.metaTitle || "",
    metaDescription: initialBlog?.metaDescription || "",
    isPublished: initialBlog?.isPublished ?? true
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      slug: form.slug || toSlug(form.title)
    };

    try {
      const res = await fetch(
        isEdit ? `/api/blog/${blogId}` : "/api/blog",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save blog post");
        setSaving(false);
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  const field = "w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none";
  const label = "block text-xs font-semibold uppercase tracking-wide text-navy/60 mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Blog Post Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label className={label}>URL Slug (e.g. gst-registration-guide)</label>
          <input
            placeholder="auto-generated if left blank"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label}>Category</label>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className={field}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label}>Excerpt (Short Summary — 150 chars)</label>
        <textarea
          rows={2}
          maxLength={150}
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className={field}
        />
        <p className="mt-1 text-xs text-navy/60">{form.excerpt.length}/150</p>
      </div>

      <div>
        <label className={label}>Full Article Content</label>
        <textarea
          required
          rows={12}
          placeholder="Write your blog article here. Supports plain text."
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label className={label}>Featured Image URL (Optional)</label>
        <input
          placeholder="https://example.com/image.jpg"
          value={form.featuredImageUrl}
          onChange={(e) => update("featuredImageUrl", e.target.value)}
          className={field}
        />
      </div>

      <div className="rounded-sm border border-silver/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">SEO</p>
        <div className="mt-3 space-y-3">
          <input
            placeholder="Meta Title (60 chars)"
            maxLength={60}
            value={form.metaTitle}
            onChange={(e) => update("metaTitle", e.target.value)}
            className={field}
          />
          <textarea
            placeholder="Meta Description (160 chars)"
            maxLength={160}
            rows={2}
            value={form.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => update("isPublished", e.target.checked)}
          />
          Published
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={saving} className="btn-gold">
        {saving ? "Saving..." : isEdit ? "Update Blog Post" : "Create Blog Post"}
      </button>
    </form>
  );
}
