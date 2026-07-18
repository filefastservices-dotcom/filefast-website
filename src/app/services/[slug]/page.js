import { notFound } from "next/navigation";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import ServiceCard from "@/components/ServiceCard";
import { getServiceBySlug, getServices } from "@/lib/data";

export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.metaTitle || service.name,
    description: service.metaDescription || service.shortDescription,
    keywords: service.seoKeywords || undefined,
    openGraph: {
      title: service.metaTitle || service.name,
      description: service.metaDescription || service.shortDescription,
      images: service.ogImage ? [service.ogImage] : undefined
    }
  };
}

function Section({ eyebrow, title, children }) {
  return (
    <div className="border-t border-silver/60 py-10 first:border-t-0 first:pt-0">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h2 className="mt-2 font-display text-2xl font-semibold text-navy">{title}</h2>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default async function ServiceDetailPage({ params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  let relatedServices = [];
  if (service.relatedServiceSlugs?.length) {
    const all = await getServices({});
    relatedServices = all.filter((s) => service.relatedServiceSlugs.includes(s.slug));
  }

  const whatsappMsg = `Hi FileFast, I'm interested in ${service.name}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-14 text-white sm:py-20">
        <div className="container-page">
          <p className="eyebrow text-gold">{service.category}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{service.name}</h1>
          <p className="mt-4 max-w-2xl text-silver/90">{service.shortDescription}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/919444614182?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              WhatsApp Now
            </a>
            <a href="tel:+919444614182" className="btn-outline">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-3 lg:py-16">
        {/* Main content */}
        <div className="lg:col-span-2">
          {service.fullDescription && (
            <Section eyebrow="Overview" title="Service Overview">
              <p className="whitespace-pre-line text-sm leading-relaxed text-navy/80">
                {service.fullDescription}
              </p>
            </Section>
          )}

          {service.benefits?.length > 0 && (
            <Section eyebrow="Benefits" title="Why You Need This">
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-navy/80">
                    <span className="text-gold-dark">✓</span> {b}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {service.eligibility?.length > 0 && (
            <Section eyebrow="Eligibility" title="Who Can Apply">
              <ul className="space-y-2">
                {service.eligibility.map((e, i) => (
                  <li key={i} className="flex gap-2 text-sm text-navy/80">
                    <span className="text-gold-dark">•</span> {e}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {service.requiredDocuments?.length > 0 && (
            <Section eyebrow="Documents" title="Required Documents">
              <ul className="grid gap-2 sm:grid-cols-2">
                {service.requiredDocuments.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm text-navy/80">
                    <span className="text-gold-dark">•</span> {d}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {service.processFlow?.length > 0 && (
            <Section eyebrow="Process" title="How It Works">
              <ol className="space-y-5">
                {service.processFlow.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-xl font-semibold text-gold-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-navy">{step.title}</p>
                      {step.description && (
                        <p className="mt-1 text-sm text-navy/70">{step.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          <Section eyebrow="Pricing" title="Pricing">
            <p className="text-sm text-navy/80">{service.pricingInfo}</p>
          </Section>

          {service.faqs?.length > 0 && (
            <Section eyebrow="FAQs" title="Frequently Asked Questions">
              <div className="space-y-3">
                {service.faqs.map((f, i) => (
                  <details key={i} className="rounded-sm border border-silver/70 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-navy">
                      {f.question}
                    </summary>
                    <p className="mt-2 text-sm text-navy/70">{f.answer}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}

          {relatedServices.length > 0 && (
            <Section eyebrow="Related" title="Related Services">
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedServices.map((s) => (
                  <ServiceCard key={s._id} service={s} />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sticky lead form sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-sm border border-silver/70 bg-white p-6">
            <p className="font-display text-lg font-semibold text-navy">Request This Service</p>
            <p className="mt-1 text-sm text-navy/60">We'll respond within one business day.</p>
            <div className="mt-5">
              <LeadForm defaultService={service.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
