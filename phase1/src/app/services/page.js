import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/data";

export const metadata = {
  title: "All Services",
  description: "Browse all GST, Income Tax, Registration, Compliance and Accounting services offered by FileFast."
};

const CATEGORIES = [
  "GST Services",
  "Income Tax Services",
  "Business Registration",
  "Licenses",
  "Compliance Services",
  "Accounting Services",
  "Digital Business Services"
];

export default async function ServicesPage({ searchParams }) {
  const activeCategory = searchParams?.category || "";
  const services = await getServices(activeCategory ? { category: activeCategory } : {});

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow">Our Services</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
        {activeCategory || "All Services"}
      </h1>

      <div className="mt-6 flex flex-wrap gap-2">
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
  );
}
