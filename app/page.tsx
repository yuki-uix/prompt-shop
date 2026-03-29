import { Suspense } from "react";
import { getAllProducts, getPublicProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { platform, category, q } = await searchParams;
  let products = getAllProducts().map(getPublicProduct);

  if (typeof platform === "string") {
    products = products.filter((p) => p.platform === platform);
  }
  if (typeof category === "string") {
    products = products.filter((p) => p.category === category);
  }
  if (typeof q === "string" && q.trim()) {
    const lower = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower),
    );
  }

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

      <section className="mb-6 space-y-4">
        <Suspense fallback={null}>
          <SearchBar />
          <FilterBar />
        </Suspense>
      </section>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
