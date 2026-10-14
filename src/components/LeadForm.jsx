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
  const [submitError, setSubmitError] = useState("");
  const contactMessage = encodeURIComponent(
    `Hello FileFast, I would like a consultation.\n\nName: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email}\nService: ${form.serviceInterested || "Not specified"}\nMessage: ${form.message || "Not specified"}`
  );

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setStatus("sending");
    try {
      const honeypot = new FormData(e.currentTarget).get("website") || "";
      const params = new URLSearchParams(window.location.search);
      const campaign = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
        .map((key) => [key, params.get(key)])
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${value}`);
      let source = campaign.length ? campaign.join(" | ") : "direct / website";
      if (!campaign.length && document.referrer) {
        try { source = new URL(document.referrer).hostname || source; } catch {}
      }
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot, source })
      });
      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.error || "We could not send your request.");
      }
      setStatus("success");
    } catch (error) {
      setSubmitError(error.message || "Please try again or contact us on WhatsApp.");
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
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Your Name"
          aria-label="Your name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
        <input
          required
          placeholder="Mobile Number"
          aria-label="Mobile number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.mobile}
          onChange={(e) => update("mobile", e.target.value)}
          className="rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
      </div>
      <input
        type="email"
        required
        placeholder="Email Address"
        aria-label="Email address"
        autoComplete="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      <select
        aria-label="Service you need"
        required
        value={form.serviceInterested}
        onChange={(e) => update("serviceInterested", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
      >
        <option value="">Select the service you need</option>
        {form.serviceInterested &&
          ![
            "GST registration or return filing",
            "Income tax / ITR filing",
            "Business registration or licence",
            "Accounting & compliance",
            "Global tax coordination",
            "Other / not sure"
          ].includes(form.serviceInterested) && (
            <option value={form.serviceInterested}>{form.serviceInterested}</option>
          )}
        <option>GST registration or return filing</option>
        <option>Income tax / ITR filing</option>
        <option>Business registration or licence</option>
        <option>Accounting & compliance</option>
        <option>Global tax coordination</option>
        <option>Other / not sure</option>
      </select>
      <textarea
        placeholder="Message"
        aria-label="Message"
        rows={4}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      <p className="text-xs leading-5 text-navy/60">By submitting, you agree that FileFast may use these details to respond to your enquiry. Please do not send passwords, OTPs or sensitive account credentials. See our <a className="underline underline-offset-2" href="/privacy-policy">Privacy Policy</a>.</p>
      <button type="submit" disabled={status === "sending"} className="btn-gold w-full sm:w-auto">
        {status === "sending" ? "Sending..." : "Request a consultation"}
      </button>
      {status === "error" && (
        <div className="text-sm text-red-600">
          {submitError || "Something went wrong."} <a className="font-semibold underline" href={`https://wa.me/919444614182?text=${contactMessage}`}>Send your request on WhatsApp instead.</a>
        </div>
      )}
    </form>
  );
}
