"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ services: 0, leads: 0 });

  useEffect(() => {
    async function load() {
      const [servicesRes, leadsRes] = await Promise.all([
        fetch("/api/services?all=true"),
        fetch("/api/leads")
      ]);
      const servicesData = await servicesRes.json();
      const leadsData = await leadsRes.json();
      setStats({
        services: servicesData.services?.length || 0,
        leads: leadsData.leads?.length || 0
      });
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-semibold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-navy/60">Quick overview of your website</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/services"
          className="rounded-sm border border-silver/70 bg-white p-6 transition hover:border-gold"
        >
          <p className="text-3xl font-display font-semibold text-navy">{stats.services}</p>
          <p className="mt-1 text-sm text-navy/60">Total Services — manage</p>
        </Link>
        <Link
          href="/admin/leads"
          className="rounded-sm border border-silver/70 bg-white p-6 transition hover:border-gold"
        >
          <p className="text-3xl font-display font-semibold text-navy">{stats.leads}</p>
          <p className="mt-1 text-sm text-navy/60">Total Leads — view</p>
        </Link>
      </div>

      <div className="mt-6 rounded-sm border border-silver/70 bg-white p-6">
        <p className="font-semibold text-navy">Quick Actions</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/admin/services/new" className="btn-gold text-xs">
            Add New Service
          </Link>
          <Link href="/admin/leads" className="btn-navy-outline text-xs">
            Export Leads CSV
          </Link>
        </div>
      </div>
    </div>
  );
}
