"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function TaskGroup({ title, description, leads, tone }) {
  return (
    <section className="rounded-sm border border-silver/70 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-semibold text-navy">{title}</h2>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{leads.length} tasks</span>
      </div>
      <p className="mt-1 text-xs text-navy/55">{description}</p>
      {leads.length ? (
        <div className="mt-4 divide-y divide-silver/60">
          {leads.map((lead) => (
            <article key={lead._id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold text-navy">{lead.name}</p>
                <p className="mt-1 text-xs text-navy/65">{lead.mobile}{lead.email ? ` · ${lead.email}` : ""}</p>
                <p className="mt-1 text-xs text-navy/55">{lead.serviceInterested || "Service not specified"} · {lead.status || "new"}</p>
                {lead.internalNote ? <p className="mt-2 max-w-2xl text-xs leading-5 text-navy/60">Note: {lead.internalNote}</p> : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs font-medium text-navy/60">{lead.followUpAt ? new Date(lead.followUpAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }) : ""}</span>
                <a href={`tel:${lead.mobile}`} className="rounded bg-navy px-3 py-2 text-xs font-semibold text-white">Call</a>
                <Link href="/admin/leads" className="rounded border border-silver-dark/40 px-3 py-2 text-xs font-semibold text-navy">Update</Link>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="mt-4 rounded bg-silver-light/60 p-4 text-sm text-navy/55">No follow-ups in this group.</p>}
    </section>
  );
}

export default function FollowUpsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/follow-ups", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load follow-ups.");
      setData(result);
    } catch (err) {
      setError(err.message || "Unable to load follow-ups.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Business operations</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy">Daily follow-up desk</h1>
          <p className="mt-1 text-sm text-navy/60">Prioritise overdue enquiries, today's calls and upcoming prospects.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={load} disabled={loading} className="btn-navy-outline text-xs">{loading ? "Refreshing..." : "Refresh tasks"}</button>
          <Link href="/admin/leads" className="btn-gold text-xs">Manage all leads</Link>
        </div>
      </div>

      {error ? <p role="alert" className="mt-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {loading && !data ? <p className="mt-6 text-sm text-navy/60">Loading follow-up tasks...</p> : null}
      {data ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              ["Overdue", data.summary.overdue, "text-red-700"],
              ["Due today", data.summary.dueToday, "text-amber-700"],
              ["Next 7 days", data.summary.upcoming, "text-blue-700"],
              ["No follow-up date", data.summary.unscheduled, "text-navy"],
              ["Open leads", data.summary.openLeads, "text-navy"]
            ].map(([label, value, tone]) => <div key={label} className="rounded-sm border border-silver/70 bg-white p-4"><p className="text-[10px] font-bold uppercase tracking-wide text-navy/50">{label}</p><p className={`mt-2 font-display text-3xl font-semibold ${tone}`}>{Number(value).toLocaleString("en-IN")}</p></div>)}
          </div>
          <div className="mt-6 space-y-5">
            <TaskGroup title="Overdue follow-ups" description="Open leads whose follow-up date has passed." leads={data.overdue} tone="bg-red-50 text-red-700" />
            <TaskGroup title="Due today" description="Contact these prospects today and update their lead status." leads={data.dueToday} tone="bg-amber-50 text-amber-800" />
            <TaskGroup title="Coming up" description="Scheduled follow-ups over the next seven days." leads={data.upcoming} tone="bg-blue-50 text-blue-700" />
          </div>
          <p className="mt-4 text-xs text-navy/45">Refreshed: {new Date(data.generatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}. This dashboard does not send messages or make calls automatically.</p>
        </>
      ) : null}
    </div>
  );
}
