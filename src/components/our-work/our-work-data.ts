export type WorkImage = {
  thumb: string;
  full: string;
  alt: string;
};

export type WorkCategory = {
  id: string;
  title: string;
  itemCount: number;
  images?: WorkImage[];
};

const PACKAGING_IMAGES: WorkImage[] = [
  { thumb: "/work/packaging/aabad-mockup-1-thumb.jpg", full: "/work/packaging/aabad-mockup-1-full.jpg", alt: "Aabad packaging mockup 1" },
  { thumb: "/work/packaging/aabad-mockup-6-thumb.jpg", full: "/work/packaging/aabad-mockup-6-full.jpg", alt: "Aabad packaging mockup 6" },
  { thumb: "/work/packaging/aabad-mockup-9-thumb.jpg", full: "/work/packaging/aabad-mockup-9-full.jpg", alt: "Aabad packaging mockup 9" },
  { thumb: "/work/packaging/aabad-mockup-10-thumb.jpg", full: "/work/packaging/aabad-mockup-10-full.jpg", alt: "Aabad packaging mockup 10" },
  { thumb: "/work/packaging/coconut-cookies-thumb.jpg", full: "/work/packaging/coconut-cookies-full.jpg", alt: "Coconut cookies packaging" },
  { thumb: "/work/packaging/jeera-cookies-thumb.jpg", full: "/work/packaging/jeera-cookies-full.jpg", alt: "Jeera cookies packaging" },
  { thumb: "/work/packaging/milk-shakes-group-thumb.jpg", full: "/work/packaging/milk-shakes-group-full.jpg", alt: "Milk shakes group packaging" },
  { thumb: "/work/packaging/mix-dry-fruit-cookies-thumb.jpg", full: "/work/packaging/mix-dry-fruit-cookies-full.jpg", alt: "Mix dry fruit cookies packaging" },
];

const PRINT_IMAGES: WorkImage[] = [
  { thumb: "/work/print/mockup-16x9-2-thumb.jpg", full: "/work/print/mockup-16x9-2-full.jpg", alt: "Print mockup 16x9 — 2" },
  { thumb: "/work/print/mockup-16x9-3-thumb.jpg", full: "/work/print/mockup-16x9-3-full.jpg", alt: "Print mockup 16x9 — 3" },
  { thumb: "/work/print/mockup-9x16-1-thumb.jpg", full: "/work/print/mockup-9x16-1-full.jpg", alt: "Print mockup 9x16 — 1" },
];

export const WORK_CATEGORIES: WorkCategory[] = [
  { id: "ai-videos", title: "AI Videos", itemCount: 6 },
  { id: "branding", title: "Branding", itemCount: 5 },
  { id: "packaging", title: "Packaging", itemCount: PACKAGING_IMAGES.length, images: PACKAGING_IMAGES },
  { id: "print", title: "Print", itemCount: PRINT_IMAGES.length, images: PRINT_IMAGES },
  { id: "short-clips", title: "Short Clips", itemCount: 6 },
  { id: "social-media", title: "Social Media", itemCount: 5 },
];
