import Link from "next/link";

export const metadata = {
  title: "Global Tax & Compliance Support",
  description:
    "Global tax, VAT and compliance coordination for Indian businesses and founders expanding to the UK, EU, UAE and US markets."
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
    name: "United Arab Emirates",
    services: ["VAT registration readiness", "VAT return coordination", "Business documentation support"]
  },
  {
    name: "European Union",
    services: ["VAT and OSS readiness", "Cross-border invoicing support", "Local compliance coordination"]
  }
];

const GLOBAL_GUIDANCE = [
  { title: "Choose the right starting point", text: "Expansion work begins with the facts: where customers are located, how invoices are issued, whether goods move across borders, where teams work and which entities receive payment. This helps identify the questions that need country-specific professional review before a deadline arrives." },
  { title: "Keep records ready from day one", text: "A strong compliance file normally includes company registrations, PAN and GST records, ownership details, contracts, invoice samples, expected turnover, bank and payment-flow information. Preparing this early makes conversations with local advisers faster and more accurate." },
  { title: "Coordinate, do not guess", text: "VAT, sales tax, corporate tax and payroll rules depend on facts and local law. FileFast Global helps organise the India-side work and coordinate with appropriately qualified country-specific professionals where required." }
];

const FAQS = [
  { question: "Can FileFast Global help with UK VAT and Making Tax Digital?", answer: "We can help you organise information, understand the usual registration and reporting workflow, and coordinate with UK specialists where a local review or filing is required." },
  { question: "Do you provide EU VAT, OSS or IOSS support?", answer: "We help founders prepare the business, invoicing and transaction information needed for an EU VAT, OSS or IOSS assessment, then coordinate the next step with the relevant local professional." },
  { question: "Can you advise on UAE VAT or US tax?", answer: "We provide process coordination and India-side compliance support. UAE and US tax outcomes depend on the precise facts, so country-specific advice and filings are handled with the appropriate local professional review." },
  { question: "What should I bring to a global tax consultation?", answer: "Bring your company documents, GST and PAN details, target countries, customer locations, expected turnover, invoice examples, contracts and a short explanation of how payments and delivery work." }
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

      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Global tax readiness</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">Expand with a clear compliance plan.</h2>
          <p className="mt-4 text-navy/70">Selling internationally can create VAT, sales-tax, invoicing, record-keeping and reporting questions long before a formal filing is due. FileFast Global gives founders a practical starting point: identify the markets involved, prepare the right information and coordinate reliable local review where required.</p>
          <p className="mt-4 text-navy/70">This approach is particularly useful for Indian businesses entering the UK, European Union, UAE or United States, and for overseas founders managing India-side GST, income-tax or business-registration requirements. It does not replace country-specific tax or legal advice; it helps make the next conversation efficient and well prepared.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {GLOBAL_GUIDANCE.map((item) => (
            <article key={item.title} className="rounded-sm border border-silver/70 bg-white p-7">
              <h3 className="font-display text-xl font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-navy/70">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-silver/70 bg-silver-light py-16">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">Frequently asked questions</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy">Global tax and VAT coordination</h2>
          <div className="mt-8 space-y-5">
            {FAQS.map((faq) => (
              <article key={faq.question} className="rounded-sm border border-silver/70 bg-white p-6">
                <h3 className="font-display text-lg font-semibold text-navy">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-navy/70">{faq.answer}</p>
              </article>
            ))}
          </div>
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
