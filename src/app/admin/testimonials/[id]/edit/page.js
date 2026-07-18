import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import TestimonialForm from "@/components/admin/TestimonialForm";

async function getTestimonial(id) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findById(id).lean();
    return testimonial ? JSON.parse(JSON.stringify(testimonial)) : null;
  } catch {
    return null;
  }
}

export default async function EditTestimonialPage({ params }) {
  const testimonial = await getTestimonial(params.id);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Edit Testimonial</h1>
      <p className="mt-1 text-sm text-navy/60">{testimonial.clientName}</p>
      <div className="mt-6">
        <TestimonialForm initialTestimonial={testimonial} testimonialId={testimonial._id} />
      </div>
    </div>
  );
}
