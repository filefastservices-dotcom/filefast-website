import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with FileFast for GST, Income Tax, Business Registration and Compliance services."
};

export default function ContactPage() {
  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Contact</p>
      <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">Get In Touch</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="space-y-4 text-sm text-navy/80">
            <p>
              <span className="font-semibold text-navy">Phone: </span>
              <a href="tel:+919444614182" className="hover:text-gold-dark">+91 94446 14182</a>
            </p>
            <p>
              <span className="font-semibold text-navy">Email: </span>
              <a href="mailto:filefast.services@gmail.com" className="hover:text-gold-dark">
                filefast.services@gmail.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-navy">Office: </span>
              122-72, RA Puram, Thideer Nagar, Kotturpuram, Chennai, Tamil Nadu – 600028
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-sm border border-silver/70">
            <iframe
              title="FileFast Office Location"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Kotturpuram,Chennai,Tamil+Nadu+600028&output=embed"
            />
          </div>
        </div>

        <div className="rounded-sm border border-silver/70 bg-white p-6 sm:p-8">
          <p className="font-display text-lg font-semibold text-navy">Send Us a Message</p>
          <div className="mt-5">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
