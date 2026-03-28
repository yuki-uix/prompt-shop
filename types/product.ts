export type Platform = "midjourney" | "flux" | "ideogram";

export type Scene = "portrait" | "scene" | "style";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  usageInstructions: string;
  platform: Platform;
  scenes: Scene[];
  priceCents: number;
  currency: string;
  thumbUrl: string;
  previewUrl: string;
  promptText: string;
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  midjourney: "Midjourney",
  flux: "FLUX",
  ideogram: "Ideogram",
};

export const SCENE_LABELS: Record<Scene, string> = {
  portrait: "人像",
  scene: "场景",
  style: "风格",
};

export const PLATFORMS: Platform[] = ["midjourney", "flux", "ideogram"];
export const SCENES: Scene[] = ["portrait", "scene", "style"];
