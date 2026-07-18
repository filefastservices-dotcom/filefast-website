import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import ServiceForm from "@/components/admin/ServiceForm";

async function getService(id) {
  try {
    await connectDB();
    const service = await Service.findById(id).lean();
    return service ? JSON.parse(JSON.stringify(service)) : null;
  } catch {
    return null;
  }
}

export default async function EditServicePage({ params }) {
  const service = await getService(params.id);
  if (!service) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Edit Service</h1>
      <p className="mt-1 text-sm text-navy/60">{service.name}</p>
      <div className="mt-6">
        <ServiceForm initialService={service} serviceKey={service._id} />
      </div>
    </div>
  );
}
