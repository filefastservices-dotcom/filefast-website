"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const WORKSPACES = [
  { title: "Website content", description: "Control what visitors see on the website.", items: [
    { label: "Manage services", href: "/admin/services", detail: "Edit service pages and publishing" },
    { label: "Create a service", href: "/admin/services/new", detail: "Add a new service page" },
    { label: "Manage blogs", href: "/admin/blog", detail: "Edit and publish articles" },
    { label: "Write a blog", href: "/admin/blog/new", detail: "Create an SEO article" },
    { label: "Testimonials", href: "/admin/testimonials", detail: "Manage client feedback" },
    { label: "Add testimonial", href: "/admin/testimonials/new", detail: "Publish approved feedback" }
  ]},
  { title: "Business operations", description: "Handle enquiries, bookings and payments.", items: [
    { label: "Open leads", href: "/admin/leads", detail: "Review and export enquiries" },
    { label: "Appointments", href: "/admin/appointments", detail: "Manage booking status" },
    { label: "Payments", href: "/admin/payments", detail: "Review payment records" },
    { label: "Analytics", href: "/admin/analytics", detail: "Understand sources and campaigns" }
  ]}
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ services: 0, leads: 0, testimonials: 0, publishedTestimonials: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [servicesRes, leadsRes, testimonialsRes] = await Promise.all([
          fetch("/api/services?all=true"),
          fetch("/api/leads"),
          fetch("/api/testimonials?all=true")
        ]);
        const [servicesData, leadsData, testimonialsData] = await Promise.all([
          servicesRes.json(), leadsRes.json(), testimonialsRes.json()
        ]);
        if (!servicesRes.ok || !leadsRes.ok || !testimonialsRes.ok) throw new Error("Some dashboard data could not be loaded. Check your admin session and refresh.");
        if (!active) return;
        const testimonials = testimonialsData.testimonials || [];
        setStats({
          services: servicesData.services?.length || 0,
          leads: leadsData.leads?.length || 0,
          testimonials: testimonials.length,
          publishedTestimonials: testimonials.filter((item) => item.isPublished).length
        });
      } catch (err) {
        if (active) setError(err.message || "Unable to load dashboard data.");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-blue-700">FileFast Global · Control centre</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">Website overview</h1>
          <p className="mt-2 text-sm text-slate-500">Manage your website, content and business enquiries from one workspace.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" target="_blank" className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">View live website ↗</Link>
          <Link href="/admin/leads" className="rounded-lg bg-[#0b2344] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Open enquiries</Link>
        </div>
      </div>

      {error && <p role="alert" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{error}</p>}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/services" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">Services</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{loading ? "—" : stats.services}</p>
          <p className="mt-2 text-xs font-semibold text-blue-700">Manage service pages →</p>
        </Link>
        <Link href="/admin/leads" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">Saved enquiries</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{loading ? "—" : stats.leads}</p>
          <p className="mt-2 text-xs font-semibold text-blue-700">Review leads →</p>
        </Link>
        <Link href="/admin/testimonials" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">Published testimonials</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{loading ? "—" : stats.publishedTestimonials}<span className="ml-1 text-base font-normal text-slate-400">/ {loading ? "—" : stats.testimonials}</span></p>
          <p className="mt-2 text-xs font-semibold text-blue-700">Manage testimonials →</p>
        </Link>
        <Link href="/admin/analytics" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">Performance insights</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">Analytics</p>
          <p className="mt-2 text-xs font-semibold text-blue-700">View campaign and source data →</p>
        </Link>
      </div>

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="text-lg font-semibold text-slate-950">Quick actions</h2><p className="mt-1 text-sm text-slate-500">Start common tasks without searching through menus.</p></div>
          <span className="text-xs text-slate-400">Tip: press Ctrl + K anywhere in Admin to jump to a page or action.</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { label: "Create a blog post", href: "/admin/blog/new", mark: "＋", desc: "Publish a new article" },
            { label: "Add a service", href: "/admin/services/new", mark: "＋", desc: "Create a service page" },
            { label: "Add a testimonial", href: "/admin/testimonials/new", mark: "＋", desc: "Add genuine client feedback" },
            { label: "Export leads", href: "/api/leads/export", mark: "↓", desc: "Download enquiry records", external: true },
            { label: "Manage appointments", href: "/admin/appointments", mark: "◷", desc: "Review upcoming bookings" },
            { label: "Review payments", href: "/admin/payments", mark: "₹", desc: "Check payment records" }
          ].map((item) => <Link key={item.href} href={item.href} target={item.external ? "_blank" : undefined} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/40">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-lg font-semibold text-[#0b2344]">{item.mark}</span>
            <span className="min-w-0"><span className="block text-sm font-semibold text-slate-900">{item.label}</span><span className="mt-1 block text-xs text-slate-500">{item.desc}</span></span>
            <span className="ml-auto text-slate-400">→</span>
          </Link>)}
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {WORKSPACES.map((workspace) => <section key={workspace.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-950">{workspace.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{workspace.description}</p>
          <div className="mt-4 divide-y divide-slate-100">
            {workspace.items.map((item) => <Link key={item.href} href={item.href} className="flex items-center justify-between gap-3 py-3 hover:text-blue-700">
              <span><span className="block text-sm font-semibold text-slate-800">{item.label}</span><span className="mt-0.5 block text-xs text-slate-500">{item.detail}</span></span>
              <span className="text-slate-400">↗</span>
            </Link>)}
          </div>
        </section>)}
      </div>
      <p className="mt-6 text-xs text-slate-400">Dashboard figures are read from the existing FileFast website APIs. Analytics and payment figures only represent data currently recorded by those systems.</p>
    </div>
  );
}
