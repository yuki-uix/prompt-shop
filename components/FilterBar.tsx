"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const PLATFORMS = [
  { value: "midjourney", label: "Midjourney" },
  { value: "flux", label: "FLUX" },
  { value: "ideogram", label: "Ideogram" },
] as const;

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPlatform = searchParams.get("platform");

  function handleFilter(platform: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (platform === null || currentPlatform === platform) {
      params.delete("platform");
    } else {
      params.set("platform", platform);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-500">平台:</span>
      <button
        onClick={() => handleFilter(null)}
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
          currentPlatform === null
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        All
      </button>
      {PLATFORMS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleFilter(value)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            currentPlatform === value
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
