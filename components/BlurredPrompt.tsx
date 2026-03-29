interface Props {
  previewLength: number;
}

function generatePlaceholder(length: number): string {
  const words =
    "a beautiful portrait with soft natural lighting, cinematic quality, dramatic shadows and highlights, ";
  let result = "";
  while (result.length < length) result += words;
  return result.slice(0, length);
}

export default function BlurredPrompt({ previewLength }: Props) {
  const placeholder = generatePlaceholder(previewLength);

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Prompt 预览
      </h2>
      <div className="relative overflow-hidden rounded-lg border border-gray-200 p-6">
        <p
          className="pointer-events-none select-none font-mono text-sm leading-relaxed text-gray-800 blur-sm"
          aria-hidden="true"
        >
          {placeholder}
        </p>
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <div className="text-center">
            <span className="text-2xl">🔒</span>
            <p className="mt-2 text-sm font-medium text-gray-700">
              购买后解锁完整内容
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
