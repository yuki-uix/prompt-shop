"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const MAX_LENGTH = 100;
const WARN_THRESHOLD = 80;

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = searchParams.get("q") ?? "";
  const [draft, setDraft] = useState(urlQuery);
  const [inputFocused, setInputFocused] = useState(false);
  const inputFocusedRef = useRef(false);
  const isFirstRender = useRef(true);

  const displayQuery = inputFocused ? draft : urlQuery;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!inputFocusedRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (draft.trim()) {
        params.set("q", draft.trim());
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [draft, searchParams, router, pathname]);

  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="text"
        value={displayQuery}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={() => {
          inputFocusedRef.current = true;
          setInputFocused(true);
          setDraft(urlQuery);
        }}
        onBlur={() => {
          inputFocusedRef.current = false;
          setInputFocused(false);
        }}
        maxLength={MAX_LENGTH}
        placeholder="Search prompts..."
        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-16 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      {displayQuery.length >= WARN_THRESHOLD && (
        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
            displayQuery.length >= MAX_LENGTH ? "text-red-500" : "text-gray-400"
          }`}
        >
          {displayQuery.length}/{MAX_LENGTH}
        </span>
      )}
    </div>
  );
}
