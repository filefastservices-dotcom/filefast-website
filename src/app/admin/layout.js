"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const GROUPS = [
  { title: "Overview", links: [{ href: "/admin/dashboard", label: "Dashboard" }, { href: "/admin/analytics", label: "Analytics" }, { href: "/admin/seo", label: "SEO & Google" }] },
  { title: "Website content", links: [{ href: "/admin/services", label: "Services" }, { href: "/admin/blog", label: "Blog & Articles" }, { href: "/admin/testimonials", label: "Testimonials" }] },
  { title: "Business operations", links: [{ href: "/admin/leads", label: "Leads" }, { href: "/admin/appointments", label: "Appointments" }, { href: "/admin/payments", label: "Payments" }] }
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return children;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-silver-light">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-silver bg-navy px-4 py-3 text-white sm:px-6">
        <Link href="/admin/dashboard" aria-label="FileFast admin dashboard" className="inline-flex rounded bg-white px-2 py-1">
          <Image src="/logo.png" alt="FileFast Global" width={150} height={44} className="h-9 w-auto object-contain" priority />
        </Link>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-silver hover:text-gold">View website ↗</a>
          <button onClick={handleLogout} className="rounded border border-white/20 px-3 py-2 text-xs font-semibold text-silver hover:border-gold hover:text-gold">Log Out</button>
        </div>
      </header>
      <nav aria-label="Admin navigation" className="border-b border-silver bg-white px-3 py-3 sm:px-5">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-7 gap-y-3">
          {GROUPS.map((group) => (
            <div key={group.title} className="min-w-0">
              <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-navy/40">{group.title}</p>
              <div className="flex flex-wrap gap-1">
                {group.links.map((link) => {
                  const active = pathname === link.href || (link.href !== "/admin/dashboard" && pathname.startsWith(link.href + "/"));
                  return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`whitespace-nowrap rounded px-3 py-2 text-xs font-semibold transition ${active ? "bg-gold/15 text-gold-dark" : "text-navy/70 hover:bg-silver-light hover:text-navy"}`}>{link.label}</Link>;
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
