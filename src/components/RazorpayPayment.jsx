"use client";

import { useState } from "react";

export default function RazorpayPayment({ serviceList }) {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    service: serviceList[0] || "",
    amount: ""
  });
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePayment(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Create payment record
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.payment?._id) {
        throw new Error(data.error || "Unable to create the payment request");
      }

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: form.amount * 100, // Convert to paise
          currency: "INR",
          name: "FileFast",
          description: form.service,
          prefill: {
            name: form.clientName,
            email: form.clientEmail,
            contact: form.clientPhone
          },
          handler: (response) => {
            // The server must verify the payment signature before marking a
            // payment successful. The record therefore remains pending.
            window.location.assign(
              `/payment-success?payment_id=${encodeURIComponent(response.razorpay_payment_id)}`
            );
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
            }
          }
        };

        if (!window.Razorpay) {
          setLoading(false);
          return;
        }
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      script.onerror = () => setLoading(false);
      document.body.appendChild(script);
    } catch (err) {
      console.error("Payment error:", err);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handlePayment} className="max-w-2xl space-y-4 rounded-sm border border-silver/70 bg-white p-6">
      <p className="font-display text-lg font-semibold text-navy">Online Payment</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Your Name"
          value={form.clientName}
          onChange={(e) => update("clientName", e.target.value)}
          className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={form.clientEmail}
          onChange={(e) => update("clientEmail", e.target.value)}
          className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
      </div>

      <input
        required
        placeholder="Phone Number"
        value={form.clientPhone}
        onChange={(e) => update("clientPhone", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />

      <select
        value={form.service}
        onChange={(e) => update("service", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      >
        {serviceList.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input
        required
        type="number"
        placeholder="Amount (₹)"
        value={form.amount}
        onChange={(e) => update("amount", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />

      <button type="submit" disabled={loading} className="btn-gold w-full">
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </form>
  );
}
