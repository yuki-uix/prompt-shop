import { stripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";
import { redirect } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) redirect("/");

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    redirect("/");
  }

  if (session.payment_status !== "paid") redirect("/");

  const productId = session.metadata?.productId;
  const product = productId ? getProductById(productId) : null;
  if (!product) redirect("/");

  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <div className="mb-4 text-5xl text-emerald-600">&#10003;</div>
      <h1 className="text-3xl font-bold text-gray-900">支付成功!</h1>
      <p className="mt-2 text-gray-500">感谢您的购买</p>

      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-left">
        <h2 className="font-semibold text-gray-900">{product.title}</h2>
        {/* TODO: BL-001 完成后移除此提示 */}
        <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
          请及时复制以下内容并妥善保存，关闭页面后暂无法再次查看。
        </p>
        <h3 className="mt-4 text-sm font-medium text-gray-500">
          完整 Prompt 内容:
        </h3>
        <pre className="mt-2 whitespace-pre-wrap rounded-md border border-gray-200 bg-white p-4 font-mono text-sm text-gray-800">
          {product.promptContent}
        </pre>
        <CopyButton text={product.promptContent} />
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-blue-600 hover:underline"
      >
        ← 继续浏览更多商品
      </Link>
    </div>
  );
}
