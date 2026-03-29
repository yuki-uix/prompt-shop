import { stripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const product = getProductById(productId);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.title,
              description: product.description,
              images: product.images.map(
                (img) => `${process.env.NEXT_PUBLIC_BASE_URL}${img}`
              ),
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: product.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.id}`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
