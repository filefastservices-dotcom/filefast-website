import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Add New Testimonial</h1>
      <p className="mt-1 text-sm text-navy/60">Share what your client said about your service</p>
      <div className="mt-6">
        <TestimonialForm />
      </div>
    </div>
  );
}
