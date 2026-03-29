import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

/** MVP: in-memory dedupe; resets on cold start (see T4.3 story card). */
const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(
      "Webhook: STRIPE_WEBHOOK_SECRET is not set; configure it in environment variables"
    );
    return NextResponse.json(
      { error: "Server misconfiguration: webhook secret not set" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (processedEvents.has(event.id)) {
    console.log("Duplicate event, skipping:", event.id);
    return NextResponse.json({ received: true });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const productId = session.metadata?.productId;
      const amountTotal = session.amount_total;

      console.log("Payment succeeded:", {
        eventId: event.id,
        sessionId: session.id,
        productId,
        amount: amountTotal,
        currency: session.currency,
        timestamp: new Date().toISOString(),
      });

      break;
    }
    default:
      console.log("Unhandled event type:", event.type);
  }

  processedEvents.add(event.id);
  return NextResponse.json({ received: true });
}
