import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
);

const ProcessStepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" }
  },
  { _id: false }
);

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: [
        "GST Services",
        "Income Tax Services",
        "Business Registration",
        "Licenses",
        "Compliance Services",
        "Accounting Services",
        "Digital Business Services"
      ]
    },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    benefits: [{ type: String }],
    eligibility: [{ type: String }],
    requiredDocuments: [{ type: String }],
    processFlow: [ProcessStepSchema],
    pricingInfo: { type: String, default: "Contact us for pricing" },
    faqs: [FaqSchema],
    relatedServiceSlugs: [{ type: String }],

    iconUrl: { type: String, default: "" },
    bannerImageUrl: { type: String, default: "" },
    featuredImageUrl: { type: String, default: "" },

    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },
    ogImage: { type: String, default: "" },

    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
