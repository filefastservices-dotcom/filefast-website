import Link from "next/link";

export const metadata = {
  title: "GST, ITR & Business Compliance Services in Chennai",
  description: "Chennai-based tax and compliance support for GST registration and returns, ITR filing, TDS, bookkeeping, payroll and business registrations. Online assistance across Tamil Nadu.",
  alternates: { canonical: "/chennai-tax-compliance" },
  openGraph: {
    url: "https://www.filefastglobal.com/chennai-tax-compliance",
    title: "GST, ITR & Business Compliance Services in Chennai | FileFast Global",
    description: "Explore GST, income tax, accounting and business compliance support from FileFast Global in Chennai."
  }
};

const services = [
  { title: "GST registration", description: "Application preparation and document checks for eligible businesses.", href: "/services/gst-registration" },
  { title: "GST return filing", description: "GSTR-1, GSTR-3B and applicable periodic return support.", href: "/services/gstr-1-filing" },
  { title: "GST ITC reconciliation", description: "Compare purchase records with available GST data and identify exceptions.", href: "/blog/gst-input-tax-credit-reconciliation-guide" },
  { title: "Income tax return filing", description: "ITR preparation support based on income sources and available records.", href: "/services/itr-filing" },
  { title: "TDS return filing", description: "TDS working, return preparation and reconciliation support.", href: "/services/tds-return-filing" },
  { title: "Income-tax notice support", description: "Organise notices, deadlines and supporting documents for review.", href: "/services/income-tax-notice-response" },
  { title: "Bookkeeping and accounting", description: "Regular transaction recording, bank reconciliation and accounting reports.", href: "/services/accounting-bookkeeping" },
  { title: "Virtual CFO and MIS", description: "Management reporting, cash-flow visibility and budgeting support.", href: "/services/virtual-cfo-mis-reporting" },
  { title: "Payroll and statutory compliance", description: "Payroll records and EPF/ESI compliance coordination where applicable.", href: "/services/epf-esi-payroll-compliance" },
  { title: "Business registrations and licences", description: "Guidance on registrations and licence requirements based on business activity.", href: "/services" }
];

const faq = [
  ["Do you provide GST and income-tax services across Chennai?", "FileFast Global is based in Chennai and provides remote-first tax and compliance support. Share your requirement to confirm the service scope and document checklist."],
  ["Can businesses outside Chennai use FileFast?", "Yes. Many India-side tax and compliance workflows can be handled online, subject to the service, records and applicable rules."],
  ["Do you guarantee GST registration or tax notice outcomes?", "No. Government processing, approval and notice outcomes depend on the facts, documents, applicable law and the relevant authority. FileFast can assist with preparation and agreed compliance coordination."],
  ["How do I receive a quotation?", "Share the service required, business type, number of registrations or transactions and relevant tax period. A scope and fee can then be confirmed before work begins."]
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.filefastglobal.com/chennai-tax-compliance#webpage",
      "url": "https://www.filefastglobal.com/chennai-tax-compliance",
      "name": "GST, ITR & Business Compliance Services in Chennai",
      "description": "Chennai-based tax and compliance support for individuals and businesses."
    },
    {
      "@type": "Service",
      "@id": "https://www.filefastglobal.com/chennai-tax-compliance#service",
      "name": "Tax and business compliance support in Chennai",
      "serviceType": ["GST compliance", "Income tax return support", "TDS compliance", "Accounting and bookkeeping", "Business compliance"],
      "areaServed": { "@type": "City", "name": "Chennai" },
      "provider": {
        "@type": "ProfessionalService",
        "name": "FileFast Global",
        "url": "https://www.filefastglobal.com",
        "telephone": "+91 9444614182",
        "email": "filefast.services@gmail.com"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.filefastglobal.com/" },
        { "@type": "ListItem", "position": 2, "name": "Chennai Tax & Compliance", "item": "https://www.filefastglobal.com/chennai-tax-compliance" }
      ]
    }
  ]
};

export default function ChennaiTaxCompliancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="container-page pt-6 text-xs text-navy/60">
        <Link href="/">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Chennai Tax & Compliance</span>
      </nav>
      <section className="bg-navy py-14 text-white sm:py-20">
        <div className="container-page">
          <p className="eyebrow text-gold">Chennai, Tamil Nadu · Remote-first support</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold sm:text-5xl">GST, Income Tax & Business Compliance Services in Chennai</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">FileFast Global helps individuals, proprietors, startups, online sellers and growing businesses organise tax filings and recurring compliance. Explore the service you need, understand the documents involved and request a clear scope before proceeding.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="btn-gold" href="https://wa.me/919444614182?text=I%20need%20tax%20or%20compliance%20support%20in%20Chennai" target="_blank" rel="noopener noreferrer">Discuss your requirement</a>
            <Link className="btn-outline" href="/services">View all services</Link>
          </div>
        </div>
      </section>
      <section className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Services for Chennai businesses</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy sm:text-3xl">Find the compliance support your business needs</h2>
          <p className="mt-4 text-sm leading-7 text-navy/70">Different businesses have different filing obligations. A retailer, consultant, manufacturer and marketplace seller may need different combinations of GST, income tax, accounting and registration support. Select a service below to review its scope and required records.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-sm border border-silver/70 bg-white p-5">
              <h3 className="font-semibold text-navy">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-navy/65">{service.description}</p>
              <Link className="mt-4 inline-flex text-sm font-semibold text-gold-dark hover:underline" href={service.href}>Explore service →</Link>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-silver-light py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">How the process works</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy">A clear process from enquiry to completion</h2>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-navy/75">
              <li><strong>1. Explain the requirement.</strong> Tell us your business type, service and relevant period.</li>
              <li><strong>2. Receive a checklist and scope.</strong> We identify the records needed and confirm what is included.</li>
              <li><strong>3. Share documents securely.</strong> Provide only the records required for the agreed work. Never share passwords or OTPs.</li>
              <li><strong>4. Review and complete.</strong> We coordinate the agreed preparation or filing and share available acknowledgements and next steps.</li>
            </ol>
          </div>
          <div>
            <p className="eyebrow">Who we support</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy">Support for different business models</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-navy/75">
              <li>• Freelancers and independent professionals</li>
              <li>• Proprietorships, partnerships and companies</li>
              <li>• Retailers, traders and distributors</li>
              <li>• Amazon, Flipkart and other online marketplace sellers</li>
              <li>• Startups and small businesses building finance processes</li>
              <li>• Exporters and businesses with cross-border tax requirements</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Frequently asked questions</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy">Chennai tax and compliance FAQs</h2>
          <div className="mt-6 space-y-5">
            {faq.map(([question, answer]) => <div key={question} className="border-b border-silver/70 pb-5"><h3 className="font-semibold text-navy">{question}</h3><p className="mt-2 text-sm leading-6 text-navy/70">{answer}</p></div>)}
          </div>
        </div>
      </section>
      <section className="bg-navy py-12 text-white">
        <div className="container-page flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div><h2 className="font-display text-2xl font-semibold">Need help choosing the right service?</h2><p className="mt-2 text-sm text-white/70">Share your requirement and request a service-specific checklist and quotation.</p></div>
          <a className="btn-gold shrink-0" href="https://wa.me/919444614182?text=Please%20help%20me%20choose%20a%20tax%20or%20compliance%20service" target="_blank" rel="noopener noreferrer">Contact FileFast</a>
        </div>
      </section>
    </>
  );
}
