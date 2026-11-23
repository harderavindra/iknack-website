import { getDb } from "@/lib/mongodb";

export const HOME_BANNER_SLIDE_COUNT = 3;

export type HomeBannerSlide = {
  type: "video" | "image";
  src: string;
  poster?: string;
};

type HomeBannerDoc = {
  _id: "home";
  slides: HomeBannerSlide[];
  updatedAt: Date;
};

// Shown until an admin saves the banner for the first time (or if a slot is left empty).
export const DEFAULT_HOME_BANNER_SLIDES: HomeBannerSlide[] = [
  { type: "video", src: "/iknack-home-v-1.mp4", poster: "/home-video-img-1.webp" },
  { type: "video", src: "/final-4-mahindra-ganesha.mp4", poster: "/home-video-img-3.webp" },
  { type: "video", src: "/iknack-home-v-4.mp4", poster: "/home-video-img-4.webp" },
];

async function bannerCollection() {
  const db = await getDb();
  return db.collection<HomeBannerDoc>("homeBanner");
}

// Raw saved slides (may contain fewer than 3 entries) — used by the admin form.
export async function getHomeBannerAdmin(): Promise<HomeBannerSlide[]> {
  const doc = await (await bannerCollection()).findOne({ _id: "home" });
  return doc?.slides ?? [];
}

// Slides for the public home page, falling back to the defaults when nothing is saved.
export async function getHomeBannerSlides(): Promise<HomeBannerSlide[]> {
  const saved = (await getHomeBannerAdmin()).filter((s) => s.src);
  return saved.length > 0 ? saved : DEFAULT_HOME_BANNER_SLIDES;
}

export async function saveHomeBanner(slides: HomeBannerSlide[]) {
  await (await bannerCollection()).updateOne(
    { _id: "home" },
    { $set: { slides, updatedAt: new Date() } },
    { upsert: true }
  );
}
