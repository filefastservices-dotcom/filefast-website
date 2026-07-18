import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Add New Service</h1>
      <p className="mt-1 text-sm text-navy/60">
        This creates a new page automatically at /services/your-slug
      </p>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}
