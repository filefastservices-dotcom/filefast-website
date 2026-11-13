"use client";

import { useEffect, useState } from "react";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" }
];

function LeadRow({ lead, onUpdated }) {
  const [status, setStatus] = useState(lead.status || "new");
  const [notes, setNotes] = useState(lead.internalNotes || "");
  const [followUpAt, setFollowUpAt] = useState(lead.followUpAt ? new Date(lead.followUpAt).toISOString().slice(0, 10) : "");
  const [estimatedValue, setEstimatedValue] = useState(String(lead.estimatedValue || 0));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch(`/api/leads/${lead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNotes: notes, followUpAt: followUpAt || null, estimatedValue })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to update lead.");
      onUpdated(result.lead);
      setSaved(true);
    } catch (err) {
      setError(err.message || "Unable to update lead.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-b border-silver/50 align-top last:border-0">
      <td className="px-4 py-3">
        <p className="font-medium text-navy">{lead.name}</p>
        <p className="mt-1 text-xs text-navy/50">{lead.email || "No email"}</p>
        <p className="mt-1 text-xs text-navy/50">{new Date(lead.createdAt).toLocaleDateString("en-IN")}</p>
      </td>
      <td className="px-4 py-3 text-navy/70">
        <a href={`tel:${lead.mobile}`} className="hover:text-gold-dark">{lead.mobile}</a>
      </td>
      <td className="px-4 py-3 text-navy/70">{lead.serviceInterested || "—"}</td>
      <td className="px-4 py-3 text-navy/70">{lead.source || "website"}</td>
      <td className="min-w-[260px] px-4 py-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-sm border border-silver-dark/40 bg-white px-2 py-2 text-xs">
          {STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
        <label className="mt-3 block text-[11px] font-semibold uppercase tracking-wide text-navy/50">Follow-up date</label>
        <input type="date" value={followUpAt} onChange={(e) => setFollowUpAt(e.target.value)} className="mt-1 w-full rounded-sm border border-silver-dark/40 px-2 py-2 text-xs" />
        <label className="mt-3 block text-[11px] font-semibold uppercase tracking-wide text-navy/50">Estimated value (₹)</label>
        <input type="number" min="0" step="1" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} className="mt-1 w-full rounded-sm border border-silver-dark/40 px-2 py-2 text-xs" />
        <label className="mt-3 block text-[11px] font-semibold uppercase tracking-wide text-navy/50">Internal notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={5000} rows={3} placeholder="Add private follow-up notes..." className="mt-1 w-full rounded-sm border border-silver-dark/40 px-2 py-2 text-xs" />
        <button type="button" onClick={save} disabled={saving} className="btn-gold mt-2 text-xs disabled:opacity-50">{saving ? "Saving..." : "Save CRM details"}</button>
        {saved && <p className="mt-1 text-xs text-green-700">Saved</p>}
        {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
      </td>
      <td className="max-w-[240px] px-4 py-3 text-xs leading-5 text-navy/70">{lead.message || "—"}</td>
    </tr>
  );
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [followUpFilter, setFollowUpFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(q = search, status = statusFilter, followUp = followUpFilter) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (q) params.set("search", q);
      if (status) params.set("status", status);
      if (followUp) params.set("followUp", followUp);
      const res = await fetch(`/api/leads?${params.toString()}`);
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

  useEffect(() => { load("", ""); }, []);

  function handleSearch(e) {
    e.preventDefault();
    load(search, statusFilter, followUpFilter);
  }

  function updateLead(updated) {
    setLeads((current) => current.map((lead) => lead._id === updated._id ? updated : lead));
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Lead CRM</h1>
          <p className="mt-1 text-sm text-navy/60">Track enquiries, pipeline stages, due follow-ups and estimated customer value.</p>
        </div>
        <a href="/api/leads/export" className="btn-gold text-xs">Export CSV</a>
      </div>

      <form onSubmit={handleSearch} className="mt-4 flex flex-wrap gap-2">
        <input placeholder="Search name, mobile or email" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-sm border border-silver-dark/40 px-4 py-2 text-sm focus:border-gold focus:outline-none sm:max-w-xs" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-sm border border-silver-dark/40 bg-white px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
        <select value={followUpFilter} onChange={(e) => setFollowUpFilter(e.target.value)} className="rounded-sm border border-silver-dark/40 bg-white px-3 py-2 text-sm">
          <option value="">All follow-ups</option>
          <option value="due">Due / overdue</option>
          <option value="upcoming">Next 7 days</option>
        </select>
        <button type="submit" className="btn-navy-outline text-xs">Apply filters</button>
      </form>

      {error && <p role="alert" className="mt-6 text-sm text-red-600">{error}</p>}
      {loading ? <p className="mt-6 text-sm text-navy/60">Loading leads...</p> : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Pipeline & follow-up</th>
                <th className="px-4 py-3">Enquiry</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => <LeadRow key={lead._id} lead={lead} onUpdated={updateLead} />)}
              {leads.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-navy/60">No leads found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
