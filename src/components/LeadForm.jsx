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
  const contactMessage = encodeURIComponent(
    `Hello FileFast, I would like a consultation.\n\nName: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email}\nService: ${form.serviceInterested || "Not specified"}\nMessage: ${form.message || "Not specified"}`
  );

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
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-gold/40 bg-gold/10 p-6 text-center">
        <p className="font-display text-lg font-semibold text-navy">Thank you, {form.name || "there"}!</p>
        <p className="mt-1 text-sm text-navy/70">
          We've received your request. For the fastest response, send the same details directly to our team.
        </p>
        <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
          <a className="btn-gold" href={`https://wa.me/919444614182?text=${contactMessage}`}>Send on WhatsApp</a>
          <a className="btn-outline" href={`mailto:filefast.services@gmail.com?subject=${encodeURIComponent("FileFast consultation request")}&body=${contactMessage}`}>Send by email</a>
        </div>
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
        required
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      <select
        required
        value={form.serviceInterested}
        onChange={(e) => update("serviceInterested", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
      >
        <option value="">Select the service you need</option>
        <option>GST registration or return filing</option>
        <option>Income tax / ITR filing</option>
        <option>Business registration or licence</option>
        <option>Accounting & compliance</option>
        <option>Global tax coordination</option>
        <option>Other / not sure</option>
      </select>
      <textarea
        placeholder="Message"
        rows={4}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      <button type="submit" disabled={status === "sending"} className="btn-gold w-full sm:w-auto">
        {status === "sending" ? "Sending..." : "Request a consultation"}
      </button>
      {status === "error" && (
        <div className="text-sm text-red-600">
          Something went wrong. <a className="font-semibold underline" href={`https://wa.me/919444614182?text=${contactMessage}`}>Send your request on WhatsApp instead.</a>
        </div>
      )}
    </form>
  );
}
