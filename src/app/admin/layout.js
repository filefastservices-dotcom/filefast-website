"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const GROUPS = [
  { title: "Overview", links: [
    { href: "/admin/dashboard", label: "Dashboard", hint: "Website overview and quick actions" },
    { href: "/admin/analytics", label: "Analytics", hint: "Lead sources, campaigns and content metrics" }
  ]},
  { title: "Website content", links: [
    { href: "/admin/services", label: "Services", hint: "Manage service pages and publishing" },
    { href: "/admin/blog", label: "Blog", hint: "Create, edit and publish articles" },
    { href: "/admin/testimonials", label: "Testimonials", hint: "Manage client feedback and Google review workflow" }
  ]},
  { title: "Business operations", links: [
    { href: "/admin/leads", label: "Leads & enquiries", hint: "Review enquiries and export leads" },
    { href: "/admin/appointments", label: "Appointments", hint: "Confirm and manage bookings" },
    { href: "/admin/payments", label: "Payments", hint: "Review payment records and revenue" }
  ]}
];

const QUICK_ACTIONS = [
  { href: "/admin/services/new", label: "Add a service", group: "Create" },
  { href: "/admin/blog/new", label: "Write a blog post", group: "Create" },
  { href: "/admin/testimonials/new", label: "Add a testimonial", group: "Create" },
  { href: "/admin/leads", label: "Open leads", group: "Navigate" },
  { href: "/admin/appointments", label: "Open appointments", group: "Navigate" },
  { href: "/admin/analytics", label: "Open analytics", group: "Navigate" },
  { href: "/admin/payments", label: "Open payments", group: "Navigate" },
  { href: "/", label: "View live website", group: "Website" }
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const commands = useMemo(() => {
    const all = [
      ...GROUPS.flatMap((group) => group.links.map((link) => ({ ...link, group: group.title }))),
      ...QUICK_ACTIONS
    ];
    const unique = new Map(all.map((item) => [item.href, item]));
    const q = query.trim().toLowerCase();
    return [...unique.values()].filter((item) =>
      !q || (item.label + " " + (item.hint || "") + " " + (item.group || "")).toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setMobileNavOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setPaletteOpen(false);
    setMobileNavOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") return children;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function openCommand(href) {
    setPaletteOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:shadow-lg">Skip to main content</a>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" aria-label="Open admin navigation" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden">Menu</button>
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold tracking-tight text-slate-950">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b2344] text-sm font-bold text-white">FF</span>
            <span>FileFast <span className="text-slate-500">Control Centre</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPaletteOpen(true)} className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-500 hover:border-slate-300 hover:bg-white sm:min-w-56">
            <span aria-hidden="true">⌕</span><span className="hidden sm:inline">Search pages and actions...</span><span className="sm:hidden">Search</span><kbd className="ml-auto hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">Ctrl K</kbd>
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:inline-flex">View website ↗</a>
          <button type="button" onClick={handleLogout} className="rounded-lg bg-[#0b2344] px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">Log out</button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className={`${mobileNavOpen ? "block" : "hidden"} fixed inset-x-0 top-16 z-30 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-xl lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:shadow-none`}>
          <div className="mb-4 rounded-xl bg-slate-50 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-slate-400">Workspace</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Website management</p>
            <p className="mt-1 text-xs text-slate-500">All core tools in one place</p>
          </div>
          <nav aria-label="Admin navigation" className="space-y-5">
            {GROUPS.map((group) => (
              <section key={group.title}>
                <h2 className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[.14em] text-slate-400">{group.title}</h2>
                <div className="space-y-1">
                  {group.links.map((link) => {
                    const active = pathname === link.href || (link.href !== "/admin/dashboard" && pathname.startsWith(link.href + "/"));
                    return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} title={link.hint} className={`flex min-h-11 items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-[#0b2344] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}>
                      <span>{link.label}</span>{active && <span aria-hidden="true" className="text-xs">●</span>}
                    </Link>;
                  })}
                </div>
              </section>
            ))}
          </nav>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <button type="button" onClick={() => setPaletteOpen(true)} className="w-full rounded-lg border border-dashed border-slate-300 px-3 py-3 text-left text-sm font-semibold text-slate-600 hover:border-slate-400 hover:bg-slate-50">＋ Quick actions <span className="float-right text-slate-400">Ctrl K</span></button>
          </div>
        </aside>

        <main id="admin-main" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      {paletteOpen && <div className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/50 px-3 pt-[12vh]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="admin-command-title" className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-100 p-4">
            <h2 id="admin-command-title" className="mb-2 text-sm font-semibold text-slate-900">Go anywhere in FileFast Admin</h2>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dashboard, blogs, leads, add service..." className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            <p className="mt-2 text-xs text-slate-500">Type to filter destinations. Press Esc to close.</p>
          </div>
          <div className="max-h-[55vh] overflow-y-auto p-2">
            {commands.length ? commands.map((item) => <button key={item.href} type="button" onClick={() => openCommand(item.href)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-slate-50 focus:bg-slate-50 focus:outline-none">
              <span><span className="block text-sm font-semibold text-slate-800">{item.label}</span><span className="mt-0.5 block text-xs text-slate-500">{item.hint || item.group}</span></span>
              <span className="text-xs text-slate-400">Open →</span>
            </button>) : <p className="p-6 text-center text-sm text-slate-500">No matching page or action.</p>}
          </div>
          <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-400">FileFast Global · Admin navigation</div>
        </section>
      </div>}
    </div>
  );
}
