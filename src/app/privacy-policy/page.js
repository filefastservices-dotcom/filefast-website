export const metadata = {
  title: "Privacy Policy",
  description: "Learn how FileFast Global uses information submitted through its website enquiry forms.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    url: "https://www.filefastglobal.com/privacy-policy",
    title: "Privacy Policy | FileFast Global",
    description: "How FileFast Global uses information submitted through website enquiry forms.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-navy">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-6 text-navy/70">This page explains how FileFast Global handles information you submit through this website. It is a practical summary for website enquiries and does not replace any separate engagement terms that may apply when you become a client.</p>
      <section className="mt-10 space-y-3">
        <h2 className="font-display text-xl font-semibold text-navy">Information you provide</h2>
        <p className="text-sm leading-6 text-navy/75">When you use an enquiry form, we may collect your name, phone number, email address, the service you are asking about and the message you choose to send.</p>
      </section>
      <section className="mt-7 space-y-3">
        <h2 className="font-display text-xl font-semibold text-navy">How we use it</h2>
        <p className="text-sm leading-6 text-navy/75">We use enquiry details to understand your request, contact you, explain possible next steps and provide requested tax or compliance services. Service providers may help operate the website or store enquiry records.</p>
      </section>
      <section className="mt-7 space-y-3">
        <h2 className="font-display text-xl font-semibold text-navy">Sharing and security</h2>
        <p className="text-sm leading-6 text-navy/75">We do not ask for passwords or one-time passcodes through this website. Please do not submit them in a form. Access to enquiry information should be limited to people who need it to respond to your request. No internet transmission or storage method can be guaranteed to be completely secure.</p>
      </section>
      <section className="mt-7 space-y-3">
        <h2 className="font-display text-xl font-semibold text-navy">Retention and your requests</h2>
        <p className="text-sm leading-6 text-navy/75">Enquiry information may be retained for follow-up, service administration and applicable record-keeping requirements. To ask a question about your information or request a correction, contact us at <a className="underline underline-offset-2" href="mailto:filefast.services@gmail.com">filefast.services@gmail.com</a>.</p>
      </section>
      <section className="mt-7 space-y-3">
        <h2 className="font-display text-xl font-semibold text-navy">Contact</h2>
        <p className="text-sm leading-6 text-navy/75">FileFast Global · Chennai, Tamil Nadu, India · <a className="underline underline-offset-2" href="tel:+919444614182">+91 94446 14182</a></p>
      </section>
    </article>
  );
}
