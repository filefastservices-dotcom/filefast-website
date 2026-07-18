import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, default: "" },
    serviceInterested: { type: String, default: "" },
    message: { type: String, default: "" },
    source: { type: String, default: "website" }
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
