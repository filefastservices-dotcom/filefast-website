import Link from "next/link";

export const metadata = {
  title: "Global Tax & Compliance Support",
  description:
    "Cross-border tax and compliance coordination for businesses serving India, the UK, the US and EU markets."
};

const MARKETS = [
  {
    name: "India",
    services: ["GST compliance", "Income-tax filing", "Company and MSME registrations"]
  },
  {
    name: "United Kingdom",
    services: ["VAT registration support", "Self Assessment coordination", "Company compliance guidance"]
  },
  {
    name: "United States",
    services: ["Sales-tax readiness", "Federal and state filing coordination", "Business formation guidance"]
  },
  {
    name: "European Union",
    services: ["VAT and OSS readiness", "Cross-border invoicing support", "Local compliance coordination"]
  }
];

export default function GlobalTaxPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white sm:py-24">
        <div className="container-page max-w-4xl">
          <p className="eyebrow text-gold">Built for cross-border business</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Tax and compliance support for your next market.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-silver">
            FileFast helps founders plan, organise and coordinate their tax and compliance work as they expand across India, the UK, the US and Europe.
          </p>
          <Link href="/appointments" className="btn-gold mt-8">
            Plan your expansion
          </Link>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Where we help</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
            Practical support, market by market.
          </h2>
          <p className="mt-4 text-navy/70">
            Start with a single market or build a coordinated plan for multiple countries. We make the process clearer, with specialist local review where required.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {MARKETS.map((market) => (
            <article key={market.name} className="rounded-sm border border-silver/70 bg-white p-7">
              <h3 className="font-display text-2xl font-semibold text-navy">{market.name}</h3>
              <ul className="mt-4 space-y-2 text-sm text-navy/70">
                {market.services.map((service) => (
                  <li key={service} className="flex gap-2"><span className="text-gold-dark">✓</span>{service}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-silver/70 bg-silver-light py-16">
        <div className="container-page grid gap-8 md:grid-cols-3">
          <div><h2 className="font-display text-xl font-semibold text-navy">1. Assess</h2><p className="mt-2 text-sm text-navy/70">Clarify your business model, target countries and deadlines.</p></div>
          <div><h2 className="font-display text-xl font-semibold text-navy">2. Prepare</h2><p className="mt-2 text-sm text-navy/70">Organise registrations, documentation, invoicing and reporting requirements.</p></div>
          <div><h2 className="font-display text-xl font-semibold text-navy">3. Coordinate</h2><p className="mt-2 text-sm text-navy/70">Keep filings and local specialist reviews on track as your business grows.</p></div>
        </div>
      </section>

      <section className="container-page py-16 text-center sm:py-24">
        <h2 className="font-display text-3xl font-semibold text-navy">Ready to enter a new market?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-navy/70">Book a consultation and tell us which countries you are targeting.</p>
        <Link href="/appointments" className="btn-gold mt-7">Book a consultation</Link>
        <p className="mx-auto mt-8 max-w-3xl text-xs leading-5 text-navy/55">Information on this site is general business guidance, not legal or tax advice. Country-specific filings and advice are subject to the relevant local professional review.</p>
      </section>
    </>
  );
}
