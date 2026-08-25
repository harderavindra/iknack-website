import { ImageIcon } from "lucide-react";

export default function ImagePlaceholder({
  label,
  className = "",
  aspect = "aspect-video",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-neutral-700 bg-neutral-900 text-neutral-500 ${className}`}
    >
      <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
      <span className="px-4 text-center text-xs">{label}</span>
    </div>
  );
}
