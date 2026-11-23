export const metadata = {
  title: "Founder | Gnanavel M — FileFast Global",
  description: "Meet Gnanavel M, founder of FileFast Global in Chennai. Explore his commerce education, tax and compliance experience, digital capabilities, professional focus and vision.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "https://www.filefastglobal.com/about",
    title: "Gnanavel M | Founder, FileFast Global",
    description: "The founder story, education, experience, expertise and vision behind FileFast Global.",
    images: ["/gnanavel-founder.jpg"],
  },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gnanavel M",
  jobTitle: "Founder, FileFast Global",
  url: "https://www.filefastglobal.com/about",
  image: "https://www.filefastglobal.com/gnanavel-founder.jpg",
  sameAs: ["https://www.linkedin.com/in/gnanavelm/"],
  worksFor: {
    "@type": "Organization",
    name: "FileFast Global",
    url: "https://www.filefastglobal.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
};

const founderSnapshot = [
  ["Role", "Founder, FileFast Global"],
  ["Established", "2024"],
  ["Based in", "Chennai, Tamil Nadu, India"],
  ["Academic focus", "Commerce & Accounting"],
  ["Professional focus", "Tax compliance, business formalities and digital operations"],
];

const clientJourney = [
  ["01", "Understand the requirement", "Clarify the service needed, relevant period, jurisdiction and available documents."],
  ["02", "Review and confirm scope", "Review the information provided, identify missing details and confirm the applicable work and fee before proceeding."],
  ["03", "Prepare and coordinate", "Organise the documents, prepare the required filing or application information and coordinate any necessary specialist input."],
  ["04", "Share progress and next steps", "Keep the client informed about submission status, dependencies, acknowledgements and any follow-up requirements."],
];

const founderFaqs = [
  ["What is FileFast Global?", "FileFast Global is a Chennai-based tax and business-compliance support practice founded in 2024 by Gnanavel M."],
  ["Which areas does FileFast support?", "Its service areas include GST and income-tax filing support, business registrations, TDS and TCS coordination, e-commerce seller compliance and selected cross-border compliance coordination."],
  ["Does FileFast provide regulated legal, audit or overseas tax advice?", "Regulated advice is handled only by appropriately licensed professionals where required. FileFast can provide administrative support and coordination within the agreed scope."],
  ["How can I contact the founder?", "Use the official FileFast WhatsApp channel, the LinkedIn profile or the website contact options shown on this page."],
];

const expertise = [
  ["GST Compliance", "GST registration, periodic returns, reconciliations, notices and compliance support."],
  ["Income Tax", "Individual income-tax return preparation, filing support and tax-document coordination."],
  ["Business Registrations", "Support for MSME, FSSAI, trade licence and other business registration processes."],
  ["E-commerce Compliance", "Marketplace seller compliance support, including TCS-related reporting and reconciliations."],
  ["TDS & TCS", "Return preparation support, compliance tracking and related documentation."],
  ["Cross-border Tax Coordination", "Research-led coordination around UK VAT, EU VAT, sales tax and international compliance requirements, with regulated advice referred to appropriately qualified professionals."],
];

const experience = [
  ["2024 — Present", "Founder, FileFast Global", "Established a digital-first tax and compliance support practice in Chennai, focused on individuals, small businesses, traders and online sellers."],
  ["Tax & compliance practice", "GST and income-tax support", "Hands-on work across return preparation, filing workflows, reconciliations, registration processes, documentation and client coordination."],
  ["Digital and research work", "Analytics, content and online growth", "Applied Excel, SPSS, SEO and digital-content tools to organise information, support research and communicate services clearly."],
];

const serviceAreas = [
  "GST registration, returns and amendments",
  "GST cancellation, final returns and notice-response documentation support",
  "Income-tax return preparation and filing support",
  "TDS and TCS compliance coordination",
  "MSME, FSSAI, trade licence and trademark application coordination",
  "E-commerce seller onboarding and marketplace reconciliation",
  "Bookkeeping, reporting and Excel-based data support",
  "UK VAT, EU VAT and sales-tax compliance coordination",
];

const capabilities = [
  "GST return preparation and filing workflows",
  "Income-tax return preparation and documentation",
  "GST reconciliation and portal-related issue handling",
  "Business registration and licensing coordination",
  "Marketplace reporting and TCS reconciliation",
  "Excel-based reporting and data organisation",
  "SPSS-based academic data analysis",
  "Digital marketing, SEO and content production",
];

const values = [
  ["Accuracy", "Work carefully with source documents, reconciliations and filing requirements."],
  ["Clarity", "Explain requirements, fees and next steps in straightforward language."],
  ["Accountability", "Keep clients informed about progress, dependencies and deadlines."],
  ["Confidentiality", "Treat client records and business information with care."],
];

export default function AboutPage() {
  return (
    <main className="bg-[#f7f8fa] text-[#14243b]">\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema).replace(/</g, "\\\\u003c") }} />
      <section className="relative overflow-hidden bg-[#07172d] text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 15%, #d5ad62 0, transparent 32%), radial-gradient(circle at 10% 90%, #31557b 0, transparent 36%)" }} />
        <div className="container-page relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_.9fr]">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d9b66f]">Founder & Business Lead</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">Gnanavel M</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Building clearer, more accessible tax and compliance support for individuals,
              entrepreneurs and growing businesses.
            </p>
            <p className="mt-5 text-sm leading-7 text-white/65">
              Founder of FileFast Global · Chennai, Tamil Nadu, India
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/919444614182" target="_blank" rel="noopener noreferrer" className="btn-gold">Discuss a Requirement</a>
              <a href="https://www.linkedin.com/in/gnanavelm/" target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">LinkedIn Profile</a>
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-sm lg:order-2">
            <div className="rounded-[2rem] border border-[#d9b66f]/40 bg-white/5 p-3 shadow-2xl shadow-black/30">
              <img src="/gnanavel-founder.jpg" alt="Gnanavel M, founder of FileFast Global" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-center" />
            </div>
            <p className="mt-3 text-center text-xs tracking-wide text-white/55">Founder · FileFast Global</p>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Founder at a glance</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">A clear profile of the person behind FileFast</h2>
            <p className="mt-4 leading-8 text-slate-600">A concise overview of Gnanavel’s role, business, location and professional focus.</p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {founderSnapshot.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="text-xs font-semibold uppercase tracking-[.16em] text-[#9b7637]">{label}</dt>
                <dd className="mt-2 text-sm font-medium leading-6 text-slate-800">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">The person behind the work</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">From a local ambition to a global outlook</h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <p>
              Gnanavel M is the founder of FileFast Global, established in 2024 in Chennai.
              His work brings together practical tax-compliance experience, business
              documentation and a digital-first approach to service delivery.
            </p>
            <p>
              The idea behind FileFast is straightforward: make compliance easier to
              understand and manage. Individuals, small businesses and online sellers should
              be able to access structured support, know what is required of them and stay
              informed throughout the process.
            </p>
            <p>
              With an academic background in commerce and accounting, Gnanavel continues to
              build the business around dependable processes, transparent communication and
              continuous learning. His professional interests also extend to international
              tax and cross-border compliance coordination.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Professional journey</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Building experience through practical work</h2>
            <p className="mt-5 leading-8 text-slate-600">The work is grounded in recurring compliance tasks, document-led processes and clear client communication. The focus is on making each step understandable and properly organised.</p>
          </div>
          <div className="space-y-5">
            {experience.map(([period, role, body]) => (
              <article key={period + role} className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#9b7637]">{period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{role}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Client experience</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">A straightforward process, from enquiry to follow-up</h2>
          <p className="mt-4 leading-7 text-slate-600">Each engagement begins with understanding the requirement and confirming the scope. The steps below describe the intended service approach; exact requirements vary by assignment.</p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clientJourney.map(([number, title, body]) => (
            <article key={number} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold tracking-[.18em] text-[#a17b3b]">{number}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Service knowledge</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Compliance areas supported through FileFast</h2>
            <p className="mt-4 leading-7 text-slate-600">A broad operational scope across Indian compliance and selected cross-border coordination. The exact engagement depends on the client, jurisdiction and applicable professional requirements.</p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {serviceAreas.map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-[#fbfcfd] p-4 text-sm leading-6 text-slate-700">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Professional focus</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Areas of work</h2>
            <p className="mt-4 leading-7 text-slate-600">A practical service focus spanning Indian tax compliance, business formalities and international compliance coordination.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map(([title, body], index) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-[#fbfcfd] p-6">
                <span className="text-xs font-semibold tracking-[.18em] text-[#a17b3b]">0{index + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Education & learning</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Academic foundation</h2>
            <div className="mt-7 space-y-6">
              <div className="border-l-2 border-[#c6a15e] pl-5">
                <h3 className="font-semibold">M.Com — Commerce & Accounting</h3>
                <p className="mt-1 text-sm text-slate-600">Presidency College (Autonomous), Chennai · University of Madras · 2024–2026</p>
              </div>
              <div className="border-l-2 border-[#c6a15e] pl-5">
                <h3 className="font-semibold">B.Com</h3>
                <p className="mt-1 text-sm text-slate-600">Thiruvalluvar University</p>
              </div>
              <div className="border-l-2 border-[#c6a15e] pl-5">
                <h3 className="font-semibold">Research project</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">“A Study on the Impact of Generative Artificial Intelligence on Financial Reporting in Tiruvannamalai” — academic research using SPSS for data analysis.</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Training & development</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Continuous learning</h2>
            <ul className="mt-7 space-y-4 text-sm leading-7 text-slate-600">
              <li className="rounded-lg bg-white p-4 shadow-sm">Google Digital Marketing Certification</li>
              <li className="rounded-lg bg-white p-4 shadow-sm">NISM Financial Literacy assessment — 93% score</li>
              <li className="rounded-lg bg-white p-4 shadow-sm">DIPR internship — Government of Tamil Nadu</li>
              <li className="rounded-lg bg-white p-4 shadow-sm">Naan Mudhalvan skill-development training</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#eef1f5] py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Tools & capabilities</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">A blend of compliance and digital skills</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => <div key={item} className="rounded-lg bg-white p-4 text-sm leading-6 text-slate-700">{item}</div>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-slate-500">Tools and working knowledge include Microsoft Excel, Tally (basic), SPSS, SEO, Canva, Photoshop and DaVinci Resolve.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">How we work</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Principles that guide FileFast</h2>
            <div className="mt-7 space-y-4">
              {values.map(([title, body]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Mission</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Make compliance simpler</h2>
            <p className="mt-4 leading-8 text-slate-600">To provide accessible, organised and reliable tax and business-compliance support, helping clients understand their obligations and complete required processes with greater confidence.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Vision</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Build a trusted global service brand</h2>
            <p className="mt-4 leading-8 text-slate-600">To grow FileFast Global into a trusted digital-first compliance partner for individuals, entrepreneurs and businesses, while building responsible cross-border service capabilities.</p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9b7637]">Frequently asked questions</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">About Gnanavel and FileFast Global</h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6">
            {founderFaqs.map(([question, answer]) => (
              <details key={question} className="py-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-slate-800 marker:hidden">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07172d] py-14 text-white sm:py-16">
        <div className="container-page text-center">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#d9b66f]">Connect with the founder</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Let’s make your next compliance step clearer.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">For service enquiries, business collaborations or professional connections, reach FileFast Global through the official channels.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/919444614182" target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp FileFast</a>
            <a href="https://www.linkedin.com/in/gnanavelm/" target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Connect on LinkedIn</a>
            <a href="https://www.filefastglobal.com" className="rounded-md border border-white/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">filefastglobal.com</a>
          </div>
          <p className="mt-8 text-xs leading-6 text-white/45">FileFast Global provides tax and compliance support. Regulated legal, audit and jurisdiction-specific tax advice is provided only by appropriately licensed professionals where required.</p>
        </div>
      </section>
    </main>
  );
}
