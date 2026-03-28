import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <p className="text-zinc-600 dark:text-zinc-400">缺少 session_id，无法校验支付结果。</p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          返回商品列表
        </Link>
      </div>
    );
  }

  const session = await getStripe().checkout.sessions.retrieve(session_id, {
    expand: ["line_items"],
  });

  if (session.payment_status !== "paid") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <p className="text-zinc-600 dark:text-zinc-400">支付尚未完成或会话无效。</p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          返回商品列表
        </Link>
      </div>
    );
  }

  const productId = session.metadata?.productId;
  const product = productId ? getProductById(productId) : undefined;
  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <p className="text-zinc-600 dark:text-zinc-400">无法根据会话匹配商品数据。</p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          返回商品列表
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">支付成功</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        以下为完整 prompt，请自行保存。本页通过 Stripe Checkout Session 校验支付状态。
      </p>
      <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">
          {product.promptText}
        </p>
      </div>
      <Link
        href="/products"
        className="mt-8 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        继续浏览商品
      </Link>
    </div>
  );
}
