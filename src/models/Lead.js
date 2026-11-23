import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, default: "" },
    serviceInterested: { type: String, default: "" },
    message: { type: String, default: "" },
    source: { type: String, default: "website" },
    utmSource: { type: String, default: "" },
    utmMedium: { type: String, default: "" },
    utmCampaign: { type: String, default: "" },
    utmContent: { type: String, default: "" },
    utmTerm: { type: String, default: "" },
    gclid: { type: String, default: "" },
    gbraid: { type: String, default: "" },
    wbraid: { type: String, default: "" },
    msclkid: { type: String, default: "" },
    adsMeasurementConsent: { type: Boolean, default: false },
    adsMeasurementConsentAt: { type: Date, default: null },
    landingPage: { type: String, default: "" },
    referrerHost: { type: String, default: "" },
    leadScore: { type: Number, min: 0, max: 100, default: 0 },
    leadPriority: { type: String, enum: ["high", "standard"], default: "standard", index: true },
    firstResponseAt: { type: Date, default: null },
    status: { type: String, enum: ["new", "contacted", "qualified", "converted", "lost"], default: "new", index: true },
    internalNote: { type: String, default: "" },
    followUpAt: { type: Date, default: null },
    statusUpdatedAt: { type: Date, default: null },
    consent: { type: Boolean, default: false },
    consentAt: { type: Date, default: null },
    consentVersion: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
