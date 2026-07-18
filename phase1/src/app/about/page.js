export const metadata = {
  title: "About Founder",
  description: "Meet Gnanavel M, founder of FileFast — Tax, Compliance and Business Services."
};

export default function AboutPage() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-center">About Founder</p>
        <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">Gnanavel M</h1>

        <div className="mx-auto mt-6 h-px w-16 bg-gold" />

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-navy/80">
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Professional Journey</h2>
            <p className="mt-3">
              Gnanavel M founded FileFast with a simple goal — make tax filing, business
              registration and compliance straightforward for everyday individuals, traders
              and growing businesses across India, without the confusion that usually comes
              with government paperwork.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Mission</h2>
            <p className="mt-3">
              To deliver professional, accurate and timely tax, compliance and business
              services at reasonable pricing, so clients can focus on running their business
              while FileFast handles the paperwork.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Vision</h2>
            <p className="mt-3">
              To become one of India's most trusted digital-first compliance partners for
              individuals, startups and small businesses.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Core Values</h2>
            <ul className="mt-3 space-y-2">
              <li>• Professional Service — accurate work, every time</li>
              <li>• Reasonable Pricing — fair, transparent fees</li>
              <li>• Complete Satisfaction — we stay until the work is done right</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Why FileFast</h2>
            <p className="mt-3">
              FileFast was built around one principle: compliance should never slow a business
              down. From GST and Income Tax to business registration and licensing, every
              service is designed to be fast, secure and dependable.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <a
            href="https://wa.me/919444614182"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            WhatsApp Now
          </a>
          <a href="tel:+919444614182" className="btn-navy-outline">
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
