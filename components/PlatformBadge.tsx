import type { Product } from "@/lib/types";

type Platform = Product["platform"];

const config: Record<Platform, { label: string; className: string }> = {
  midjourney: {
    label: "Midjourney",
    className: "bg-blue-100 text-blue-800",
  },
  flux: {
    label: "FLUX",
    className: "bg-purple-100 text-purple-800",
  },
  ideogram: {
    label: "Ideogram",
    className: "bg-amber-100 text-amber-800",
  },
};

export default function PlatformBadge({ platform }: { platform: Platform }) {
  const { label, className } = config[platform];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase ${className}`}
    >
      {label}
    </span>
  );
}
