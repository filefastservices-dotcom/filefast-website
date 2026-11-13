import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import LeadForm from "@/components/LeadForm";
import { getServices, getTestimonials } from "@/lib/data";
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
  const [allServices, testimonials] = await Promise.all([
    getServices(),
    getTestimonials()
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <section className="hero-section relative overflow-hidden">
        <div className="hero-orb hero-orb--one" aria-hidden="true" />
        <div className="hero-orb hero-orb--two" aria-hidden="true" />
        <div className="container-page relative grid min-h-[620px] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:py-24">
          <div className="hero-copy relative z-10">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/80 px-4 py-2 text-gold-dark">
              <span className="hero-live-dot" aria-hidden="true" />
              Tax, GST, ITR & global business compliance
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.65rem]">
              One partner for tax, compliance &amp; business services
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-navy/75 sm:text-lg sm:leading-8">
              From GST and income tax to registrations, accounting and international VAT coordination, explore practical support for your business.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-navy/65 sm:text-base">
              Serving businesses across India from Chennai, with cross-border coordination for founders operating in the UK, EU, UAE and US.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#service-categories" className="hero-primary-cta" data-track="cta-start">
                Explore All Services <span aria-hidden="true">→</span>
              </a>
              <Link href="/services" className="hero-secondary-cta" data-track="cta-learn">
                Browse Services
              </Link>
            </div>
            <p className="mt-5 text-xs leading-6 text-navy/60">
              Chennai-based support <span aria-hidden="true">·</span> Services across India <span aria-hidden="true">·</span> Clear document and process guidance
            </p>
          </div>

          <div className="hero-visual mx-auto w-full max-w-[540px]" aria-hidden="true">
            <div className="hero-visual__halo" />
            <div className="hero-orbit hero-orbit--outer" />
            <div className="hero-orbit hero-orbit--inner" />
            <div className="hero-panel hero-panel--main">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="hero-doc-icon"><span /></div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Your business compliance checklist</p>
                    <p className="mt-1 text-xs text-slate-500">A clear place to start</p>
                  </div>
                </div>
                <span className="hero-panel-dots" aria-hidden="true">•••</span>
              </div>
              <div className="space-y-3 p-5 sm:p-6">
                <div className="hero-task">
                  <span className="hero-task__icon hero-task__icon--blue"><span /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy">Share your requirements</p>
                    <p className="mt-1 text-xs text-slate-500">Tell us about your business</p>
                  </div>
                  <span className="hero-task__tag">Step 1</span>
                </div>
                <div className="hero-task hero-task--float">
                  <span className="hero-task__icon hero-task__icon--gold"><span /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy">Check your documents</p>
                    <p className="mt-1 text-xs text-slate-500">Identify the relevant requirements</p>
                  </div>
                  <span className="hero-task__tag">Step 2</span>
                </div>
                <div className="hero-task">
                  <span className="hero-task__icon hero-task__icon--teal"><span /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy">Prepare the next steps</p>
                    <p className="mt-1 text-xs text-slate-500">Understand the scope before work begins</p>
                  </div>
                  <span className="hero-task__tag">Step 3</span>
                </div>
              </div>
              <div className="mx-5 mb-5 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 sm:mx-6">
                <span className="hero-secure-mark" />
                <p className="text-xs leading-5 text-slate-600">Document guidance and clear next steps.</p>
              </div>
            </div>
            <div className="hero-floating-note hero-floating-note--top">
              <span className="hero-note-icon" aria-hidden="true">₹</span>
              <span><strong>GST &amp; tax support</strong><small>GST · ITR · TDS</small></span>
            </div>
            <div className="hero-floating-note hero-floating-note--bottom">
              <span className="hero-globe-icon" aria-hidden="true">◎</span>
              <span><strong>Cross-border support</strong><small>VAT · Global workflows</small></span>
            </div>
            <div className="hero-visual-caption">Illustrative workflow · Actual scope depends on your requirements</div>
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
              { name: "Accounting & Bookkeeping", intro: "For businesses that need organised books and financial records.", examples: "Contact FileFast to confirm the accounting scope available for your business.", slugs: [], filter: "Accounting Services" },
              { name: "Trademark & Brand Protection", intro: "For businesses looking to protect their brand identity.", examples: "Contact FileFast to confirm trademark application support and scope.", slugs: [], filter: "Licenses" }
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

      {/* ALL SERVICES — grouped by the live service catalogue */}
      <section id="all-services" className="bg-silver-light py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Our Services</p>
              <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-navy">Complete tax, business &amp; compliance support</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-navy/70">Browse services for individuals, startups, established businesses and cross-border sellers.</p>
            </div>
            <Link href="/services" className="text-sm font-semibold text-gold-dark">View Service Directory →</Link>
          </div>
          {CATEGORIES.map((category) => {
            const categoryServices = allServices.filter((service) => service.category === category);
            if (!categoryServices.length) return null;
            return (
              <div key={category} className="mt-10">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-navy">{category}</h3>
                  <Link href={`/services?category=${encodeURIComponent(category)}`} className="text-xs font-semibold text-gold-dark">Explore category →</Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => <ServiceCard key={service._id || service.slug} service={service} />)}
                </div>
              </div>
            );
          })}
          {!allServices.length && <p className="mt-8 rounded-lg border border-silver bg-white p-6 text-sm text-navy/70">Service information is being updated. Contact FileFast for assistance.</p>}
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="container-page py-16 sm:py-20">
        <p className="eyebrow text-center">Service Categories</p>
        <h2 className="mt-2 text-center font-display text-3xl font-semibold text-navy">
          Explore Our Tax and Business Compliance Services
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/services?category=${encodeURIComponent(cat)}`}
              className="rounded-sm border border-silver/70 px-5 py-6 text-center text-sm font-semibold text-navy transition hover:border-gold hover:text-gold-dark"
            >
              {cat}
            </Link>
          ))}
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
