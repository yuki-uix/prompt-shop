import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="logo">
            🏷️
          </span>
          <span className="text-xl font-bold text-gray-900">PromptShop</span>
        </Link>
      </div>
    </header>
  );
}
