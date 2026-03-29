import { getAllProducts, getPublicProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = getAllProducts().map(getPublicProduct);

  return (
    <>
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Explore Prompts
        </h1>
        <p className="mt-2 text-gray-500">
          Discover high-quality AI prompts for Midjourney, FLUX, and Ideogram.
        </p>
      </section>

      {/* 筛选/搜索区 — T1.3 ~ T1.5 填充 */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
