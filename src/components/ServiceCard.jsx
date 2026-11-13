import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-sm border border-silver/70 bg-white p-6 transition hover:-translate-y-0.5 hover:border-gold hover:shadow-lg hover:shadow-navy/5"
    >
      <p className="eyebrow">{service.category}</p>
      <h3 className="mt-2 font-display text-lg font-semibold text-navy group-hover:text-gold-dark">
        {service.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-navy/70">
        {service.shortDescription}
      </p>
      {service.offerPrice ? (
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-navy">From ₹{Number(service.offerPrice).toLocaleString("en-IN")}</span>
          {service.regularPrice ? <span className="text-xs text-navy/45 line-through">₹{Number(service.regularPrice).toLocaleString("en-IN")}</span> : null}
        </div>
      ) : <p className="mt-4 text-sm font-semibold text-navy">Custom quotation</p>}
      <span className="mt-2 inline-block text-sm font-semibold text-gold-dark">
        View scope & pricing →
      </span>
    </Link>
  );
}
