import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    service: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled"],
      default: "pending"
    },
    paymentMethod: { type: String, default: "" },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
