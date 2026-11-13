"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function Metric({ label, value, note }) {
  return (
    <div className="rounded-sm border border-silver/70 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-navy">{Number(value || 0).toLocaleString("en-IN")}</p>
      {note && <p className="mt-1 text-xs text-navy/50">{note}</p>}
    </div>
  );
}

function Breakdown({ title, rows, empty }) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  return (
    <section className="rounded-sm border border-silver/70 bg-white p-5">
      <h2 className="font-semibold text-navy">{title}</h2>
      {rows.length ? (
        <div className="mt-4 space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-navy/80">{row.label}</span>
                <strong className="shrink-0 text-navy">{row.count}</strong>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-silver-light">
                <div className="h-full rounded-full bg-gold-dark" style={{ width: `${(row.count / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : <p className="mt-4 text-sm text-navy/50">{empty || "No records yet."}</p>}
    </section>
  );
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/analytics");
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load analytics.");
      setData(result);
    } catch (err) {
      setError(err.message || "Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const monthlyMax = Math.max(1, ...(data?.monthly || []).map((item) => item.count));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Lead & Content Analytics</h1>
          <p className="mt-1 text-sm text-navy/60">Understand which enquiries and service categories are reaching FileFast.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="btn-navy-outline text-xs disabled:opacity-50">
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && <p role="alert" className="mt-5 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {loading && !data ? <p className="mt-6 text-sm text-navy/60">Loading analytics...</p> : data && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="All-time leads" value={data.leads.total} note="Saved enquiry records" />
            <Metric label="Last 30 days" value={data.leads.last30Days} note="New enquiries" />
            <Metric label="Last 90 days" value={data.leads.last90Days} note="New enquiries" />
            <Metric label="Published blogs" value={data.blogs.published} note={`${data.blogs.total} total articles`} />
            <Metric label="Follow-ups due" value={data.followUpsDue} note="Due or overdue open leads" />
            <Metric label="Qualified pipeline" value={`₹${Number(data.estimatedPipelineValue || 0).toLocaleString("en-IN")}`} note="Estimated value of qualified and converted leads" />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <section className="rounded-sm border border-silver/70 bg-white p-5">
              <h2 className="font-semibold text-navy">Monthly lead trend</h2>
              <p className="mt-1 text-xs text-navy/50">Last six calendar months · India Standard Time</p>
              {data.monthly.length ? (
                <div className="mt-5 flex h-52 items-end gap-3 border-b border-silver/70 pb-2">
                  {data.monthly.map((item) => (
                    <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                      <span className="text-xs font-semibold text-navy">{item.count}</span>
                      <div className="flex w-full flex-1 items-end">
                        <div className="w-full rounded-t-sm bg-gold-dark" style={{ height: `${Math.max(3, (item.count / monthlyMax) * 100)}%` }} />
                      </div>
                      <span className="text-[10px] text-navy/60">{new Date(`${item.month}-01T00:00:00`).toLocaleDateString("en-IN", { month: "short", year: "2-digit" })}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="mt-5 text-sm text-navy/50">No lead history available yet.</p>}
            </section>
            <Breakdown title="Lead pipeline" rows={(data.pipeline || []).map((item) => ({ label: item.status.charAt(0).toUpperCase() + item.status.slice(1), count: item.count }))} empty="No leads have been assigned a status yet." />
            <Breakdown title="Enquiries by service" rows={data.byService} />
            <Breakdown title="Enquiries by source" rows={data.bySource} />
            <section className="rounded-sm border border-silver/70 bg-white p-5">
              <h2 className="font-semibold text-navy">Next steps</h2>
              <p className="mt-2 text-sm leading-6 text-navy/70">Use these enquiry records to identify which service categories are generating interest. Update each enquiry status, add private notes, set a follow-up date and record an estimated value. The pipeline and due follow-up metrics update from these CRM records.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/admin/leads" className="btn-gold text-xs">Review leads</Link>
                <Link href="/admin/blog" className="btn-navy-outline text-xs">Manage blogs</Link>
              </div>
            </section>
          </div>
          <p className="mt-5 text-xs leading-5 text-navy/50">Data source: FileFast website enquiry and blog databases. This dashboard does not yet measure total website visitors, search impressions, page views, advertising spend or customer revenue. Those require verified Google Analytics 4, Search Console and CRM/payment integrations.</p>
          <p className="mt-2 text-xs text-navy/40">Last refreshed: {new Date(data.generatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </>
      )}
    </div>
  );
}
