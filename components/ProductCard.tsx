import Link from "next/link";
import type { PublicProduct } from "@/lib/types";

const platformLabel: Record<PublicProduct["platform"], string> = {
  midjourney: "Midjourney",
  flux: "FLUX",
  ideogram: "Ideogram",
};

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ProductCard({ product }: { product: PublicProduct }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
        {platformLabel[product.platform]}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
        {product.title}
      </h2>
      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
        {product.description}
      </p>
      <p className="mt-4 text-base font-bold text-gray-900">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
