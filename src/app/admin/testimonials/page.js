"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/testimonials?all=true");
    const data = await res.json();
    setTestimonials(data.testimonials || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function togglePublish(testimonial) {
    await fetch(`/api/testimonials/${testimonial._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !testimonial.isPublished })
    });
    load();
  }

  async function deleteTestimonial(testimonial) {
    if (!confirm(`Delete testimonial from "${testimonial.clientName}"? This cannot be undone.`)) return;
    await fetch(`/api/testimonials/${testimonial._id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn-gold text-xs">
          + Add New Testimonial
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-navy/60">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id} className="border-b border-silver/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{t.clientName}</td>
                  <td className="px-4 py-3 text-navy/70">{t.clientRole || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{t.serviceUsed || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{"⭐".repeat(t.rating || 5)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(t)}
                      className={`rounded-sm px-2 py-1 text-xs font-semibold ${
                        t.isPublished ? "bg-green-100 text-green-700" : "bg-silver text-navy/60"
                      }`}
                    >
                      {t.isPublished ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/testimonials/${t._id}/edit`}
                      className="mr-3 text-xs font-semibold text-gold-dark"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTestimonial(t)}
                      className="text-xs font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-navy/60">
                    No testimonials yet. Click "Add New Testimonial" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
