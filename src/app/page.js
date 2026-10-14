import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import LeadForm from "@/components/LeadForm";
import { getServices, getTestimonials } from "@/lib/data";

export const metadata = {
  title: "GST Registration & Tax Compliance in Chennai | FileFast Global",
  description: "Get support with GST registration, document checks, GST returns and business compliance from Chennai, serving businesses across India.",
  openGraph: {
    url: "https://www.filefastglobal.com/",
    title: "GST Registration & Tax Compliance in Chennai | FileFast Global",
    description: "Practical support for GST registration, document checks, GST returns and ongoing business compliance across India.",
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
  const [featuredServices, testimonials] = await Promise.all([
    getServices({ featured: true }),
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
              GST registration & business compliance
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.65rem]">
              GST Registration Support for Startups &amp; SMEs
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-navy/75 sm:text-lg sm:leading-8">
              Get help with document checks, application preparation and GST portal submission from Chennai-based compliance support.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-navy/65 sm:text-base">
              Share your requirements to receive a relevant document checklist and clear next steps. Registration timelines depend on document completeness and GST department processing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#consultation" className="hero-primary-cta" data-track="cta-start">
                Get GST Registration Help <span aria-hidden="true">→</span>
              </a>
              <Link href="/services/gst-registration" className="hero-secondary-cta" data-track="cta-learn">
                How It Works
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
                    <p className="text-sm font-semibold text-navy">GST registration checklist</p>
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

      {/* FEATURED SERVICES (dynamic) */}
      <section className="bg-silver-light py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Featured Services</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy">
                GST, ITR, Business and Global Tax Services
              </h2>
            </div>
            <Link href="/services" className="hidden text-sm font-semibold text-gold-dark sm:block">
              View All Services →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.length > 0 ? (
              featuredServices.map((s) => <ServiceCard key={s._id} service={s} />)
            ) : (
              <p className="col-span-full text-sm text-navy/60">
                No services published yet — add some from the admin dashboard.
              </p>
            )}
          </div>
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

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="bg-navy py-16 text-white sm:py-20">
          <div className="container-page">
            <p className="eyebrow text-gold">Client Testimonials</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">What Our Clients Say</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 6).map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

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
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
