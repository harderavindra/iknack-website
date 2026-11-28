// Uploaded files are stored as "/api/media/iknack/..." and that route redirects to Google
// Cloud Storage. next/image must not optimise them: the optimiser would pull every image
// through Vercel (function + image-optimisation usage), which is exactly what we avoid.
// Safe to import from client components (no server-only dependencies).
export function isUploadedMedia(src: string | undefined): boolean {
  return !!src && src.startsWith("/api/media/");
}
