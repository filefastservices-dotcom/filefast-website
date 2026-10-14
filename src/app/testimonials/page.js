import TestimonialCard from "@/components/TestimonialCard";
import { getTestimonials } from "@/lib/data";

export const metadata = {
  openGraph: {
    url: "https://www.filefastglobal.com/testimonials",
    title: "Client Testimonials | FileFast Global",
    description: "Read published client testimonials about FileFast tax filing, GST and business compliance support.",
  },
  alternates: { canonical: "/testimonials" },
  title: "Client Testimonials",
  description: "Read published client testimonials about FileFast tax filing, GST and business compliance support."
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Client Testimonials</p>
      <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">
        Client Feedback
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-navy/70">
        We display testimonials that have been published by FileFast. Each service engagement is different, so contact us to discuss your specific requirements and scope.
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
