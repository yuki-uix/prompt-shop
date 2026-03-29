"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const PLATFORMS = [
  { value: "midjourney", label: "Midjourney" },
  { value: "flux", label: "FLUX" },
  { value: "ideogram", label: "Ideogram" },
] as const;

const CATEGORIES = [
  { value: "portrait", label: "人像" },
  { value: "scene", label: "场景" },
  { value: "style", label: "风格" },
] as const;

function FilterButtonGroup({
  label,
  paramKey,
  options,
  current,
  onSelect,
}: {
  label: string;
  paramKey: string;
  options: readonly { value: string; label: string }[];
  current: string | null;
  onSelect: (key: string, value: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <button
        onClick={() => onSelect(paramKey, null)}
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
          current === null
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        All
      </button>
      {options.map(({ value, label: optLabel }) => (
        <button
          key={value}
          onClick={() => onSelect(paramKey, value)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            current === value
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {optLabel}
        </button>
      ))}
    </div>
  );
}

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPlatform = searchParams.get("platform");
  const currentCategory = searchParams.get("category");

  function handleSelect(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key);
    if (value === null || current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="space-y-3">
      <FilterButtonGroup
        label="平台:"
        paramKey="platform"
        options={PLATFORMS}
        current={currentPlatform}
        onSelect={handleSelect}
      />
      <FilterButtonGroup
        label="场景:"
        paramKey="category"
        options={CATEGORIES}
        current={currentCategory}
        onSelect={handleSelect}
      />
    </div>
  );
}
