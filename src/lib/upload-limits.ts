// Shared by the admin upload UI (MediaSlot) and /api/admin/upload-url so both enforce the
// same rules. Safe to import from client components.
export const MAX_UPLOAD_BYTES = {
  video: 100 * 1024 * 1024, // 100 MB — web-ready MP4s; export larger masters at lower bitrate
  image: 10 * 1024 * 1024, // 10 MB
} as const;

export type MediaKind = keyof typeof MAX_UPLOAD_BYTES;

const EXTENSION_TYPES: Record<string, string> = {
  mp4: "video/mp4",
  m4v: "video/mp4",
  mov: "video/quicktime",
  webm: "video/webm",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
};

// Browsers sometimes report an empty type (e.g. some .mov files) — fall back to the extension.
export function resolveContentType(file: { name: string; type: string }): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_TYPES[ext] ?? "";
}

export function mediaKindOf(contentType: string): MediaKind | null {
  if (/^video\/[\w.+-]+$/.test(contentType)) return "video";
  if (/^image\/[\w.+-]+$/.test(contentType)) return "image";
  return null;
}

export function formatMB(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

// Returns a human-readable problem, or null when the file is acceptable.
export function validateUpload(contentType: string, size: number, expected?: MediaKind): string | null {
  const kind = mediaKindOf(contentType);
  if (!kind) return "Unsupported file type. Upload an image or a video.";
  if (expected && kind !== expected) return `Please upload ${expected === "video" ? "a video" : "an image"} here.`;
  const max = MAX_UPLOAD_BYTES[kind];
  if (size > max) return `File is ${formatMB(size)} — the limit for ${kind}s is ${formatMB(max)}.`;
  return null;
}
