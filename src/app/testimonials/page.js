import TestimonialCard from "@/components/TestimonialCard";
import { getTestimonials } from "@/lib/data";

export const metadata = {
  title: "Verified Client Reviews | FileFast",
  description: "Read public Google reviews from FileFast clients for GST, tax filing and business compliance support."
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Testimonials</p>
      <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">
        Trusted by Clients, Reviewed Publicly
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-navy/70">
        These testimonials are public Google reviews, displayed with reviewer attribution. We never create or publish invented client feedback.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.length > 0 ? (
          testimonials.map((t) => <TestimonialCard key={t._id} testimonial={t} />)
        ) : (
          <p className="col-span-full text-center text-sm text-navy/60">
            Testimonials will appear here once added from the admin dashboard.
          </p>
        )}
      </div>
    </section>
  );
}
