import type { Product, PublicProduct } from "./types";
import productsData from "@/data/products.json";

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getPublicProduct(product: Product): PublicProduct {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { promptContent, ...publicFields } = product;
  return publicFields;
}

export function getAllPublicProducts(): PublicProduct[] {
  return products.map(getPublicProduct);
}
