import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import LeadForm from "@/components/LeadForm";
import { getServices, getTestimonials } from "@/lib/data";

const WHY = [
  { title: "Professional Service", text: "Work handled by experienced tax and compliance professionals." },
  { title: "Reasonable Pricing", text: "Transparent, fair pricing with no hidden charges." },
  { title: "Complete Satisfaction", text: "We stay with you until your filing is fully resolved." },
  { title: "Fast Processing", text: "Streamlined process that respects your deadlines." },
  { title: "Secure Documentation", text: "Your documents are handled with strict confidentiality." },
  { title: "Pan India Service", text: "Serving individuals and businesses across India, online." }
];

const CATEGORIES = [
  "GST Services",
  "Income Tax Services",
  "Business Registration",
  "Licenses",
  "Compliance Services",
  "Accounting Services",
  "Digital Business Services"
];

const FAQS = [
  {
    q: "How long does GST registration take?",
    a: "Typically 3–7 working days once all required documents are submitted correctly."
  },
  {
    q: "Do you serve clients outside Tamil Nadu?",
    a: "Yes, FileFast serves individuals and businesses across India entirely online."
  },
  {
    q: "What documents do I need to get started?",
    a: "This varies by service. Reach out on WhatsApp and we'll send you the exact checklist."
  }
];

export default async function HomePage() {
  const [featuredServices, testimonials] = await Promise.all([
    getServices({ featured: true }),
    getTestimonials()
  ]);

  return (
    <>
      {/* HERO — certificate / official-document motif framed in a gold hairline */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="container-page relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl rounded-sm border border-gold/30 p-8 text-center sm:p-12">
            <p className="eyebrow text-gold">GST · Income Tax · MSME · FSSAI · Compliance</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Tax, Compliance &amp; Business Growth Solutions
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-silver/90">
              Helping businesses and individuals across India with GST, Income Tax,
              Registration, Accounting and Compliance Services.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/919444614182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                WhatsApp Now
              </a>
              <a href="tel:+919444614182" className="btn-outline">
                Call Now
              </a>
              <a href="#consultation" className="btn-outline">
                Get Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-page py-16 sm:py-20">
        <p className="eyebrow text-center">Why Choose FileFast</p>
        <h2 className="mt-2 text-center font-display text-3xl font-semibold text-navy">
          Built On Trust, Run With Precision
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

      {/* FEATURED SERVICES (dynamic) */}
      <section className="bg-silver-light py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Featured Services</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy">
                Popular With Our Clients
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
          Everything Under One Roof
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
              Get Your Free Consultation Today
            </h2>
            <p className="mt-3 text-sm text-navy/70">
              Tell us what you need and our team will get back to you the same day.
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
