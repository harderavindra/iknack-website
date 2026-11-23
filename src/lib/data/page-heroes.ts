import { getDb } from "@/lib/mongodb";

export type PageHeroKey = "services" | "our-work";

export type PageHeroMedia = {
  type: "video" | "image";
  src: string;
  poster?: string;
};

export const PAGE_HEROES: { key: PageHeroKey; label: string; path: string }[] = [
  { key: "services", label: "Services", path: "/services" },
  { key: "our-work", label: "Our Work", path: "/our-work" },
];

// Shown until an admin uploads media for that page.
export const DEFAULT_PAGE_HEROES: Record<PageHeroKey, PageHeroMedia> = {
  services: { type: "video", src: "/service/service-v1.mp4" },
  "our-work": { type: "video", src: "/service-hero-video.mp4" },
};

type PageHeroDoc = PageHeroMedia & { _id: PageHeroKey; updatedAt: Date };

async function heroCollection() {
  const db = await getDb();
  return db.collection<PageHeroDoc>("pageHeroes");
}

// Saved media per page (missing keys = nothing saved yet) — used by the admin form.
export async function getPageHeroesAdmin(): Promise<Partial<Record<PageHeroKey, PageHeroMedia>>> {
  const docs = await (await heroCollection()).find().toArray();
  return Object.fromEntries(docs.map(({ _id, type, src, poster }) => [_id, { type, src, ...(poster ? { poster } : {}) }]));
}

export async function getPageHero(key: PageHeroKey): Promise<PageHeroMedia> {
  const doc = await (await heroCollection()).findOne({ _id: key });
  if (!doc?.src) return DEFAULT_PAGE_HEROES[key];
  return { type: doc.type, src: doc.src, ...(doc.poster ? { poster: doc.poster } : {}) };
}

export async function savePageHero(key: PageHeroKey, media: PageHeroMedia | null) {
  const col = await heroCollection();
  if (!media) {
    await col.deleteOne({ _id: key });
    return;
  }
  await col.replaceOne({ _id: key }, { ...media, updatedAt: new Date() }, { upsert: true });
}
