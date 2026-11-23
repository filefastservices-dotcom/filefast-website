import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Business Compliance Health Check | FileFast Global",
  description: "Request a practical review of your GST, income tax, registrations, licences, accounting and marketplace compliance requirements. Get a clear next-step checklist from FileFast Global.",
  alternates: { canonical: "/business-compliance-review" },
  openGraph: {
    url: "https://www.filefastglobal.com/business-compliance-review",
    title: "Business Compliance Health Check | FileFast Global",
    description: "Tell us about your business and request a practical compliance review."
  }
};

const reviewAreas = [
  ["GST and indirect tax", "Registration status, return filing, ITC reconciliation, notices and annual-return readiness."],
  ["Income tax and TDS/TCS", "Return preparation, tax-credit reconciliation, withholding records and notice support."],
  ["Business registrations and licences", "MCA, Udyam, FSSAI, IEC, trade licences and trademark process coordination."],
  ["Marketplace and e-commerce", "Seller onboarding, sales and settlement reconciliation, refunds, fees and TCS records."],
  ["Accounting and finance operations", "Bookkeeping, bank reconciliation, month-end close, MIS and cash-flow visibility."],
  ["International tax and VAT", "Initial scoping for UK VAT, EU OSS/IOSS, UAE VAT and US sales-tax coordination."]
];

const steps = [
  ["1. Share your requirement", "Tell us your business type, location and the compliance areas you want reviewed."],
  ["2. We review the scope", "Our team identifies the likely service areas and the records needed for a proper assessment."],
  ["3. Receive clear next steps", "We respond with a practical document checklist and, where appropriate, a written service scope and fee."]
];

export default function BusinessComplianceReviewPage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-[#081b35] text-white">
        <div className="absolute inset-0 opacity-30" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 82% 16%, rgba(214,170,69,.35), transparent 28%), radial-gradient(circle at 8% 90%, rgba(34,104,170,.45), transparent 34%)" }} />
        <div className="container-page relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#e8c77c]">FileFast Global · Business compliance review</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">Know what needs attention in your business compliance.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">One enquiry can help us understand your GST, income-tax, registration, marketplace, accounting or cross-border requirements. Share a few details and request a practical next-step review.</p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs text-white/75">
              {["India GST & ITR", "Business registrations", "E-commerce sellers", "Accounting & MIS", "Global VAT coordination"].map((item) => <span key={item} className="rounded-full border border-white/20 px-3 py-2">{item}</span>)}
            </div>
            <p className="mt-7 text-xs leading-6 text-white/55">This is an initial enquiry, not a tax audit, legal opinion or guarantee of a particular tax outcome.</p>
          </div>
          <div id="request-review" className="rounded-xl border border-white/15 bg-white p-6 text-navy shadow-2xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#9b742b]">Request a review</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Tell us what you need help with</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">We will use these details to respond to this enquiry. Do not submit passwords, OTPs or sensitive account credentials.</p>
            <div className="mt-6"><LeadForm defaultService="Business compliance health check" /></div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="eyebrow">What can be reviewed</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy">A practical review across the work that keeps a business moving.</h2>
          <p className="mt-4 text-sm leading-7 text-navy/70">Select the areas relevant to your business. The final checklist depends on your entity, registrations, transaction history, locations and the service scope agreed with FileFast.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviewAreas.map(([title, description]) => <article key={title} className="rounded-lg border border-slate-200 bg-white p-5"><h3 className="font-display text-lg font-semibold text-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-page py-14">
          <h2 className="font-display text-2xl font-semibold text-navy">What happens after you enquire?</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {steps.map(([title, description]) => <div key={title} className="border-l-2 border-[#c39a48] pl-4"><h3 className="font-semibold text-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>)}
          </div>
        </div>
      </section>

      <section className="container-page py-12 text-center">
        <p className="text-sm text-slate-600">Prefer to speak directly?</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a className="btn-gold" href="https://wa.me/919444614182?text=I%20would%20like%20a%20business%20compliance%20review" target="_blank" rel="noopener noreferrer">WhatsApp FileFast</a>
          <a className="btn-outline" href="tel:+919444614182">Call +91 94446 14182</a>
        </div>
      </section>
    </main>
  );
}
