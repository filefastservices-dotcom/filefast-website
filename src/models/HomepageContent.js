import mongoose from "mongoose";

const HomepageContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "home" },
    heroEyebrow: { type: String, default: "FileFast – Global Tax Compliance", maxlength: 100 },
    heroTitle: { type: String, default: "Make business compliance clearer.", maxlength: 120 },
    heroHighlight: { type: String, default: "Move forward with confidence.", maxlength: 100 },
    heroDescription: { type: String, default: "GST, income tax, business registrations, licences, bookkeeping and international tax coordination — organised around what your business needs next.", maxlength: 400 },
    heroLocation: { type: String, default: "Chennai-based support for individuals, founders, online sellers and businesses across India, with cross-border coordination for selected UK, EU, UAE and US tax workflows.", maxlength: 400 },
    primaryCtaLabel: { type: String, default: "Explore all services", maxlength: 40 },
    secondaryCtaLabel: { type: String, default: "Discuss your requirement", maxlength: 40 },
    announcementEnabled: { type: Boolean, default: false },
    announcementText: { type: String, default: "", maxlength: 180 },
    metaTitle: { type: String, default: "Tax, GST, ITR, Business & Global Compliance Services | FileFast Global", maxlength: 60 },
    metaDescription: { type: String, default: "Explore GST, income tax, business registration, licensing, accounting, compliance and global VAT support from FileFast Global.", maxlength: 160 }
  },
  { timestamps: true }
);

export default mongoose.models.HomepageContent || mongoose.model("HomepageContent", HomepageContentSchema);
