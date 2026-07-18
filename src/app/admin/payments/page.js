"use client";

import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/payments?admin=true");
    const data = await res.json();
    setPayments(data.payments || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const totalRevenue = payments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl font-semibold text-navy">Payments</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border border-silver/70 bg-white p-4">
          <p className="text-sm text-navy/60">Total Revenue</p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="rounded-sm border border-silver/70 bg-white p-4">
          <p className="text-sm text-navy/60">Successful Payments</p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {payments.filter((p) => p.status === "success").length}
          </p>
        </div>
        <div className="rounded-sm border border-silver/70 bg-white p-4">
          <p className="text-sm text-navy/60">Pending Payments</p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {payments.filter((p) => p.status === "pending").length}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-navy/60">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-b border-silver/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{p.clientName}</td>
                  <td className="px-4 py-3 text-navy/70">{p.service}</td>
                  <td className="px-4 py-3 text-navy/70">₹{p.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-sm px-2 py-1 text-xs font-semibold ${
                        p.status === "success"
                          ? "bg-green-100 text-green-700"
                          : p.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-navy/70">
                    {new Date(p.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-navy/60">
                    No payments yet.
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
