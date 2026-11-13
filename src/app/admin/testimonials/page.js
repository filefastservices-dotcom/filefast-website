"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (res.status === 401 ? "Your admin session has expired. Sign in again." : "Unable to load testimonials."));
      setTestimonials(data.testimonials || []);
    } catch (err) {
      setError(err.message || "Unable to load testimonials. Refresh and try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(testimonial) {
    setError("");
    const res = await fetch(`/api/testimonials/${testimonial._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !testimonial.isPublished })
    });
    if (!res.ok) {
      setError("Could not update publishing status. Sign in again and retry.");
      return;
    }
    await load();
  }

  async function deleteTestimonial(testimonial) {
    if (!confirm(`Delete testimonial from "${testimonial.clientName}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/testimonials/${testimonial._id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete this testimonial. Sign in again and retry.");
      return;
    }
    await load();
  }

  const published = testimonials.filter((item) => item.isPublished).length;
  const unpublished = testimonials.length - published;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Testimonials & Google Reviews</h1>
          <p className="mt-1 text-sm text-navy/60">Manage website testimonials. Google review excerpts are labelled and link back to the original listing.</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-gold text-xs">+ Add Testimonial</Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-sm border border-silver/70 bg-white p-4"><p className="text-2xl font-semibold text-navy">{testimonials.length}</p><p className="text-xs text-navy/60">Total records</p></div>
        <div className="rounded-sm border border-silver/70 bg-white p-4"><p className="text-2xl font-semibold text-emerald-700">{published}</p><p className="text-xs text-navy/60">Published records</p></div>
        <div className="rounded-sm border border-silver/70 bg-white p-4"><p className="text-2xl font-semibold text-navy">{unpublished}</p><p className="text-xs text-navy/60">Unpublished records</p></div>
      </div>
      <div className="mt-5 rounded-sm border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <p className="font-semibold">Google Business Profile connection</p>
        <p className="mt-1">Live automatic review syncing is not connected yet. Google requires an authorised Business Profile OAuth connection and API access. The website currently uses clearly attributed public review excerpts as a fallback.</p>
        <a className="mt-2 inline-block font-semibold underline" href="https://www.google.com/maps/search/?api=1&query=FileFast&query_place_id=ChIJ_fs-e95nUjoRqme2a-4Babg" target="_blank" rel="noopener noreferrer">Open FileFast on Google Maps ↗</a>
      </div>
      {error && <p role="alert" className="mt-5 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {loading ? <p className="mt-6 text-sm text-navy/60">Loading...</p> : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr><th className="px-4 py-3">Client / Source</th><th className="px-4 py-3">Service</th><th className="px-4 py-3">Rating</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {testimonials.map((item) => (
                <tr key={item._id} className="border-b border-silver/50 last:border-0">
                  <td className="px-4 py-3"><p className="font-medium text-navy">{item.clientName}</p><p className="text-xs text-navy/60">{item.source || item.clientRole || "FileFast testimonial"}</p></td>
                  <td className="px-4 py-3 text-navy/70">{item.serviceUsed || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{"★".repeat(item.rating || 5)}</td>
                  <td className="px-4 py-3"><span className={item.isPublished === false ? "text-xs text-slate-500" : "text-xs font-semibold text-emerald-700"}>{item.isPublished === false ? "Unpublished" : "Public / fallback"}</span></td>
                  <td className="px-4 py-3 text-right">{item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-gold-dark">Google source ↗</a> : <><Link href={`/admin/testimonials/${item._id}/edit`} className="mr-3 text-xs font-semibold text-gold-dark">Edit</Link><button onClick={() => togglePublish(item)} className="text-xs font-semibold text-navy">{item.isPublished ? "Unpublish" : "Publish"}</button><button onClick={() => deleteTestimonial(item)} className="ml-3 text-xs font-semibold text-red-600">Delete</button></>}</td>
                </tr>
              ))}
              {testimonials.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-navy/60">No testimonials found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
