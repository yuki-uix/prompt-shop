import { Suspense } from "react";
import { getAllProducts, getPublicProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { platform } = await searchParams;
  const allProducts = getAllProducts().map(getPublicProduct);

  const products =
    typeof platform === "string"
      ? allProducts.filter((p) => p.platform === platform)
      : allProducts;

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

      <section className="mb-6">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
