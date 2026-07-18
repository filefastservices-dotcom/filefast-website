"use client";

import { useEffect, useState } from "react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(q = "") {
    setLoading(true);
    const res = await fetch(`/api/leads${q ? `?search=${encodeURIComponent(q)}` : ""}`);
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    load(search);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-navy">Leads</h1>
        <a href="/api/leads/export" className="btn-gold text-xs">
          Export CSV
        </a>
      </div>

      <form onSubmit={handleSearch} className="mt-4 flex gap-2">
        <input
          placeholder="Search by name, mobile or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-sm border border-silver-dark/40 px-4 py-2 text-sm focus:border-gold focus:outline-none sm:max-w-xs"
        />
        <button type="submit" className="btn-navy-outline text-xs">Search</button>
      </form>

      {loading ? (
        <p className="mt-6 text-sm text-navy/60">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l._id} className="border-b border-silver/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{l.name}</td>
                  <td className="px-4 py-3 text-navy/70">
                    <a href={`tel:${l.mobile}`} className="hover:text-gold-dark">{l.mobile}</a>
                  </td>
                  <td className="px-4 py-3 text-navy/70">{l.serviceInterested || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{l.message || "—"}</td>
                  <td className="px-4 py-3 text-navy/60">
                    {new Date(l.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-navy/60">
                    No leads found.
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
