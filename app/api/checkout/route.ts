import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/products";

export async function POST(req: Request) {
  const formData = await req.formData();
  const slug = String(formData.get("slug") ?? "");
  const product = getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: product.currency.toLowerCase(),
          unit_amount: product.priceCents,
          product_data: {
            name: product.title,
            images: [product.thumbUrl],
            description: product.description.slice(0, 500),
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      productId: product.id,
      productSlug: product.slug,
    },
    payment_intent_data: {
      metadata: {
        productId: product.id,
        productSlug: product.slug,
      },
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/products/${encodeURIComponent(product.slug)}?canceled=1`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a checkout URL" },
      { status: 500 },
    );
  }
  return NextResponse.redirect(session.url, 303);
}
