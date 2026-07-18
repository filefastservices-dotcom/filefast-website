"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/leads", label: "Leads" }
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return children;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-silver-light">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-silver bg-navy px-5 py-4 text-white">
        <p className="font-display text-lg font-semibold">
          File<span className="text-gold">Fast</span> Admin
        </p>
        <button onClick={handleLogout} className="text-sm font-semibold text-silver hover:text-gold">
          Log Out
        </button>
      </header>

      <nav className="flex gap-2 overflow-x-auto border-b border-silver bg-white px-5 py-3">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-sm px-4 py-2 text-sm font-semibold ${
              pathname.startsWith(link.href)
                ? "bg-gold/10 text-gold-dark"
                : "text-navy/70 hover:text-gold-dark"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <main className="px-5 py-6 sm:px-8">{children}</main>
    </div>
  );
}
