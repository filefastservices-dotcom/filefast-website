import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientRole: { type: String, default: "" },
    serviceUsed: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
    photoUrl: { type: String, default: "" },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
