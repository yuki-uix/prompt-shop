import productsData from "@/data/products.json";
import type { Platform, Product, Scene } from "@/types/product";

const products = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}

export type ProductFilters = {
  platform?: Platform;
  scene?: Scene;
  q?: string;
};

function matchesQuery(product: Product, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const hay = `${product.title} ${product.description} ${product.promptText}`.toLowerCase();
  return hay.includes(s);
}

export function filterProducts(filters: ProductFilters): Product[] {
  return products.filter((p) => {
    if (filters.platform && p.platform !== filters.platform) return false;
    if (filters.scene && !p.scenes.includes(filters.scene)) return false;
    if (filters.q && !matchesQuery(p, filters.q)) return false;
    return true;
  });
}

export function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}
