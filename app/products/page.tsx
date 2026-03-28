import { ProductCard } from "@/components/product-card";
import { filterProducts } from "@/lib/products";
import type { Platform, Scene } from "@/types/product";
import { PLATFORMS, PLATFORM_LABELS, SCENES, SCENE_LABELS } from "@/types/product";

type SearchParams = {
  platform?: string;
  scene?: string;
  q?: string;
};

function parsePlatform(v: string | undefined): Platform | undefined {
  if (!v) return undefined;
  return PLATFORMS.includes(v as Platform) ? (v as Platform) : undefined;
}

function parseScene(v: string | undefined): Scene | undefined {
  if (!v) return undefined;
  return SCENES.includes(v as Scene) ? (v as Scene) : undefined;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const platform = parsePlatform(sp.platform);
  const scene = parseScene(sp.scene);
  const q = sp.q?.trim() || undefined;

  const items = filterProducts({ platform, scene, q });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          商品目录
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          演示：筛选、搜索与 SSR 列表。素材为占位数据，技术链路为真实目标。
        </p>
      </div>

      <form
        className="mt-8 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40 sm:flex-row sm:flex-wrap sm:items-end"
        method="get"
        action="/products"
      >
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">平台</span>
          <select
            name="platform"
            defaultValue={platform ?? ""}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <option value="">全部</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {PLATFORM_LABELS[p]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">场景</span>
          <select
            name="scene"
            defaultValue={scene ?? ""}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <option value="">全部</option>
            {SCENES.map((s) => (
              <option key={s} value={s}>
                {SCENE_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">关键词</span>
          <input
            name="q"
            type="search"
            defaultValue={q ?? ""}
            placeholder="标题、描述或 prompt"
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            筛选
          </button>
          <a
            href="/products"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            重置
          </a>
        </div>
      </form>

      {items.length === 0 ? (
        <p className="mt-10 text-zinc-600 dark:text-zinc-400">没有匹配的商品，请调整筛选条件。</p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
