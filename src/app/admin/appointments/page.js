"use client";

import { useEffect, useState } from "react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  async function load(s = "") {
    setLoading(true);
    const query = s ? `?status=${s}` : "";
    const res = await fetch(`/api/appointments${query}`);
    const data = await res.json();
    setAppointments(data.appointments || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function handleStatusChange(s) {
    setStatus(s);
    load(s);
  }

  async function updateStatus(id, newStatus) {
    await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    load(status);
  }

  async function deleteAppointment(id) {
    if (!confirm("Delete this appointment?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    load(status);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl font-semibold text-navy">Appointments</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleStatusChange("")}
          className={`rounded-sm px-3 py-2 text-xs font-semibold ${
            !status ? "bg-gold/10 text-gold-dark" : "border border-silver/70 text-navy/70"
          }`}
        >
          All
        </button>
        {["pending", "confirmed", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            className={`rounded-sm px-3 py-2 text-xs font-semibold capitalize ${
              status === s ? "bg-gold/10 text-gold-dark" : "border border-silver/70 text-navy/70"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-navy/60">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt._id} className="border-b border-silver/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{apt.clientName}</td>
                  <td className="px-4 py-3 text-navy/70">
                    <a href={`tel:${apt.clientPhone}`} className="hover:text-gold-dark">
                      {apt.clientPhone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-navy/70">{apt.serviceRequired}</td>
                  <td className="px-4 py-3 text-navy/70">
                    {new Date(apt.preferredDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={apt.status}
                      onChange={(e) => updateStatus(apt._id, e.target.value)}
                      className="rounded-sm border border-silver/70 px-2 py-1 text-xs font-semibold"
                    >
                      {["pending", "confirmed", "completed", "cancelled"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteAppointment(apt._id)}
                      className="text-xs font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-navy/60">
                    No appointments found.
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
