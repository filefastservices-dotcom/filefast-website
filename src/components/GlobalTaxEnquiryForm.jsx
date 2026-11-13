"use client";

import { useState } from "react";

const countries = ["United Kingdom", "European Union", "United Arab Emirates", "United States", "Other country"];
const channels = ["Amazon / marketplace", "Own website / Shopify", "Wholesale / B2B", "Physical store", "Services / digital products", "Multiple channels"];
const helpOptions = ["VAT / sales-tax registration", "VAT / sales-tax return filing", "OSS / IOSS", "Nexus / taxability assessment", "Ongoing accounting and compliance", "Market-entry planning", "Not sure — assess my requirements"];
const inputClass = "w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";
const labelClass = "mb-2 block text-sm font-semibold text-navy";

export default function GlobalTaxEnquiryForm() {
  const [step, setStep] = useState(1);
  const [countriesSelected, setCountriesSelected] = useState([]);
  const [channelsSelected, setChannelsSelected] = useState([]);
  const [helpSelected, setHelpSelected] = useState([]);
  const [details, setDetails] = useState({ businessCountry: "", entityType: "Company / LLP", productType: "Physical goods", stockLocations: "", salesVolume: "Not sure", name: "", mobile: "", email: "", consent: false });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(field, value) { setDetails((current) => ({ ...current, [field]: value })); }
  function toggle(list, setList, value) { setList((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (countriesSelected.length === 0 || helpSelected.length === 0) { setError("Select at least one target market and one service requirement."); setStep(1); return; }
    if (channelsSelected.length === 0) { setError("Select at least one sales channel."); setStep(2); return; }
    setStatus("sending");
    const message = [
      "GLOBAL TAX ENQUIRY",
      "Target markets: " + countriesSelected.join(", "),
      "Business established in: " + details.businessCountry,
      "Entity type: " + details.entityType,
      "Products/services: " + details.productType,
      "Sales channels: " + channelsSelected.join(", "),
      "Inventory / stock locations: " + (details.stockLocations || "Not specified"),
      "Estimated annual cross-border sales: " + details.salesVolume,
      "Required support: " + helpSelected.join(", "),
      "Consent: " + (details.consent ? "Given" : "Not given")
    ].join("\n").slice(0, 1900);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: details.name, mobile: details.mobile, email: details.email, serviceInterested: "Global Tax & VAT Enquiry", message, source: "global-tax-quote-calculator" })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not submit your enquiry.");
      setStatus("success");
    } catch (err) {
      setError(err.message || "Please try again or contact us on WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success") {
    const text = encodeURIComponent("Hello FileFast Global, I submitted a Global Tax & VAT enquiry. Please contact me to discuss the countries and services selected.");
    return <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-7 text-center"><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Enquiry received</p><h2 className="mt-3 font-display text-2xl font-semibold text-navy">Thank you, {details.name}.</h2><p className="mt-3 text-sm leading-6 text-navy/70">Your requirements have been sent to FileFast Global. Our team will review the details and contact you about the appropriate scope and quotation.</p><a className="mt-5 inline-flex rounded-md bg-[#e8c77c] px-5 py-3 text-sm font-bold text-navy" href={`https://wa.me/919444614182?text=${text}`} target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a></div>;
  }

  const progress = step === 1 ? "Market & business" : step === 2 ? "Sales & service" : "Contact details";
  return <form onSubmit={submit} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
    <div className="border-b border-slate-200 bg-slate-50 p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold uppercase tracking-widest text-gold-dark">Step {step} of 3</p><p className="text-xs font-medium text-slate-500">{progress}</p></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-[#c99c42] transition-all" style={{ width: `${step * 33.333}%` }} /></div>
    </div>
    <div className="p-5 sm:p-8">
      {step === 1 && <section aria-labelledby="global-step-one"><h2 id="global-step-one" className="font-display text-xl font-semibold text-navy">Where do you operate?</h2><p className="mt-2 text-sm text-slate-600">Select the countries or regions where you sell, hold stock or plan to expand.</p>
        <fieldset className="mt-6"><legend className={labelClass}>Target markets <span className="text-red-600">*</span></legend><div className="grid gap-3 sm:grid-cols-2">{countries.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm hover:border-gold"><input type="checkbox" checked={countriesSelected.includes(item)} onChange={() => toggle(countriesSelected, setCountriesSelected, item)} className="h-4 w-4 accent-[#b68a36]" />{item}</label>)}</div></fieldset>
        <div className="mt-6"><label className={labelClass} htmlFor="businessCountry">Where is your business legally established?</label><input id="businessCountry" className={inputClass} value={details.businessCountry} onChange={(e) => update("businessCountry", e.target.value)} placeholder="e.g. India" /></div>
        <div className="mt-5"><label className={labelClass} htmlFor="entityType">Business structure</label><select id="entityType" className={inputClass} value={details.entityType} onChange={(e) => update("entityType", e.target.value)}><option>Company / LLP</option><option>Individual / Sole proprietor</option><option>Partnership</option><option>Startup</option><option>Other / not yet established</option></select></div>
      </section>}
      {step === 2 && <section aria-labelledby="global-step-two"><h2 id="global-step-two" className="font-display text-xl font-semibold text-navy">How does your business sell?</h2><p className="mt-2 text-sm text-slate-600">These details help us identify which tax registrations or returns may need review.</p>
        <div className="mt-6"><label className={labelClass} htmlFor="productType">What do you sell?</label><select id="productType" className={inputClass} value={details.productType} onChange={(e) => update("productType", e.target.value)}><option>Physical goods</option><option>Digital products / software</option><option>Professional or other services</option><option>Both goods and services</option></select></div>
        <fieldset className="mt-6"><legend className={labelClass}>Sales channels <span className="text-red-600">*</span></legend><div className="grid gap-3 sm:grid-cols-2">{channels.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm hover:border-gold"><input type="checkbox" checked={channelsSelected.includes(item)} onChange={() => toggle(channelsSelected, setChannelsSelected, item)} className="h-4 w-4 accent-[#b68a36]" />{item}</label>)}</div></fieldset>
        <div className="mt-6"><label className={labelClass} htmlFor="stockLocations">Where is your inventory / stock stored? (if applicable)</label><input id="stockLocations" className={inputClass} value={details.stockLocations} onChange={(e) => update("stockLocations", e.target.value)} placeholder="e.g. India, Germany, UK fulfilment centre" /></div>
        <div className="mt-5"><label className={labelClass} htmlFor="salesVolume">Estimated annual cross-border sales</label><select id="salesVolume" className={inputClass} value={details.salesVolume} onChange={(e) => update("salesVolume", e.target.value)}><option>Not sure</option><option>Below €10,000 / equivalent</option><option>€10,000–€100,000 / equivalent</option><option>€100,000–€1 million / equivalent</option><option>Above €1 million / equivalent</option></select></div>
        <fieldset className="mt-6"><legend className={labelClass}>What support do you need? <span className="text-red-600">*</span></legend><div className="grid gap-3 sm:grid-cols-2">{helpOptions.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm hover:border-gold"><input type="checkbox" checked={helpSelected.includes(item)} onChange={() => toggle(helpSelected, setHelpSelected, item)} className="h-4 w-4 accent-[#b68a36]" />{item}</label>)}</div></fieldset>
      </section>}
      {step === 3 && <section aria-labelledby="global-step-three"><h2 id="global-step-three" className="font-display text-xl font-semibold text-navy">Where should we send your assessment?</h2><p className="mt-2 text-sm text-slate-600">Only your contact details are needed to respond. Do not share tax portal passwords, OTPs or bank credentials.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2"><div><label className={labelClass} htmlFor="leadName">Your name <span className="text-red-600">*</span></label><input id="leadName" autoComplete="name" required minLength={2} maxLength={100} className={inputClass} value={details.name} onChange={(e) => update("name", e.target.value)} /></div><div><label className={labelClass} htmlFor="leadMobile">Phone / WhatsApp <span className="text-red-600">*</span></label><input id="leadMobile" type="tel" autoComplete="tel" required minLength={7} maxLength={30} className={inputClass} value={details.mobile} onChange={(e) => update("mobile", e.target.value)} /></div></div>
        <div className="mt-5"><label className={labelClass} htmlFor="leadEmail">Business email <span className="text-red-600">*</span></label><input id="leadEmail" type="email" autoComplete="email" required maxLength={254} className={inputClass} value={details.email} onChange={(e) => update("email", e.target.value)} /></div>
        <label className="mt-6 flex items-start gap-3 text-xs leading-5 text-slate-600"><input type="checkbox" required checked={details.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[#b68a36]" /><span>I agree that FileFast Global may use these details to respond to my enquiry. See the <a className="underline" href="/privacy-policy">Privacy Policy</a>.</span></label>
        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">This is an initial enquiry, not a tax determination or instant binding quote. Final scope depends on country rules, transaction data and local specialist requirements.</p>
      </section>}
      {error && <p role="alert" className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row">
        {step > 1 ? <button type="button" onClick={() => { setError(""); setStep((value) => value - 1); }} className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-navy">Back</button> : <span />}
        {step < 3 ? <button type="button" onClick={() => { setError(""); if (step === 1 && countriesSelected.length === 0) { setError("Select at least one target market to continue."); return; } if (step === 2 && (channelsSelected.length === 0 || helpSelected.length === 0)) { setError("Select at least one sales channel and one support requirement."); return; } setStep((value) => value + 1); }} className="rounded-md bg-[#e8c77c] px-6 py-3 text-sm font-bold text-navy hover:bg-[#f1d99f]">Continue to next step →</button> : <button type="submit" disabled={status === "sending"} className="rounded-md bg-[#e8c77c] px-6 py-3 text-sm font-bold text-navy disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Sending enquiry…" : "Submit my enquiry"}</button>}
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">No obligation. We review your requirements before confirming a quotation.</p>
    </div>
  </form>;
}
