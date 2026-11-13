import { connectDB } from "@/lib/mongodb";
import HomepageContent from "@/models/HomepageContent";

export const DEFAULT_HOMEPAGE_CONTENT = {
  heroEyebrow: "FileFast – Global Tax Compliance",
  heroTitle: "Make business compliance clearer.",
  heroHighlight: "Move forward with confidence.",
  heroDescription: "GST, income tax, business registrations, licences, bookkeeping and international tax coordination — organised around what your business needs next.",
  heroLocation: "Chennai-based support for individuals, founders, online sellers and businesses across India, with cross-border coordination for selected UK, EU, UAE and US tax workflows.",
  primaryCtaLabel: "Explore all services",
  secondaryCtaLabel: "Discuss your requirement",
  announcementEnabled: false,
  announcementText: "",
  metaTitle: "GST, ITR & Global Tax Compliance | FileFast Global",
  metaDescription: "Explore GST, income tax, business registration, licensing, accounting, compliance and global VAT support from FileFast Global."
};

export async function getHomepageContent() {
  try {
    await connectDB();
    const saved = await HomepageContent.findOne({ key: "home" }).lean();
    if (!saved) return DEFAULT_HOMEPAGE_CONTENT;
    return { ...DEFAULT_HOMEPAGE_CONTENT, ...JSON.parse(JSON.stringify(saved)) };
  } catch (error) {
    console.error("getHomepageContent failed:", error?.message || "Unknown error");
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}
