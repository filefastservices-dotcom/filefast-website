export default function TestimonialCard({ testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-sm border border-silver/70 bg-white p-6">
      <div className="flex gap-1 text-gold" aria-hidden="true">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/80">
        “{testimonial.quote}”
      </p>
      <div className="mt-5 border-t border-silver/60 pt-4">
        <p className="text-sm font-semibold text-navy">{testimonial.clientName}</p>
        <p className="text-xs text-navy/60">
          {testimonial.clientRole}
          {testimonial.serviceUsed ? ` · ${testimonial.serviceUsed}` : ""}
        </p>
      </div>
    </div>
  );
}
