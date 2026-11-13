import GlobalTaxEnquiryForm from "@/components/GlobalTaxEnquiryForm";

export const metadata = {
  title: "Global VAT & Tax Enquiry | UK, EU, UAE & US | FileFast Global",
  description: "Tell FileFast Global where your business sells, where stock is held and which tax services you need. Request an initial UK VAT, EU VAT, OSS/IOSS, UAE VAT or US sales-tax assessment.",
  alternates: { canonical: "/global-tax-quote" },
  openGraph: {
    url: "https://www.filefastglobal.com/global-tax-quote",
    title: "Global VAT & Tax Enquiry | FileFast Global",
    description: "Request a tailored cross-border tax and VAT assessment for your business."
  }
};

export default function GlobalTaxQuotePage() {
  return <main className="bg-slate-50">
    <section className="relative overflow-hidden bg-[#081b35] text-white">
      <div className="container-page py-14 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#e8c77c]">International tax & compliance</p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl">Find the right VAT and tax support for your global business.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">Tell us where your business is established, where you sell and what support you need. We will review your requirements and come back with the appropriate service scope and quotation.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-xs text-white/70"><span className="rounded-full border border-white/20 px-3 py-2">UK VAT</span><span className="rounded-full border border-white/20 px-3 py-2">EU VAT / OSS / IOSS</span><span className="rounded-full border border-white/20 px-3 py-2">UAE VAT</span><span className="rounded-full border border-white/20 px-3 py-2">US sales tax</span><span className="rounded-full border border-white/20 px-3 py-2">Global expansion</span></div>
      </div>
    </section>
    <section className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-16">
      <div><GlobalTaxEnquiryForm /></div>
      <aside className="space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="font-display text-lg font-semibold text-navy">What happens next?</h2><ol className="mt-4 space-y-4 text-sm text-slate-600"><li><strong className="text-navy">1. Requirement review</strong><p className="mt-1 leading-6">We review your business location, target markets and sales model.</p></li><li><strong className="text-navy">2. Scope confirmation</strong><p className="mt-1 leading-6">We identify which registrations, filings or local specialists may be needed.</p></li><li><strong className="text-navy">3. Written quotation</strong><p className="mt-1 leading-6">You receive a service scope and fee proposal before work begins.</p></li></ol></div>
        <div className="rounded-xl bg-[#081b35] p-6 text-white"><h2 className="font-display text-lg font-semibold">Prefer to speak first?</h2><p className="mt-2 text-sm leading-6 text-white/70">Contact our team directly to discuss your cross-border tax requirement.</p><a href="https://wa.me/919444614182?text=I%20need%20help%20with%20international%20VAT%20or%20tax%20compliance" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-md bg-[#e8c77c] px-4 py-3 text-sm font-bold text-navy">WhatsApp FileFast</a></div>
      </aside>
    </section>
  </main>;
}
