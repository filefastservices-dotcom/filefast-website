import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "FileFast Global",
  description: "Tax, VAT and compliance support for Indian businesses and internationally expanding founders.",
  telephone: "+91 94446 14182",
  email: "filefast.services@gmail.com",
  areaServed: ["India", "United Kingdom", "European Union", "United Arab Emirates", "United States"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN"
  }
};

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://filefast.in"),
  title: {
    default: "FileFast Global – Tax, VAT & Compliance Services",
    template: "%s | FileFast Global"
  },
  description:
    "FileFast Global provides GST, income tax, VAT coordination, business registration, accounting and compliance support for Indian businesses and internationally expanding founders.",
  keywords: ["global tax consultant", "international tax consultant", "GST registration Chennai", "GST return filing", "ITR filing India", "UK VAT registration support", "EU VAT compliance coordination", "UAE VAT registration support", "US tax filing coordination", "business registration India", "FileFast Global"],
  openGraph: {
    siteName: "FileFast Global",
    type: "website",
    title: "FileFast Global | Tax, VAT & Compliance Services",
    description: "Practical GST, tax, VAT and compliance support for India and cross-border business.",
  },
  twitter: { card: "summary_large_image", title: "FileFast Global | Tax, VAT & Compliance Services", description: "Practical tax and compliance support for India and international growth." },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
