"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ services: 0, leads: 0, testimonials: 0, publishedTestimonials: 0 });

  useEffect(() => {
    async function load() {
      const [servicesRes, leadsRes, testimonialsRes] = await Promise.all([
        fetch("/api/services?all=true"),
        fetch("/api/leads"),
        fetch("/api/testimonials?all=true")
      ]);
      const [servicesData, leadsData, testimonialsData] = await Promise.all([
        servicesRes.json(), leadsRes.json(), testimonialsRes.json()
      ]);
      const testimonials = testimonialsData.testimonials || [];
      setStats({
        services: servicesData.services?.length || 0,
        leads: leadsData.leads?.length || 0,
        testimonials: testimonials.length,
        publishedTestimonials: testimonials.filter((item) => item.isPublished).length
      });
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-semibold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-navy/60">Quick overview of your website</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <Link href="/admin/testimonials" className="rounded-sm border border-silver/70 bg-white p-6 transition hover:border-gold">
          <p className="text-3xl font-display font-semibold text-navy">{stats.publishedTestimonials} <span className="text-base text-navy/40">/ {stats.testimonials}</span></p>
          <p className="mt-1 text-sm text-navy/60">Published Testimonials — manage</p>
        </Link>
      </div>

      <div className="mt-6 rounded-sm border border-silver/70 bg-white p-6">
        <p className="font-semibold text-navy">Quick Actions</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/admin/homepage" className="btn-gold text-xs">Edit Homepage</Link>
          <Link href="/admin/blog" className="btn-navy-outline text-xs">Manage Blogs</Link>
          <Link href="/admin/services/new" className="btn-gold text-xs">
            Add New Service
          </Link>
          <Link href="/admin/testimonials/new" className="btn-navy-outline text-xs">Add Testimonial</Link>
          <Link href="/admin/leads" className="btn-navy-outline text-xs">
            Export Leads CSV
          </Link>
        </div>
      </div>
    </div>
  );
}
