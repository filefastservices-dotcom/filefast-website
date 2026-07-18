"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestimonialForm({ initialTestimonial, testimonialId }) {
  const router = useRouter();
  const isEdit = Boolean(testimonialId);

  const [form, setForm] = useState({
    clientName: initialTestimonial?.clientName || "",
    clientRole: initialTestimonial?.clientRole || "",
    serviceUsed: initialTestimonial?.serviceUsed || "",
    rating: initialTestimonial?.rating || 5,
    quote: initialTestimonial?.quote || "",
    photoUrl: initialTestimonial?.photoUrl || "",
    isPublished: initialTestimonial?.isPublished ?? true
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

    try {
      const res = await fetch(
        isEdit ? `/api/testimonials/${testimonialId}` : "/api/testimonials",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save testimonial");
        setSaving(false);
        return;
      }
      router.push("/admin/testimonials");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  const field = "w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none";
  const label = "block text-xs font-semibold uppercase tracking-wide text-navy/60 mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Client Name</label>
          <input
            required
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label className={label}>Client Role (e.g. Business Owner, Startup Founder)</label>
          <input
            value={form.clientRole}
            onChange={(e) => update("clientRole", e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label}>Service Used</label>
        <input
          placeholder="e.g. GST Registration, ITR Filing"
          value={form.serviceUsed}
          onChange={(e) => update("serviceUsed", e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label className={label}>Rating (1-5)</label>
        <select
          value={form.rating}
          onChange={(e) => update("rating", Number(e.target.value))}
          className={field}
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <div>
        <label className={label}>Testimonial Quote</label>
        <textarea
          required
          rows={5}
          placeholder="What did the client say about your service?"
          value={form.quote}
          onChange={(e) => update("quote", e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label className={label}>Photo URL (Optional)</label>
        <input
          placeholder="https://example.com/photo.jpg"
          value={form.photoUrl}
          onChange={(e) => update("photoUrl", e.target.value)}
          className={field}
        />
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
        {saving ? "Saving..." : isEdit ? "Update Testimonial" : "Create Testimonial"}
      </button>
    </form>
  );
}
