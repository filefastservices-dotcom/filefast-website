import TestimonialCard from "@/components/TestimonialCard";
import { getTestimonials } from "@/lib/data";

export const metadata = {
  title: "Client Testimonials",
  description: "See what FileFast clients say about our GST, Income Tax and Business Registration services."
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Testimonials</p>
      <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">
        What Our Clients Say
      </h1>

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
