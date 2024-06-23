import { NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST(req) {
  try {
    try {
      const { amount } = await req.json();
      if (!amount) {
        return NextResponse.json(
          { error: "Amount is required" },
          { status: 400 }
        );
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "CAD",
        payment_method_types: ["card"],
      });
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

export const runtime = "edge";
