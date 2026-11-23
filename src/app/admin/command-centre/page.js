"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function Stat({ label, value, note }) {
  return <div className="rounded-sm border border-silver/70 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-wide text-navy/50">{label}</p><p className="mt-2 font-display text-2xl font-semibold text-navy">{value}</p><p className="mt-1 text-xs text-navy/50">{note}</p></div>;
}

export default function CommandCentrePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/analytics", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load business metrics.");
      setData(result);
    } catch (err) { setError(err.message || "Unable to load business metrics."); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return <div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="eyebrow">FileFast Global · Business intelligence</p><h1 className="mt-1 font-display text-2xl font-semibold text-navy">Marketing & sales command centre</h1><p className="mt-1 text-sm text-navy/60">A combined view of enquiries, pipeline health and recorded collections.</p></div>
      <button type="button" onClick={load} disabled={loading} className="btn-navy-outline text-xs">{loading ? "Refreshing..." : "Refresh data"}</button>
    </div>
    {error ? <p role="alert" className="mt-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
    {loading && !data ? <p className="mt-6 text-sm text-navy/60">Loading business data...</p> : null}
    {data ? <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="All enquiries" value={data.leads.total} note={`${data.leads.last30Days} in the last 30 days`} />
        <Stat label="Qualified prospects" value={(data.byStatus || []).find(x => x.label === "qualified")?.count || 0} note="Currently marked qualified" />
        <Stat label="Converted leads" value={(data.byStatus || []).find(x => x.label === "converted")?.count || 0} note="Currently marked converted" />
        <Stat label="Recorded collections" value={`₹${Number(data.payments?.revenue || 0).toLocaleString("en-IN")}`} note={`${data.payments?.successful || 0} successful payment records`} />
        <Stat label="Average first response" value={data.response?.averageMinutes == null ? "—" : `${data.response.averageMinutes} min`} note="Only leads with a first-response timestamp" />
        <Stat label="High-priority leads" value={(data.byPriority || []).find(x => x.label === "high")?.count || 0} note="Rule-based prioritisation" />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-sm border border-silver/70 bg-white p-5"><h2 className="font-semibold text-navy">Campaign enquiry performance</h2>{data.byCampaign?.length ? <div className="mt-4 space-y-3">{data.byCampaign.map(row => <div key={row.label} className="flex justify-between gap-3 border-b border-silver/50 pb-2 text-sm"><span className="break-all text-navy/70">{row.label}</span><strong className="text-navy">{row.count} leads</strong></div>)}</div> : <p className="mt-3 text-sm text-navy/55">Campaign enquiries will appear when links use UTM campaign tags.</p>}<p className="mt-3 text-xs text-navy/45">Enquiry counts only; ad spend and return on ad spend are not connected.</p></section>
        <section className="rounded-sm border border-silver/70 bg-white p-5"><h2 className="font-semibold text-navy">Revenue by service</h2>{data.revenueByService?.length ? <div className="mt-4 space-y-3">{data.revenueByService.map(row => <div key={row.label} className="flex justify-between gap-3 border-b border-silver/50 pb-2 text-sm"><span className="text-navy/70">{row.label}</span><strong className="text-navy">₹{Number(row.revenue).toLocaleString("en-IN")}</strong></div>)}</div> : <p className="mt-3 text-sm text-navy/55">No successful payment records yet.</p>}<p className="mt-3 text-xs text-navy/45">Successful payment records only; not accounting profit or verified invoice revenue.</p></section>
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><Link href="/admin/leads" className="btn-gold text-xs">Manage leads</Link><Link href="/admin/follow-ups" className="btn-navy-outline text-xs">Daily follow-ups</Link><Link href="/admin/payments" className="btn-navy-outline text-xs">View payments</Link><Link href="/admin/analytics" className="btn-navy-outline text-xs">Detailed analytics</Link></div>
      <p className="mt-5 text-xs leading-5 text-navy/45">Data source: FileFast enquiry and payment databases. Revenue is summed from payment records marked successful. Campaign ROI is not calculated because advertising cost data is not connected. Last refreshed {new Date(data.generatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}.</p>
    </> : null}
  </div>;
}
