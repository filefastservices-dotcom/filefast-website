import Link from "next/link";

export const metadata = {
  title: "Client Portal - FileFast",
  description: "Track your filings and payments with FileFast."
};

export default function ClientPortalPage() {
  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Client Portal (Coming Soon)</p>
      <h1 className="mt-2 text-center font-display text-3xl font-semibold text-navy">
        Track Your Filings & Payments
      </h1>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        <div className="rounded-sm border border-silver/70 bg-white p-6 text-center">
          <div className="text-4xl font-display font-semibold text-gold">📋</div>
          <h3 className="mt-4 font-semibold text-navy">My Filings</h3>
          <p className="mt-2 text-sm text-navy/70">Track status of all your tax and compliance filings</p>
        </div>

        <div className="rounded-sm border border-silver/70 bg-white p-6 text-center">
          <div className="text-4xl font-display font-semibold text-gold">💰</div>
          <h3 className="mt-4 font-semibold text-navy">Invoices & Payments</h3>
          <p className="mt-2 text-sm text-navy/70">View invoices and payment history</p>
        </div>

        <div className="rounded-sm border border-silver/70 bg-white p-6 text-center">
          <div className="text-4xl font-display font-semibold text-gold">📞</div>
          <h3 className="mt-4 font-semibold text-navy">Support Tickets</h3>
          <p className="mt-2 text-sm text-navy/70">Raise and track support requests</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-navy/70">Client portal with login will be available in Phase 3</p>
        <div className="mt-6 space-x-3">
          <Link href="/" className="btn-gold">
            Go Home
          </Link>
          <a href="https://wa.me/919444614182" target="_blank" rel="noopener noreferrer" className="btn-navy-outline">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
