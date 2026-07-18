import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-silver">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-white">
            File<span className="text-gold">Fast</span>
          </p>
          <p className="mt-3 text-sm text-silver/80">
            Professional Service. Reasonable Pricing. Complete Satisfaction.
          </p>
          <div className="gold-rule mt-5" />
        </div>

        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-gold">All Services</Link></li>
            <li><Link href="/about" className="hover:text-gold">About Founder</Link></li>
            <li><Link href="/testimonials" className="hover:text-gold">Testimonials</Link></li>
            <li><Link href="/blog" className="hover:text-gold">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Top Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services/gst-registration" className="hover:text-gold">GST Registration</Link></li>
            <li><Link href="/services/itr-filing" className="hover:text-gold">ITR Filing</Link></li>
            <li><Link href="/services/msme-registration" className="hover:text-gold">MSME Registration</Link></li>
            <li><Link href="/services/fssai-registration" className="hover:text-gold">FSSAI Registration</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-silver/90">
            <li>122-72, RA Puram, Thideer Nagar, Kotturpuram, Chennai, Tamil Nadu – 600028</li>
            <li><a href="tel:+919444614182" className="hover:text-gold">+91 94446 14182</a></li>
            <li><a href="mailto:filefast.services@gmail.com" className="hover:text-gold">filefast.services@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-silver/60">
        © {new Date().getFullYear()} FileFast. All rights reserved.
      </div>
    </footer>
  );
}
