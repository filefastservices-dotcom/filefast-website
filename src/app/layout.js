import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://filefast.in"),
  title: {
    default: "FileFast – Tax, Compliance & Business Growth Solutions",
    template: "%s | FileFast"
  },
  description:
    "FileFast provides GST, income tax, business registration, accounting and compliance support for Indian businesses and globally expanding founders.",
  keywords: ["GST registration Chennai", "GST return filing", "ITR filing", "business registration India", "global tax coordination", "FSSAI registration", "FileFast"],
  openGraph: {
    siteName: "FileFast",
    type: "website",
    title: "FileFast | Tax, Compliance & Global Business Support",
    description: "Practical tax and compliance support for India and cross-border business."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
