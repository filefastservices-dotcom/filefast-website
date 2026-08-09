import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",

  name: "FileFast Global",

  url: "https://www.filefastglobal.com",

  logo: "https://www.filefastglobal.com/logo.png",

  image: "https://www.filefastglobal.com/og-image.png",

  description:
    "Tax, VAT and compliance support for Indian businesses and internationally expanding founders.",

  telephone: "+91 9444614182",

  email: "filefast.services@gmail.com",

  priceRange: "₹199 - ₹9,999",

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
    "https://www.instagram.com/filefastglobal"
  ]
};

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.filefastglobal.com"
  ),

  title: {
    default: "FileFast Global – Tax, VAT & Compliance Services",
    template: "%s | FileFast Global",
  },

  description:
    "FileFast Global provides GST, income tax, VAT coordination, business registration, accounting and compliance support for Indian businesses and internationally expanding founders.",

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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    siteName: "FileFast Global",
    type: "website",
    url: "https://www.filefastglobal.com",
    title: "FileFast Global | Tax, VAT & Compliance Services",
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
    title: "FileFast Global | Tax, VAT & Compliance Services",
    description:
      "Practical tax and compliance support for India and international growth.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

alternates: {
  canonical: "/"
}
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
