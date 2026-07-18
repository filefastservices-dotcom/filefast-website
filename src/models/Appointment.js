import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    serviceRequired: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },
    isReminderSent: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
