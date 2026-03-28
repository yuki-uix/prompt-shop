import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">页面不存在</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">请求的地址没有对应内容。</p>
      <Link
        href="/products"
        className="mt-6 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        返回商品列表
      </Link>
    </div>
  );
}
