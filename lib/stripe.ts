import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY. Copy .env.example to .env.local and add your test keys.",
    );
  }
  client = new Stripe(key, { typescript: true });
  return client;
}
