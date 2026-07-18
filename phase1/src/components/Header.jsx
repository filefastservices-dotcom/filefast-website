import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Founder" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-silver/60 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-navy">
          File<span className="text-gold-dark">Fast</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy/80 transition hover:text-gold-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a href="tel:+919444614182" className="btn-gold hidden sm:inline-flex">
          Call Now
        </a>

        {/* Mobile nav: simple horizontal scroll strip under header on small screens */}
        <details className="md:hidden">
          <summary className="list-none cursor-pointer rounded-sm border border-silver-dark/40 px-3 py-2 text-sm text-navy">
            Menu
          </summary>
        </details>
      </div>

      <nav className="container-page flex gap-5 overflow-x-auto pb-3 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-sm font-medium text-navy/80"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
