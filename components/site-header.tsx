import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/products" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Commerce SaaS · Portfolio
        </Link>
        <nav className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/products" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            商品
          </Link>
        </nav>
      </div>
    </header>
  );
}
