"use client";

import { useRouter, usePathname } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-lg font-medium text-gray-900">没有找到匹配的商品</p>
      <p className="mt-1 text-sm text-gray-500">
        试试调整筛选条件或搜索关键词
      </p>
      <button
        onClick={() => router.push(pathname, { scroll: false })}
        className="mt-4 text-sm font-medium text-indigo-600 hover:underline"
      >
        清除所有筛选
      </button>
    </div>
  );
}
