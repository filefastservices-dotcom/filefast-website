export const dynamic = "force-dynamic";

import Link from "next/link";
import TestimonialCard from "@/components/TestimonialCard";
import { getTestimonials } from "@/lib/data";
import { googleReviewUrl } from "@/lib/googleReviews";

export const metadata = {
  openGraph: {
    url: "https://www.filefastglobal.com/testimonials",
    title: "Client Testimonials & Google Review Highlights | FileFast Global",
    description: "Read selected public Google review excerpts and published client testimonials for FileFast Global.",
  },
  alternates: { canonical: "/testimonials" },
  title: "Client Testimonials & Google Review Highlights",
  description: "Read selected public Google review excerpts and published client testimonials for FileFast Global."
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const googleCount = testimonials.filter((item) => item.source === "Google").length;
  const clientCount = testimonials.length - googleCount;

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Client Testimonials</p>
      <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">
        Client Feedback & Google Review Highlights
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-navy/70">
        Browse the feedback currently published by FileFast, including selected public Google review excerpts. This page is not a complete archive of every review on Google. Visit our Google listing for the full and latest review history.
      </p>

      <div className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-3">
        <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
          Read all Google reviews ↗
        </a>
        <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-navy-outline">
          Write a Google review ↗
        </a>
      </div>

      <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 text-center">
        <div className="border border-silver/70 p-4">
          <p className="font-display text-2xl font-semibold text-navy">{googleCount}</p>
          <p className="mt-1 text-xs text-navy/60">Selected Google excerpts</p>
        </div>
        <div className="border border-silver/70 p-4">
          <p className="font-display text-2xl font-semibold text-navy">{clientCount}</p>
          <p className="mt-1 text-xs text-navy/60">Published client testimonials</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.length > 0 ? (
          testimonials.map((t) => <TestimonialCard key={t._id} testimonial={t} />)
        ) : (
          <p className="col-span-full text-center text-sm text-navy/60">
            No client testimonials have been published yet. Visit Google to read public feedback or contact FileFast.
          </p>
        )}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-6 text-navy/55">
        Google review excerpts are attributed and link to the original listing. The full review content and current review count are maintained by Google.
      </p>
      <div className="mt-8 text-center">
        <Link href="/contact" className="btn-navy-outline">Contact FileFast</Link>
      </div>
    </section>
  );
}
