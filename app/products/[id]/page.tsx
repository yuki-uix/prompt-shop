export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-gray-500">
        Product detail page for <span className="font-mono">{id}</span> — coming
        soon
      </p>
    </div>
  );
}
