import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PLATFORM_LABELS, SCENE_LABELS } from "@/types/product";
import { formatPrice } from "@/lib/products";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={product.thumbUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {PLATFORM_LABELS[product.platform]}
          </span>
          {product.scenes.map((s) => (
            <span
              key={s}
              className="rounded-md border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              {SCENE_LABELS[s]}
            </span>
          ))}
        </div>
        <h2 className="mt-2 font-medium text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
          {product.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
          {formatPrice(product.priceCents, product.currency)}
        </p>
      </div>
    </Link>
  );
}
