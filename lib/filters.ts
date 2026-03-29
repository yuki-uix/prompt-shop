import type { PublicProduct } from "./types";

export interface FilterParams {
  platform?: string;
  category?: string;
  q?: string;
}

export function parseFilterParams(raw: {
  [key: string]: string | string[] | undefined;
}): FilterParams {
  return {
    platform: typeof raw.platform === "string" ? raw.platform : undefined,
    category: typeof raw.category === "string" ? raw.category : undefined,
    q: typeof raw.q === "string" && raw.q.trim() ? raw.q.trim() : undefined,
  };
}

export function filterProducts(
  products: PublicProduct[],
  params: FilterParams,
): PublicProduct[] {
  let result = products;

  if (params.platform) {
    result = result.filter((p) => p.platform === params.platform);
  }
  if (params.category) {
    result = result.filter((p) => p.category === params.category);
  }
  if (params.q) {
    const lower = params.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower),
    );
  }

  return result;
}
