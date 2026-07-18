import Link from "next/link";

export const metadata = {
  title: "Payment Failed - FileFast",
  description: "Your payment could not be processed."
};

export default function PaymentFailedPage() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 text-6xl">❌</div>
        <h1 className="font-display text-3xl font-semibold text-navy">Payment Failed</h1>
        <p className="mt-3 text-navy/70">
          Unfortunately, your payment could not be processed. Please try again or contact our support team.
        </p>

        <div className="mt-8 space-x-3">
          <Link href="/appointments" className="btn-gold">
            Try Again
          </Link>
          <a href="https://wa.me/919444614182" target="_blank" rel="noopener noreferrer" className="btn-navy-outline">
            WhatsApp Support
          </a>
        </div>
      </div>
    </section>
  );
}
