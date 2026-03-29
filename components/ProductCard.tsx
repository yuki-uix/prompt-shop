import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { PublicProduct } from "@/lib/types";
import PlatformBadge from "@/components/PlatformBadge";

export default function ProductCard({ product }: { product: PublicProduct }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-4/3 bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <PlatformBadge platform={product.platform} />
        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          {product.title}
        </h3>
        <p className="mt-2 text-xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
