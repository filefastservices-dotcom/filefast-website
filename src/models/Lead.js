import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, default: "" },
    serviceInterested: { type: String, default: "" },
    message: { type: String, default: "" },
    source: { type: String, default: "website" },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "lost"],
      default: "new",
      index: true
    },
    internalNotes: { type: String, default: "", maxlength: 5000 },
    followUpAt: { type: Date, default: null, index: true },
    estimatedValue: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
