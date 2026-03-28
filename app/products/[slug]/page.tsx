import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getProductBySlug, formatPrice } from "@/lib/products";
import { PLATFORM_LABELS, SCENE_LABELS } from "@/types/product";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ canceled?: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "未找到" };
  return {
    title: `${product.title} · Commerce Portfolio`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const canceled = sp.canceled === "1";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/products"
        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← 返回列表
      </Link>

      {canceled && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100">
          已取消支付，可重新发起结账。
        </p>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={product.previewUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              {PLATFORM_LABELS[product.platform]}
            </span>
            {product.scenes.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
              >
                {SCENE_LABELS[s]}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {product.title}
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">{product.description}</p>
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              使用说明
            </h2>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{product.usageInstructions}</p>
          </section>
        </div>

        <aside className="lg:pt-2">
          <div className="sticky top-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {formatPrice(product.priceCents, product.currency)}
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Stripe Checkout · 测试环境使用 test 卡号
            </p>

            <form action="/api/checkout" method="POST" className="mt-6">
              <input type="hidden" name="slug" value={product.slug} />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                购买并解锁 Prompt
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Prompt 预览</h2>
              <p className="mt-1 text-xs text-zinc-500">付款前内容已模糊处理</p>
              <div className="relative mt-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
                <p className="select-none font-mono text-sm leading-relaxed text-zinc-800 blur-sm dark:text-zinc-200">
                  {product.promptText}
                </p>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px] dark:bg-zinc-950/40">
                  <span className="rounded-full bg-zinc-900/90 px-4 py-2 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                    付款后显示完整内容
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
