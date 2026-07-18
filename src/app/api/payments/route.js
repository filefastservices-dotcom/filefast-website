import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import crypto from "crypto";

// Create payment order
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  if (!body.clientName || !body.amount || !body.service) {
    return NextResponse.json(
      { error: "Required fields: clientName, amount, service" },
      { status: 400 }
    );
  }

  // Create payment record
  const payment = await Payment.create({
    clientName: body.clientName,
    clientEmail: body.clientEmail || "",
    clientPhone: body.clientPhone || "",
    service: body.service,
    amount: body.amount,
    status: "pending"
  });

  // In production, you would call Razorpay API here to create an order
  // For now, we'll return the payment record
  // The frontend will handle Razorpay checkout

  return NextResponse.json({ payment }, { status: 201 });
}
