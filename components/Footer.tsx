export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 md:px-8">
        © {new Date().getFullYear()} PromptShop. Built with Next.js.
      </div>
    </footer>
  );
}
