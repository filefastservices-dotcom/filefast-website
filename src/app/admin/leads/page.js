"use client";

import { useEffect, useState } from "react";
import { trackLeadStage } from "@/components/AnalyticsConsent";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" }
];

function LeadPipelineEditor({ lead, onSaved }) {
  const [status, setStatus] = useState(lead.status || "new");
  const [followUpAt, setFollowUpAt] = useState(lead.followUpAt ? new Date(lead.followUpAt).toISOString().slice(0, 10) : "");
  const [internalNote, setInternalNote] = useState(lead.internalNote || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead._id, status, followUpAt: followUpAt || null, internalNote })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save changes.");
      if (result.lead.status !== (lead.status || "new")) trackLeadStage(result.lead.status, result.lead.serviceInterested);
      onSaved(result.lead);
      setMessage("Saved");
    } catch (error) {
      setMessage(error.message || "Unable to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-w-[230px] space-y-2">
      <select aria-label={`Lead status for ${lead.name}`} value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded border border-silver-dark/40 bg-white px-2 py-2 text-xs">
        {STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      <input aria-label={`Follow-up date for ${lead.name}`} type="date" value={followUpAt} onChange={(event) => setFollowUpAt(event.target.value)} className="w-full rounded border border-silver-dark/40 px-2 py-2 text-xs" />
      <textarea aria-label={`Internal note for ${lead.name}`} rows={2} maxLength={1200} value={internalNote} onChange={(event) => setInternalNote(event.target.value)} placeholder="Private team note" className="w-full rounded border border-silver-dark/40 px-2 py-2 text-xs" />
      <div className="flex items-center gap-2">
        <button type="button" onClick={save} disabled={saving} className="rounded bg-navy px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : "Save update"}</button>
        {message && <span role="status" className="text-[11px] text-navy/60">{message}</span>}
      </div>
    </div>
  );
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(q = "") {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/leads${q ? `?search=${encodeURIComponent(q)}` : ""}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to load leads.");
      setLeads(data.leads || []);
    } catch {
      setError("Unable to load leads. Refresh the page or sign in again.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleSearch(e) {
    e.preventDefault();
    load(search);
  }

  function updateLead(updated) {
    setLeads((current) => current.map((lead) => lead._id === updated._id ? updated : lead));
  }

  const counts = STATUSES.map((item) => ({ ...item, count: leads.filter((lead) => (lead.status || "new") === item.value).length }));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Lead pipeline</h1>
          <p className="mt-1 text-sm text-navy/60">Track every enquiry from first contact to conversion, with private notes and follow-up dates.</p>
        </div>
        <a href="/api/leads/export" className="btn-gold text-xs">Export CSV</a>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {counts.map((item) => <div key={item.value} className="rounded border border-silver/70 bg-white p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-navy/50">{item.label}</p><p className="mt-1 font-display text-2xl font-semibold text-navy">{item.count}</p></div>)}
      </div>

      <form onSubmit={handleSearch} className="mt-5 flex gap-2">
        <input placeholder="Search by name, mobile or email" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-sm border border-silver-dark/40 px-4 py-2 text-sm focus:border-gold focus:outline-none sm:max-w-xs" />
        <button type="submit" className="btn-navy-outline text-xs">Search</button>
      </form>

      {error && <p role="alert" className="mt-6 text-sm text-red-600">{error}</p>}
      {loading ? <p className="mt-6 text-sm text-navy/60">Loading...</p> : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[1420px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Priority / score</th><th className="px-4 py-3">First response</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Mobile</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Service</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Campaign</th><th className="px-4 py-3">Landing page</th><th className="px-4 py-3">Message</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Enquiry consent</th><th className="px-4 py-3">Consent recorded</th><th className="px-4 py-3">Pipeline & follow-up</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-silver/50 align-top last:border-0">
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${lead.leadPriority === "high" ? "bg-amber-50 text-amber-800" : "bg-silver-light text-navy/60"}`}>{lead.leadPriority || "standard"}</span><p className="mt-1 text-xs text-navy/55">{lead.leadScore || 0}/100</p></td>
                  <td className="px-4 py-3 text-xs text-navy/60">{lead.firstResponseAt ? new Date(lead.firstResponseAt).toLocaleString("en-IN") : "Not contacted"}</td>
                  <td className="px-4 py-3 font-medium text-navy">{lead.name}</td>
                  <td className="px-4 py-3 text-navy/70"><a href={`tel:${lead.mobile}`} className="hover:text-gold-dark">{lead.mobile}</a></td>
                  <td className="px-4 py-3 text-navy/70">{lead.email || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{lead.serviceInterested || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{lead.source || "website"}{lead.referrerHost ? ` · ${lead.referrerHost}` : ""}</td>
                  <td className="px-4 py-3 text-navy/70">{lead.utmCampaign || lead.utmSource || "—"}{lead.utmMedium ? ` / ${lead.utmMedium}` : ""}</td>
                  <td className="px-4 py-3 text-navy/70">{lead.landingPage || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{lead.message || "—"}</td>
                  <td className="px-4 py-3 text-navy/60">{new Date(lead.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-navy/70">{lead.consent === true ? "Recorded" : "Not captured"}</td>
                  <td className="px-4 py-3 text-navy/60">{lead.consentAt ? new Date(lead.consentAt).toLocaleString("en-IN") : "—"}</td>
                  <td className="px-4 py-3"><LeadPipelineEditor lead={lead} onSaved={updateLead} /></td>
                </tr>
              ))}
              {leads.length === 0 && <tr><td colSpan={14} className="px-4 py-6 text-center text-navy/60">No leads found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
