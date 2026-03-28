import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { recordPaidOrder } from "@/lib/order-store";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, whSecret);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent,
        );
        break;
      default:
        break;
    }
  } catch (e) {
    console.error("[webhook] handler error", e);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const productId = session.metadata?.productId;
  const productSlug = session.metadata?.productSlug;
  if (!productId || !productSlug) return;

  const piId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  await recordPaidOrder({
    id: randomUUID(),
    productId,
    productSlug,
    stripeSessionId: session.id,
    stripePaymentIntentId: piId,
    status: "paid",
    createdAt: new Date().toISOString(),
  });
}

async function handlePaymentIntentSucceeded(pi: Stripe.PaymentIntent) {
  const productId = pi.metadata?.productId;
  const productSlug = pi.metadata?.productSlug;
  if (!productId || !productSlug) return;

  await recordPaidOrder({
    id: randomUUID(),
    productId,
    productSlug,
    stripePaymentIntentId: pi.id,
    status: "paid",
    createdAt: new Date().toISOString(),
  });
}
