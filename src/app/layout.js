import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.filefastglobal.com/#business",

  name: "FileFast Global",

  url: "https://www.filefastglobal.com",

  logo: "https://www.filefastglobal.com/logo.png",

  image: "https://www.filefastglobal.com/og-image.png",

  description:
    "Tax, VAT and compliance support for Indian businesses and internationally expanding founders.",

  telephone: "+91 9444614182",

  email: "filefast.services@gmail.com",

  knowsAbout: [
    "Goods and Services Tax (GST) compliance in India",
    "Income tax return preparation and filing in India",
    "Tax Deducted at Source (TDS) and Tax Collected at Source (TCS)",
    "Business registrations and licensing in India",
    "Bookkeeping and accounting support",
    "International VAT compliance coordination",
    "Cross-border business compliance"
  ],

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 9444614182",
    email: "filefast.services@gmail.com",
    contactType: "customer support",
    areaServed: ["IN", "GB", "EU", "AE", "US"],
    availableLanguage: ["English", "Tamil"]
  },

  hasMap: "https://www.google.com/maps/search/?api=1&query=FileFast&query_place_id=ChIJ_fs-e95nUjoRqme2a-4Babg",

  areaServed: [
    "India",
    "United Kingdom",
    "European Union",
    "United Arab Emirates",
    "United States"
  ],

  address: {
    "@type": "PostalAddress",
    streetAddress: "122-72, RA Puram, Thideer Nagar, Kotturpuram",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600028",
    addressCountry: "IN"
  },

  sameAs: [
    "https://www.instagram.com/file_fast/",
    "https://www.google.com/maps/search/?api=1&query=FileFast&query_place_id=ChIJ_fs-e95nUjoRqme2a-4Babg"
  ]
};

export const metadata = {
  // Keep metadata URLs anchored to the one canonical production domain,
  // including when Vercel builds preview deployments.
  metadataBase: new URL("https://www.filefastglobal.com"),

  alternates: {
    canonical: "/",
  },

  title: {
    default: "FileFast Global | GST, Income Tax, Accounting & Global Tax Compliance",
    template: "%s | FileFast Global",
  },

  description:
    "FileFast Global provides GST filing, income tax returns, business registrations, licences, bookkeeping, accounting, TDS and cross-border VAT coordination from Chennai, India.",

  keywords: [
    "global tax consultant",
    "international tax consultant",
    "GST registration Chennai",
    "GST return filing",
    "ITR filing India",
    "UK VAT registration support",
    "EU VAT compliance coordination",
    "UAE VAT registration support",
    "US tax filing coordination",
    "business registration India",
    "FileFast Global"
  ],

  openGraph: {
    siteName: "FileFast Global",
    type: "website",
    url: "https://www.filefastglobal.com",
    title: "FileFast Global | GST, Income Tax, Accounting & Global Tax Compliance",
    description:
      "Practical GST, tax, VAT and compliance support for India and cross-border business.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FileFast Global",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FileFast Global | GST, Income Tax, Accounting & Global Tax Compliance",
    description:
      "GST, income tax, business registrations, accounting and cross-border tax coordination from Chennai, India.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
