"use client";

import { useState } from "react";

export default function LeadForm({ defaultService = "" }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    serviceInterested: defaultService,
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", mobile: "", email: "", serviceInterested: defaultService, message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-gold/40 bg-gold/10 p-6 text-center">
        <p className="font-display text-lg font-semibold text-navy">Thank you, {form.name || "there"}!</p>
        <p className="mt-1 text-sm text-navy/70">
          We've received your request and our team will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
        <input
          required
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={(e) => update("mobile", e.target.value)}
          className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
      </div>
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      <input
        placeholder="Service Required"
        value={form.serviceInterested}
        onChange={(e) => update("serviceInterested", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      <textarea
        placeholder="Message"
        rows={4}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      <button type="submit" disabled={status === "sending"} className="btn-gold w-full sm:w-auto">
        {status === "sending" ? "Sending..." : "Get Free Consultation"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or WhatsApp us.</p>
      )}
    </form>
  );
}
