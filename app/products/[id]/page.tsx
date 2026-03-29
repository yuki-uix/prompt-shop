import { getProductById, getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";
import PlatformBadge from "@/components/PlatformBadge";
import BlurredPrompt from "@/components/BlurredPrompt";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};
  return { title: product.title, description: product.description };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-blue-600 hover:underline"
      >
        ← 返回列表
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ImageGallery images={product.images} alt={product.title} />
        </div>

        {/* 标题、平台、价格、使用说明、T2.5 BuyButton */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-3">
            <PlatformBadge platform={product.platform} />
          </div>

          <p className="mt-4 text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>

          <p className="mt-4 leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              使用说明
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {product.usageGuide}
            </p>
          </div>

          {/* T2.5 BuyButton placeholder */}
          <div className="mt-6">
            <div className="flex h-12 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
              购买按钮（即将推出）
            </div>
          </div>
        </div>
      </div>

      <BlurredPrompt previewLength={product.promptContent.length} />
    </>
  );
}
