"use client";

import { useEffect, useState } from "react";

const FIELDS = [
  { key: "heroEyebrow", label: "Hero eyebrow / brand line", max: 100 },
  { key: "heroTitle", label: "Main headline", max: 120 },
  { key: "heroHighlight", label: "Highlighted headline", max: 100 },
  { key: "heroDescription", label: "Main description", max: 400, area: true },
  { key: "heroLocation", label: "Location and audience description", max: 400, area: true },
  { key: "primaryCtaLabel", label: "Primary button label", max: 40 },
  { key: "secondaryCtaLabel", label: "WhatsApp button label", max: 40 },
  { key: "announcementText", label: "Announcement banner text", max: 180, area: true },
  { key: "metaTitle", label: "Homepage SEO title", max: 60 },
  { key: "metaDescription", label: "Homepage SEO description", max: 160, area: true }
];

export default function AdminHomepagePage() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/homepage", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load homepage settings.");
      setForm(result.content);
    } catch (err) {
      setError(err.message || "Unable to load homepage settings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");
    try {
      const response = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save homepage content.");
      setForm(result.content);
      setNotice("Homepage content saved. The public homepage will use the updated content.");
    } catch (err) {
      setError(err.message || "Unable to save homepage content.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none";
  if (loading) return <p className="text-sm text-navy/60">Loading homepage settings...</p>;
  if (!form) return <div><p role="alert" className="text-sm text-red-700">{error || "Homepage settings could not be loaded."}</p><button onClick={load} className="btn-navy-outline mt-4">Retry</button></div>;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Website content management</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy">Homepage Editor</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-navy/60">Edit the homepage hero, announcement and search snippet without changing code. Services, published articles and approved testimonials continue to load from their existing admin-managed records.</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-navy-outline text-xs">Preview website ↗</a>
      </div>

      {notice && <p role="status" className="mt-5 rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={save} className="mt-6 space-y-5">
        <section className="rounded-sm border border-silver/70 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-navy">Homepage hero</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {FIELDS.slice(0, 3).map((field) => <label key={field.key} className="block text-xs font-semibold text-navy/70">{field.label}<input className={inputClass + " mt-2"} maxLength={field.max} value={form[field.key] || ""} onChange={(e) => update(field.key, e.target.value)} /><span className="mt-1 block text-right font-normal text-navy/45">{(form[field.key] || "").length}/{field.max}</span></label>)}
          </div>
          {FIELDS.slice(3, 7).map((field) => <label key={field.key} className="mt-4 block text-xs font-semibold text-navy/70">{field.label}{field.area ? <textarea className={inputClass + " mt-2"} rows={3} maxLength={field.max} value={form[field.key] || ""} onChange={(e) => update(field.key, e.target.value)} /> : <input className={inputClass + " mt-2"} maxLength={field.max} value={form[field.key] || ""} onChange={(e) => update(field.key, e.target.value)} />}<span className="mt-1 block text-right font-normal text-navy/45">{(form[field.key] || "").length}/{field.max}</span></label>)}
        </section>

        <section className="rounded-sm border border-silver/70 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-navy">Announcement banner</h2>
          <label className="mt-4 flex items-center gap-2 text-sm text-navy"><input type="checkbox" checked={Boolean(form.announcementEnabled)} onChange={(e) => update("announcementEnabled", e.target.checked)} />Show announcement on homepage</label>
          <label className="mt-4 block text-xs font-semibold text-navy/70">Announcement text<textarea className={inputClass + " mt-2"} rows={2} maxLength={180} value={form.announcementText || ""} onChange={(e) => update("announcementText", e.target.value)} /></label>
          <p className="mt-1 text-right text-xs text-navy/45">{(form.announcementText || "").length}/180</p>
        </section>

        <section className="rounded-sm border border-silver/70 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-navy">Search engine snippet</h2>
          <p className="mt-1 text-xs text-navy/55">Keep the title specific and the description accurate. Google may choose a different snippet for individual searches.</p>
          {FIELDS.slice(8).map((field) => <label key={field.key} className="mt-4 block text-xs font-semibold text-navy/70">{field.label}{field.area ? <textarea className={inputClass + " mt-2"} rows={3} maxLength={field.max} value={form[field.key] || ""} onChange={(e) => update(field.key, e.target.value)} /> : <input className={inputClass + " mt-2"} maxLength={field.max} value={form[field.key] || ""} onChange={(e) => update(field.key, e.target.value)} />}<span className="mt-1 block text-right font-normal text-navy/45">{(form[field.key] || "").length}/{field.max}</span></label>)}
        </section>

        <div className="flex flex-wrap items-center gap-3"><button type="submit" disabled={saving} className="btn-gold disabled:opacity-60">{saving ? "Saving..." : "Save Homepage Changes"}</button><button type="button" onClick={load} disabled={saving} className="btn-navy-outline text-xs">Reload saved content</button></div>
      </form>
    </div>
  );
}
