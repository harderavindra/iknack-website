// Keep in sync with next.config.ts `images.remotePatterns` — a pasted/uploaded
// URL whose host isn't allowed there crashes next/image (and the whole page
// that renders it), so admin writes must be validated against the same list.
const ALLOWED_HOSTS = ["emandee.in"];

export function isAllowedMediaUrl(value: string): boolean {
  if (value.startsWith("/")) return true; // same-origin relative path, always safe
  try {
    const url = new URL(value);
    return ALLOWED_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}
