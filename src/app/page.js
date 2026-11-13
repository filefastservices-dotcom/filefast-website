import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import LeadForm from "@/components/LeadForm";
import { getServices, getTestimonials, getBlogPosts } from "@/lib/data";
import { googleReviewUrl } from "@/lib/googleReviews";

export const metadata = {
  title: "Tax, GST, ITR, Business & Global Compliance Services | FileFast Global",
  description: "Explore GST, income tax, business registration, licensing, accounting, compliance and global VAT support from FileFast Global.",
  openGraph: {
    url: "https://www.filefastglobal.com/",
    title: "Tax, GST, ITR, Business & Global Compliance Services | FileFast Global",
    description: "Explore GST, income tax, business registration, licensing, accounting, compliance and global VAT support from FileFast Global.",
  },
  alternates: { canonical: "/" },
};

const WHY = [
  { title: "Professional Service", text: "Work handled by experienced tax and compliance professionals." },
  { title: "Reasonable Pricing", text: "Transparent, fair pricing with no hidden charges." },
  { title: "Clear Follow-through", text: "We explain next steps and help you track the work within the agreed scope." },
  { title: "Deadline-aware Workflow", text: "We organise documents and plan the work around applicable filing deadlines." },
  { title: "Secure Documentation", text: "Your documents are handled with strict confidentiality." },
  { title: "India + Global Coordination", text: "India tax compliance and cross-border support, with country-specific specialist review where required." }
];

const CATEGORIES = [
  "GST Services",
  "Income Tax Services",
  "Business Registration",
  "Licenses",
  "Compliance Services",
  "Accounting Services",
  "Digital Business Services",
  "Global Tax & VAT"
];

const PROOF_POINTS = ["India GST & income tax", "UK / EU / UAE VAT support", "US tax coordination", "Cross-border compliance"];

const FAQS = [
  {
    q: "How long does GST registration take?",
    a: "Processing time varies based on complete documents, portal checks and any clarification requested by the GST department."
  },
  {
    q: "Do you serve clients outside Tamil Nadu?",
    a: "Yes. We support India-side compliance online and help coordinate international tax and VAT workflows for businesses dealing with the UK, EU, UAE and US. Local professional review may be required depending on the service."
  },
  {
    q: "What documents do I need to get started?",
    a: "This varies by service. Reach out on WhatsApp and we'll send you the exact checklist."
  }
];

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a }
  }))
};

export default async function HomePage() {
  const [allServices, testimonials, blogPosts] = await Promise.all([
    getServices(),
    getTestimonials(),
    getBlogPosts({ limit: 3 })
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <section className="relative overflow-hidden bg-[#081b35] text-white">
        <div className="absolute inset-0 opacity-30" aria-hidden="true" style={{backgroundImage:"radial-gradient(circle at 78% 18%, rgba(214,170,69,.35), transparent 28%), radial-gradient(circle at 10% 90%, rgba(34,104,170,.45), transparent 34%)"}} />
        <div className="container-page relative grid min-h-[590px] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#f2d48d]">FileFast – Global Tax Compliance</p>
            <h1 className="mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.8rem]">Make business compliance clearer. <span className="text-[#e8c77c]">Move forward with confidence.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">GST, income tax, business registrations, licences, bookkeeping and international tax coordination — organised around what your business needs next.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Chennai-based support for individuals, founders, online sellers and businesses across India, with cross-border coordination for selected UK, EU, UAE and US tax workflows.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#service-categories" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#e8c77c] px-6 py-3 text-sm font-bold text-[#081b35] transition hover:bg-white" data-track="cta-explore-services">Explore all services <span className="ml-2">→</span></a>
              <a href="https://wa.me/919444614182?text=I%20would%20like%20to%20discuss%20a%20tax%20or%20compliance%20requirement" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#e8c77c] hover:text-[#e8c77c]" data-track="cta-whatsapp">Discuss your requirement</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60"><span>India tax & compliance</span><span>•</span><span>Business registrations</span><span>•</span><span>Global VAT coordination</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-6 rounded-[2rem] border border-white/10" />
            <div className="relative rounded-2xl border border-white/15 bg-white/[.08] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-white/15 pb-5"><div><p className="text-xs uppercase tracking-[.18em] text-[#e8c77c]">Your next step</p><h2 className="mt-2 font-display text-2xl font-semibold">Start with the right service</h2></div><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8c77c] text-xl font-bold text-[#081b35]">F</span></div>
              <div className="mt-5 space-y-3">
                {[
                  ["01","GST & income tax","Returns, registrations, ITC and TDS"],
                  ["02","Business setup","Registrations, licences and trademarks"],
                  ["03","Accounting support","Bookkeeping and reconciliations"],
                  ["04","International tax","UK, EU, UAE and US coordination"]
                ].map(([number,title,desc]) => <div key={number} className="flex gap-4 rounded-xl border border-white/10 bg-[#06162c]/55 p-4"><span className="pt-0.5 text-sm font-semibold text-[#e8c77c]">{number}</span><div><p className="text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-white/60">{desc}</p></div></div>)}
              </div>
              <p className="mt-5 text-xs leading-5 text-white/50">Tell us what you are trying to do. We will help identify the relevant service, documents and next steps.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-silver/70 bg-white">
        <div className="container-page grid gap-5 py-6 text-center sm:grid-cols-3 sm:text-left">
          <div><p className="text-sm font-semibold text-navy">Transparent next steps</p><p className="mt-1 text-xs leading-5 text-navy/65">Know your documents, scope and timeline before we begin.</p></div>
          <div className="border-silver/70 sm:border-x sm:px-8"><p className="text-sm font-semibold text-navy">One practical point of contact</p><p className="mt-1 text-xs leading-5 text-navy/65">Message, call or email—choose the channel that works for you.</p></div>
          <div className="sm:pl-8"><p className="text-sm font-semibold text-navy">Built for founders everywhere</p><p className="mt-1 text-xs leading-5 text-navy/65">India compliance expertise with global expansion coordination.</p></div>
        </div>
      </section>

      {/* SIMPLE SERVICE DIRECTORY — all available services grouped by customer need */}
      <section id="service-categories" className="bg-slate-50 py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">FileFast Services</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">What do you need help with?</h2>
            <p className="mt-4 text-sm leading-7 text-navy/70 sm:text-base">
              Browse the services below in simple categories. Select a service to understand what it includes, who it is for and how to get started. Not sure what you need? Contact us and explain your situation.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              { name: "GST Services", intro: "For businesses registered or planning to register under GST.", examples: "GST registration, GSTR-1 sales returns and GSTR-3B summary returns.", slugs: ["gst-registration", "gstr-1-filing", "gstr-3b-filing"], filter: "GST Services" },
              { name: "Income Tax & TDS", intro: "For individuals, freelancers, professionals and businesses.", examples: "Income Tax Return filing and TDS return filing.", slugs: ["itr-filing", "tds-return-filing"], filter: "Income Tax Services" },
              { name: "Start or Register a Business", intro: "For founders, new businesses and entrepreneurs.", examples: "Company registration and MSME/Udyam registration.", slugs: ["company-registration", "msme-registration"], filter: "Business Registration" },
              { name: "Business Licences", intro: "For businesses that need licences or import-export permissions.", examples: "FSSAI registration and Import Export Code (IEC).", slugs: ["fssai-registration", "iec-registration"], filter: "Licenses" },
              { name: "Online Seller & Marketplace Support", intro: "For sellers joining online marketplaces or managing e-commerce compliance.", examples: "GeM registration and e-commerce tax compliance.", slugs: ["gem-registration", "ecommerce-tax-compliance"], filter: "Digital Business Services" },
              { name: "International Tax & VAT", intro: "For businesses operating or selling across borders.", examples: "UK VAT, EU VAT/OSS/IOSS, UAE VAT, US tax coordination and global expansion advisory.", slugs: ["uk-vat-compliance", "eu-vat-oss-ioss", "uae-vat-compliance", "us-tax-sales-tax", "global-expansion-advisory"], filter: "Global Tax & VAT" },
              { name: "Other Tax & Compliance Support", intro: "For businesses that need help understanding ongoing compliance requirements.", examples: "General tax and compliance support.", slugs: ["compliance-services"], filter: "Compliance Services" },
              { name: "Accounting & Bookkeeping", intro: "For businesses that need organised books and financial records.", examples: "Bookkeeping, ledger maintenance, bank reconciliation and agreed management reports.", slugs: ["accounting-bookkeeping"], filter: "Accounting Services" },
              { name: "Trademark & Brand Protection", intro: "For businesses looking to protect their brand identity.", examples: "Trademark application support for brand names and logos.", slugs: ["trademark-registration"], filter: "Licenses" }
            ].map((category) => {
              const categoryServices = allServices.filter((service) => category.slugs.includes(service.slug));
              return (
                <div key={category.name} className="rounded-lg border border-silver bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="font-display text-xl font-semibold text-navy">{category.name}</h3>
                  <p className="mt-2 text-sm font-medium text-navy/80">{category.intro}</p>
                  <p className="mt-2 text-sm leading-6 text-navy/65">{category.examples}</p>
                  {categoryServices.length > 0 ? (
                    <ul className="mt-4 space-y-2 border-t border-silver/70 pt-4">
                      {categoryServices.map((service) => (
                        <li key={service._id || service.slug}>
                          <Link href={`/services/${service.slug}`} className="group flex items-start justify-between gap-3 text-sm text-navy hover:text-gold-dark">
                            <span><span className="font-medium">{service.name}</span>{service.shortDescription ? <span className="mt-0.5 block text-xs leading-5 text-navy/55">{service.shortDescription}</span> : null}</span>
                            <span className="shrink-0 text-gold-dark" aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 border-t border-silver/70 pt-4 text-xs leading-5 text-navy/55">Contact us to discuss availability and the right professional support for this requirement.</p>
                  )}
                  <Link href={`/services?category=${encodeURIComponent(category.filter)}`} className="mt-5 inline-flex text-xs font-semibold text-gold-dark hover:underline">View category details →</Link>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 rounded-lg bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold">Not sure which service you need?</h3>
              <p className="mt-1 text-sm text-white/70">Tell us what you are trying to do. We will help identify the relevant service and document checklist.</p>
            </div>
            <a href="https://wa.me/919444614182?text=I%20need%20help%20choosing%20a%20FileFast%20service" target="_blank" rel="noopener noreferrer" className="btn-gold shrink-0">Ask on WhatsApp</a>
          </div>
          <div className="mt-6 text-center">
            <Link href="/services" className="text-sm font-semibold text-navy underline decoration-gold underline-offset-4">View the complete service directory</Link>
          </div>
        </div>
      </section>

            <section id="service-pricing" className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Transparent Professional Fees</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">Clear starting prices. No surprise scope.</h2>
            <p className="mt-4 text-sm leading-7 text-navy/70">Compare our introductory professional fees across tax, registrations, accounting and global compliance. Final fees are confirmed after checking your documents, transaction volume and exact scope.</p>
          </div>
          <div className="mt-8 rounded-lg border border-gold/40 bg-[#fffaf0] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-gold-dark">New-client GST starter offer</p>
                <p className="mt-1 font-display text-2xl font-semibold text-navy">One eligible Nil GST return from ₹49</p>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-navy/65">Professional fee for one basic nil GSTR-1 or GSTR-3B return only, after eligibility and document checks. It does not cover both returns, transaction reporting, reconciliation, notices or additional work. Confirm the total fee before authorising filing.</p>
              </div>
              <a href="https://wa.me/919444614182?text=I%20want%20to%20check%20eligibility%20for%20the%20FileFast%20GST%20starter%20offer" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-[#081b35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#17375d]">Check offer eligibility</a>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service) => {
              const hasOffer = Boolean(service.offerPrice);
              return (
                <article key={service.slug} className="flex flex-col rounded-lg border border-silver/70 bg-white p-5 transition hover:border-gold hover:shadow-md">
                  <p className="eyebrow">{service.category}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-navy">{service.name}</h3>
                  <div className="mt-4">
                    {hasOffer ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">{service.offerLabel || "Introductory professional fee"}</p>
                        <div className="mt-1 flex flex-wrap items-baseline gap-2">
                          <span className="font-display text-3xl font-semibold text-navy">₹{Number(service.offerPrice).toLocaleString("en-IN")}</span>
                          {service.regularPrice ? <span className="text-sm text-navy/45 line-through">₹{Number(service.regularPrice).toLocaleString("en-IN")}</span> : null}
                        </div>
                        {service.pricingUnit ? <p className="mt-1 text-xs text-navy/60">{service.pricingUnit}</p> : null}
                      </>
                    ) : <p className="font-display text-xl font-semibold text-navy">Custom quotation</p>}
                  </div>
                  <p className="mt-3 flex-1 text-xs leading-5 text-navy/65">{service.pricingNote || service.shortDescription}</p>
                  <Link href={`/services/${service.slug}`} className="mt-4 inline-flex text-sm font-semibold text-gold-dark underline underline-offset-4">View scope & pricing →</Link>
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs leading-5 text-navy/55">All amounts are professional service fees in INR unless stated otherwise. Government/statutory fees, third-party charges and applicable GST are additional where relevant. Offer pricing applies only to the stated scope and eligible cases. No government approval or tax outcome is guaranteed.</p>
        </div>
      </section>

      {/* Genuine client feedback only; never populate this area with invented reviews. */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container-page">
          <p className="eyebrow text-gold">Client Testimonials</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="mt-2 font-display text-3xl font-semibold">Feedback from our clients</h2>
            <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-sm border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Read all Google reviews ↗
            </a>
          </div>
          <p className="mt-3 text-sm text-white/65">Selected Google review highlights and published client feedback. Each Google excerpt links to the original listing.</p>
          <p className="mt-2 text-xs text-white/55">These are selected excerpts, not a complete copy of every Google review.</p>
          {testimonials.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 6).map((t) => <TestimonialCard key={t._id} testimonial={t} />)}
            </div>
          ) : (
            <div className="mt-8 max-w-2xl rounded-lg border border-white/15 bg-white/5 p-6">
              <p className="text-sm leading-7 text-white/80">This space is reserved for genuine client feedback. Reviews will appear here after they are added and published by the FileFast team.</p>
              <p className="mt-3 text-xs text-white/55">We do not publish sample or invented reviews.</p>
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-page py-16 sm:py-20">
        <p className="eyebrow text-center">Why Choose FileFast</p>
        <h2 className="mt-2 text-center font-display text-3xl font-semibold text-navy">
          Tax, VAT and Compliance Support Built Around Your Business
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((item) => (
            <div key={item.title} className="rounded-sm border border-silver/70 p-6">
              <div className="gold-rule" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-navy/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-silver/70 bg-white py-16 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Global Tax & VAT</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy">Compliance support across borders</h2>
            <p className="mt-4 text-sm leading-7 text-navy/70">For businesses selling internationally, tax obligations can depend on customer location, goods movement, marketplace activity and business structure. FileFast helps organise the facts and coordinate the next steps for UK VAT, EU VAT and OSS/IOSS, UAE VAT, US tax and sales-tax workflows, alongside India GST and income-tax compliance.</p>
            <p className="mt-3 text-sm leading-7 text-navy/70">The exact scope depends on your case. Where local registration, tax advice or filing requires country-specific expertise, we help identify the need for an appropriate local professional.</p>
            <Link href="/global" className="btn-navy-outline mt-6 inline-flex">Explore Global Tax Support</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["India", "GST, ITR, TDS & business compliance"],
              ["United Kingdom", "VAT readiness & filing coordination"],
              ["European Union", "VAT, OSS/IOSS & cross-border records"],
              ["United Arab Emirates", "VAT readiness & return coordination"],
              ["United States", "Tax and sales-tax workflow coordination"],
              ["E-commerce", "Marketplace and multi-country tax records"]
            ].map(([title, body]) => (
              <div key={title} className="rounded-sm border border-silver/70 p-5">
                <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Knowledge Centre</p><h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">Practical guides for better business decisions</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-navy/70">Understand filing requirements, documents, tax treatment and compliance workflows through clear, regularly reviewed articles.</p></div>
            <Link href="/blog" className="text-sm font-semibold text-gold-dark underline underline-offset-4">Explore all articles →</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => <article key={post._id || post.slug} className="flex h-full flex-col rounded-xl border border-silver/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="eyebrow">{post.category || "Business & Compliance"}</p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-navy">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-navy/70">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-gold-dark">Read the guide →</Link>
            </article>)}
          </div>
          {!blogPosts.length && <p className="mt-6 text-sm text-navy/65">New practical guides are being prepared. Contact FileFast for help with your requirement.</p>}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16 sm:py-20">
        <p className="eyebrow text-center">FAQs</p>
        <h2 className="mt-2 text-center font-display text-3xl font-semibold text-navy">
          Common Questions
        </h2>
        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-sm border border-silver/70 p-5">
              <summary className="cursor-pointer font-semibold text-navy">{f.q}</summary>
              <p className="mt-2 text-sm text-navy/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="consultation" className="bg-silver-light py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Get Started</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy">
              Request a Consultation
            </h2>
            <p className="mt-3 text-sm text-navy/70">
              Tell us your business type, country and compliance requirement. We’ll review your request and explain the next steps.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/919444614182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                WhatsApp Now
              </a>
              <a href="tel:+919444614182" className="btn-navy-outline">
                Call Now
              </a>
            </div>
          </div>
          <div className="rounded-sm border border-silver/70 bg-white p-6 sm:p-8">
            <LeadForm defaultService="GST registration or return filing" />
          </div>
        </div>
      </section>
    </>
  );
}
