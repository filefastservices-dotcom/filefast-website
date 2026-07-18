"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "GST Services",
  "Income Tax Services",
  "Business Registration",
  "Licenses",
  "Compliance Services",
  "Accounting Services",
  "Digital Business Services"
];

function linesToArray(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(arr) {
  return (arr || []).join("\n");
}

function processFlowToLines(steps) {
  return (steps || []).map((s) => `${s.title} :: ${s.description || ""}`).join("\n");
}

function linesToProcessFlow(text) {
  return linesToArray(text).map((line) => {
    const [title, ...rest] = line.split("::");
    return { title: title.trim(), description: rest.join("::").trim() };
  });
}

function faqsToLines(faqs) {
  return (faqs || []).map((f) => `${f.question} :: ${f.answer}`).join("\n");
}

function linesToFaqs(text) {
  return linesToArray(text).map((line) => {
    const [question, ...rest] = line.split("::");
    return { question: question.trim(), answer: rest.join("::").trim() };
  });
}

export default function ServiceForm({ initialService, serviceKey }) {
  const router = useRouter();
  const isEdit = Boolean(serviceKey);

  const [form, setForm] = useState({
    name: initialService?.name || "",
    slug: initialService?.slug || "",
    category: initialService?.category || CATEGORIES[0],
    shortDescription: initialService?.shortDescription || "",
    fullDescription: initialService?.fullDescription || "",
    benefitsText: arrayToLines(initialService?.benefits),
    eligibilityText: arrayToLines(initialService?.eligibility),
    documentsText: arrayToLines(initialService?.requiredDocuments),
    processFlowText: processFlowToLines(initialService?.processFlow),
    pricingInfo: initialService?.pricingInfo || "",
    faqsText: faqsToLines(initialService?.faqs),
    relatedText: arrayToLines(initialService?.relatedServiceSlugs),
    metaTitle: initialService?.metaTitle || "",
    metaDescription: initialService?.metaDescription || "",
    seoKeywords: initialService?.seoKeywords || "",
    isFeatured: initialService?.isFeatured || false,
    isPublished: initialService?.isPublished ?? true,
    sortOrder: initialService?.sortOrder || 0
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function autoSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug || autoSlug(form.name),
      category: form.category,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      benefits: linesToArray(form.benefitsText),
      eligibility: linesToArray(form.eligibilityText),
      requiredDocuments: linesToArray(form.documentsText),
      processFlow: linesToProcessFlow(form.processFlowText),
      pricingInfo: form.pricingInfo,
      faqs: linesToFaqs(form.faqsText),
      relatedServiceSlugs: linesToArray(form.relatedText),
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      seoKeywords: form.seoKeywords,
      isFeatured: form.isFeatured,
      isPublished: form.isPublished,
      sortOrder: Number(form.sortOrder) || 0
    };

    try {
      const res = await fetch(isEdit ? `/api/services/${serviceKey}` : "/api/services", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save service");
        setSaving(false);
        return;
      }
      router.push("/admin/services");
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
          <label className={label}>Service Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label className={label}>URL Slug (e.g. gst-registration)</label>
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
        <label className={label}>Short Description</label>
        <textarea
          required
          rows={2}
          value={form.shortDescription}
          onChange={(e) => update("shortDescription", e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label className={label}>Full Description</label>
        <textarea
          rows={5}
          value={form.fullDescription}
          onChange={(e) => update("fullDescription", e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label className={label}>Benefits — one per line</label>
        <textarea rows={4} value={form.benefitsText} onChange={(e) => update("benefitsText", e.target.value)} className={field} />
      </div>

      <div>
        <label className={label}>Eligibility — one per line</label>
        <textarea rows={3} value={form.eligibilityText} onChange={(e) => update("eligibilityText", e.target.value)} className={field} />
      </div>

      <div>
        <label className={label}>Required Documents — one per line</label>
        <textarea rows={4} value={form.documentsText} onChange={(e) => update("documentsText", e.target.value)} className={field} />
      </div>

      <div>
        <label className={label}>Process Flow — one step per line, format: Title :: Description</label>
        <textarea
          rows={4}
          placeholder={"Submit Documents :: Upload your KYC and business documents\nVerification :: We verify and prepare your application"}
          value={form.processFlowText}
          onChange={(e) => update("processFlowText", e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label className={label}>Pricing Information</label>
        <input value={form.pricingInfo} onChange={(e) => update("pricingInfo", e.target.value)} className={field} />
      </div>

      <div>
        <label className={label}>FAQs — one per line, format: Question :: Answer</label>
        <textarea rows={4} value={form.faqsText} onChange={(e) => update("faqsText", e.target.value)} className={field} />
      </div>

      <div>
        <label className={label}>Related Service Slugs — one per line</label>
        <textarea rows={2} value={form.relatedText} onChange={(e) => update("relatedText", e.target.value)} className={field} />
      </div>

      <div className="rounded-sm border border-silver/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">SEO</p>
        <div className="mt-3 space-y-3">
          <input placeholder="Meta Title" value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} className={field} />
          <textarea placeholder="Meta Description" rows={2} value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} className={field} />
          <input placeholder="SEO Keywords, comma separated" value={form.seoKeywords} onChange={(e) => update("seoKeywords", e.target.value)} className={field} />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} />
          Featured Service
        </label>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => update("isPublished", e.target.checked)} />
          Published
        </label>
        <div className="flex items-center gap-2 text-sm text-navy">
          Sort Order
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => update("sortOrder", e.target.value)}
            className="w-20 rounded-sm border border-silver-dark/40 px-2 py-1"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={saving} className="btn-gold">
        {saving ? "Saving..." : isEdit ? "Update Service" : "Create Service"}
      </button>
    </form>
  );
}
