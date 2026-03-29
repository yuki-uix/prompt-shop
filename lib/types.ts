export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // cents (Stripe requirement)
  currency: string;
  platform: "midjourney" | "flux" | "ideogram";
  category: "portrait" | "scene" | "style";
  promptContent: string;
  images: string[];
  usageGuide: string;
  createdAt: string; // ISO 8601
}

export type PublicProduct = Omit<Product, "promptContent">;
