"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/services?all=true");
    const data = await res.json();
    setServices(data.services || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function togglePublish(service) {
    await fetch(`/api/services/${service.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !service.isPublished })
    });
    load();
  }

  async function deleteService(service) {
    if (!confirm(`Delete "${service.name}"? This cannot be undone.`)) return;
    await fetch(`/api/services/${service.slug}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy">Services</h1>
        <Link href="/admin/services/new" className="btn-gold text-xs">
          + Add New Service
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-navy/60">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id} className="border-b border-silver/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{s.name}</td>
                  <td className="px-4 py-3 text-navy/70">{s.category}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(s)}
                      className={`rounded-sm px-2 py-1 text-xs font-semibold ${
                        s.isPublished ? "bg-green-100 text-green-700" : "bg-silver text-navy/60"
                      }`}
                    >
                      {s.isPublished ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-navy/70">{s.isFeatured ? "Yes" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/services/${s._id}/edit`}
                      className="mr-3 text-xs font-semibold text-gold-dark"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteService(s)}
                      className="text-xs font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-navy/60">
                    No services yet. Click "Add New Service" to create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
