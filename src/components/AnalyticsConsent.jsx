"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "filefast_analytics_consent_v1";

function updateGoogleConsent(granted) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
}

export function trackLeadGenerated(service) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    if (window.localStorage.getItem(CONSENT_KEY) !== "accepted") return;
    window.gtag("event", "generate_lead", {
      currency: "INR",
      service_category: String(service || "unspecified").slice(0, 100),
      lead_source: "website_form"
    });
  } catch {
    // Analytics must never block a successful enquiry.
  }
}

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = window.localStorage.getItem(CONSENT_KEY);
      updateGoogleConsent(choice === "accepted");
      if (!choice) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(granted) {
    try {
      window.localStorage.setItem(CONSENT_KEY, granted ? "accepted" : "rejected");
    } catch {
      // If storage is unavailable, keep analytics disabled.
      granted = false;
    }
    updateGoogleConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside aria-label="Analytics preferences" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-lg border border-silver-dark/30 bg-white p-4 shadow-2xl sm:inset-x-6 sm:bottom-5 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="font-semibold text-navy">Your privacy choices</p>
          <p className="mt-1 text-xs leading-5 text-navy/70">FileFast uses optional Google Analytics to understand website visits and improve its services. Analytics remains off unless you allow it. Your enquiry can be submitted without accepting analytics.</p>
          <a href="/privacy-policy" className="mt-1 inline-block text-xs font-semibold text-gold-dark underline underline-offset-2">Read the Privacy Policy</a>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => choose(false)} className="rounded border border-silver-dark/40 px-3 py-2 text-xs font-semibold text-navy">Reject analytics</button>
          <button type="button" onClick={() => choose(true)} className="rounded bg-navy px-3 py-2 text-xs font-semibold text-white">Accept analytics</button>
        </div>
      </div>
    </aside>
  );
}
