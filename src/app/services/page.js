import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/data";

export const metadata = {
  openGraph: {
    url: "https://www.filefastglobal.com/services",
    title: "GST, Income Tax, Accounting & Business Compliance Services | FileFast Global",
    description: "Explore GST filing, income tax returns, business registration, licensing, accounting, TDS/TCS and global VAT coordination from FileFast Global in Chennai, India.",
  },
  alternates: { canonical: "/services" },
  title: "GST, Income Tax, Accounting & Business Compliance Services",
  description: "Explore GST filing, income tax returns, business registration, licensing, accounting, TDS/TCS and global VAT coordination from FileFast Global in Chennai, India."
};

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

export default async function ServicesPage({ searchParams }) {
  const activeCategory = searchParams?.category || "";
  const services = await getServices(activeCategory ? { category: activeCategory } : {});
  const siteUrl = "https://www.filefastglobal.com";
  const directorySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/services#webpage`,
        name: activeCategory || "Tax, Accounting & Compliance Services",
        url: `${siteUrl}/services`,
        description: "Browse FileFast Global tax, accounting, business registration and compliance services.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${siteUrl}/services#service-list` }
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/services#service-list`,
        name: activeCategory || "FileFast Global Services",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: `${siteUrl}/services/${encodeURIComponent(service.slug)}`
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` }
        ]
      }
    ]
  };
  const serializedSchema = JSON.stringify(directorySchema).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedSchema }} />
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow">Our Services</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
        {activeCategory || "All Services"}
      </h1>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-navy/70">Choose a service category to explore the support available for individuals, startups, online sellers and established businesses. FileFast provides India-focused tax and compliance services from Chennai, with cross-border VAT coordination for eligible business requirements.</p>

      <h2 className="mt-8 font-display text-xl font-semibold text-navy">Browse services by category</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="/services"
          className={`rounded-sm border px-4 py-2 text-xs font-semibold ${
            !activeCategory ? "border-gold bg-gold/10 text-gold-dark" : "border-silver-dark/40 text-navy/70"
          }`}
        >
          All
        </a>
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`/services?category=${encodeURIComponent(cat)}`}
            className={`rounded-sm border px-4 py-2 text-xs font-semibold ${
              activeCategory === cat
                ? "border-gold bg-gold/10 text-gold-dark"
                : "border-silver-dark/40 text-navy/70"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.length > 0 ? (
          services.map((s) => <ServiceCard key={s._id} service={s} />)
        ) : (
          <p className="col-span-full text-sm text-navy/60">
            No services found in this category yet.
          </p>
        )}
      </div>
    </section>
    </>
  );
}
