import Link from "next/link";

export const metadata = {
  title: "Founder & Professional Approach | Gnanavel M | FileFast Global",
  description:
    "Meet Gnanavel M, founder of FileFast Global. Learn about the practical, documentation-led approach to GST, income tax, bookkeeping and cross-border compliance coordination.",
  openGraph: {
    url: "https://www.filefastglobal.com/about",
    title: "Meet the Founder | FileFast Global",
    description:
      "The thinking behind FileFast Global: practical tax compliance, clear communication and organised support for individuals, founders and growing businesses.",
  },
  alternates: { canonical: "/about" },
};

const expertise = [
  {
    number: "01",
    title: "GST compliance",
    text: "Registration support, return preparation, QRMP guidance, GST portal workflows and reconciliation of available return data.",
  },
  {
    number: "02",
    title: "Income tax & reporting",
    text: "Individual and business tax-return preparation support, document organisation and capital-gains information review.",
  },
  {
    number: "03",
    title: "Marketplace compliance",
    text: "Practical review of seller invoices, marketplace settlements, TCS information, refunds, fees and payout reconciliations.",
  },
  {
    number: "04",
    title: "Books & business records",
    text: "Bookkeeping support, transaction organisation, spreadsheet-based reporting and month-end record discipline.",
  },
  {
    number: "05",
    title: "Business registrations",
    text: "Guidance and application coordination for relevant business registrations, licences and routine compliance requirements.",
  },
  {
    number: "06",
    title: "International tax coordination",
    text: "Initial coordination and documentation support for selected UK, EU and UAE VAT workflows, and US tax-related enquiries with appropriate local specialist involvement where required.",
  },
];

const principles = [
  {
    title: "Understand the situation first",
    text: "The right compliance step depends on the entity type, transactions, documents and deadlines. We begin by understanding those details instead of assuming every case is the same.",
  },
  {
    title: "Explain the work in plain language",
    text: "Clients should know what information is needed, what the service covers, what it costs and what action is expected from them.",
  },
  {
    title: "Keep records reviewable",
    text: "Organised source documents, reconciliations and clear working notes make it easier to review a filing and resolve questions later.",
  },
  {
    title: "Respect professional boundaries",
    text: "Where a matter requires a regulated professional, country-specific legal advice or specialist sign-off, we identify that need and coordinate with the appropriate professional rather than overstate our role.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#081b35] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 82% 18%, rgba(214,170,69,.32), transparent 30%), radial-gradient(circle at 12% 88%, rgba(34,104,170,.38), transparent 34%)",
          }}
        />
        <div className="container-page relative py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e8c77c]">
            The person behind FileFast Global
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Meet <span className="text-[#e8c77c]">Gnanavel M.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                Founder, FileFast Global
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70 sm:text-base">
                Building a practical compliance partner for individuals, entrepreneurs
                and growing businesses — with a focus on clear communication,
                organised documentation and dependable follow-through.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/919444614182?text=Hello%20FileFast%20Global%2C%20I%20would%20like%20to%20discuss%20a%20tax%20or%20compliance%20requirement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#e8c77c] px-6 py-3 text-sm font-bold text-[#081b35] transition hover:bg-white"
                >
                  Discuss your requirement
                </a>
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#e8c77c] hover:text-[#e8c77c]"
                >
                  Explore services
                </Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-white/15 bg-white/[.07] p-6 backdrop-blur-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#e8c77c]">
                A clear way of working
              </p>
              <p className="mt-4 font-display text-2xl font-semibold leading-snug">
                Good compliance starts with understanding the details.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Every business has a different structure, transaction flow and
                reporting responsibility. FileFast is designed to make the next
                compliance step easier to understand and manage.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-5">
                <div>
                  <p className="text-sm font-semibold text-white">Chennai, India</p>
                  <p className="mt-1 text-xs text-white/55">Business base</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">India + cross-border</p>
                  <p className="mt-1 text-xs text-white/55">Service orientation</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a742c]">
            The journey
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#081b35]">
            Why FileFast was started
          </h2>
        </div>
        <div className="space-y-5 text-sm leading-8 text-[#24364d]/80 sm:text-base">
          <p>
            FileFast was founded by Gnanavel M with a straightforward idea:
            tax and business compliance should be understandable, organised and
            accessible to the people who need it. For many small businesses and
            individuals, the difficulty is not only completing a form. It is
            knowing which process applies, preparing the right documents,
            understanding portal requirements and keeping track of what happens next.
          </p>
          <p>
            The business has developed around practical work in GST and income-tax
            filing support, business compliance, accounting records and digital
            workflows. As online selling and cross-border trade create new
            reporting questions, FileFast is also building a coordinated approach
            to marketplace reconciliation and selected international VAT enquiries.
          </p>
          <p>
            The aim is not to make compliance sound complicated. It is to break
            the work into clear steps, explain responsibilities and help clients
            make informed decisions.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a742c]">
              Areas of work
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#081b35] sm:text-4xl">
              Practical support across the compliance journey
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#24364d]/70 sm:text-base">
              FileFast brings related documentation and reporting tasks together
              so clients can find the right starting point and understand the
              scope of support available.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <article
                key={item.number}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold tracking-widest text-[#b58a3a]">
                  {item.number}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-[#081b35]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#24364d]/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a742c]">
              Professional approach
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#081b35] sm:text-4xl">
              What clients should expect
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#24364d]/70">
              A service relationship should be clear before work begins and
              accountable through completion.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {principles.map((item, index) => (
              <div key={item.title} className="grid gap-3 py-6 sm:grid-cols-[48px_1fr]">
                <span className="font-display text-xl font-semibold text-[#b58a3a]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#081b35]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#24364d]/70">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#081b35] py-14 text-white sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#e8c77c]">
              Mission & vision
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Make compliance a managed part of doing business.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              The mission is to make tax, registration and reporting support
              more accessible through clear scope, careful documentation and
              practical client communication.
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/[.06] p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-[#e8c77c]">
              The long-term vision
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              To grow FileFast Global into a trusted digital-first compliance
              partner for individuals, startups, online sellers and businesses
              expanding across markets — while working with qualified local
              professionals whenever a service requires country-specific
              regulated expertise.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a742c]">
            Start a conversation
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[#081b35] sm:text-4xl">
            Tell us what you need to get done.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#24364d]/70 sm:text-base">
            Share your business type, the compliance question you are facing and
            any deadline involved. The FileFast team can help identify the
            relevant service, initial document checklist and next step.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/919444614182?text=Hello%20FileFast%20Global%2C%20I%20would%20like%20to%20discuss%20a%20tax%20or%20compliance%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#d6aa45] px-6 py-3 text-sm font-bold text-[#081b35] hover:bg-[#e8c77c]"
            >
              WhatsApp FileFast
            </a>
            <a
              href="tel:+919444614182"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#081b35]/25 px-6 py-3 text-sm font-semibold text-[#081b35] hover:border-[#b58a3a]"
            >
              Call the team
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#081b35]/25 px-6 py-3 text-sm font-semibold text-[#081b35] hover:border-[#b58a3a]"
            >
              Contact page
            </Link>
          </div>
          <p className="mt-8 text-xs leading-6 text-[#24364d]/55">
            Service scope and professional responsibilities vary by engagement.
            FileFast does not represent this founder profile as a claim of
            chartered-accountant, advocate or foreign-licensed tax-agent status.
            Where specialist or regulated advice is required, the matter should
            be reviewed by an appropriately qualified professional.
          </p>
        </div>
      </section>
    </main>
  );
}
