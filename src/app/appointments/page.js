"use client";

import { useState } from "react";

export default function AppointmentBookingPage() {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceRequired: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        serviceRequired: "",
        preferredDate: "",
        preferredTime: "",
        notes: ""
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-sm border border-gold/40 bg-gold/10 p-8 text-center">
          <p className="font-display text-lg font-semibold text-navy">Appointment Booked!</p>
          <p className="mt-2 text-sm text-navy/70">
            Thank you! We've received your appointment request. Our team will contact you soon to confirm.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow text-center">Schedule a Meeting</p>
        <h1 className="mt-2 text-center font-display text-3xl font-semibold text-navy">
          Book Your Free Consultation
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
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
              placeholder="Email Address"
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

          <input
            required
            placeholder="Service Required"
            value={form.serviceRequired}
            onChange={(e) => update("serviceRequired", e.target.value)}
            className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
            <input
              type="time"
              value={form.preferredTime}
              onChange={(e) => update("preferredTime", e.target.value)}
              className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <textarea
            placeholder="Additional Notes (optional)"
            rows={4}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />

          <button type="submit" disabled={status === "sending"} className="btn-gold w-full">
            {status === "sending" ? "Booking..." : "Book Appointment"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
