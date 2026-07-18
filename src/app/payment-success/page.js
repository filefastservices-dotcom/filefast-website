import Link from "next/link";

export const metadata = {
  title: "Payment Successful - FileFast",
  description: "Your payment has been processed successfully."
};

export default function PaymentSuccessPage() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 text-6xl">✅</div>
        <h1 className="font-display text-3xl font-semibold text-navy">Payment Details Received</h1>
        <p className="mt-3 text-navy/70">
          Our team will verify the transaction and contact you shortly.
        </p>
        <p className="mt-2 text-sm text-navy/60">
          Please keep your Razorpay confirmation for reference.
        </p>

        <div className="mt-8 space-x-3">
          <Link href="/" className="btn-gold">
            Go Home
          </Link>
          <Link href="/services" className="btn-navy-outline">
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
