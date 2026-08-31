export type WorkImage = {
  thumb: string;
  full: string;
  alt: string;
};

export type WorkVideo = {
  src: string;
  poster?: string;
  alt: string;
};

export type WorkCategory = {
  id: string;
  title: string;
  itemCount: number;
  images?: WorkImage[];
  videos?: WorkVideo[];
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

const BRANDING_IMAGES: WorkImage[] = [
  { thumb: "/work/branding/jugalbandi-branding-thumb.jpg", full: "/work/branding/jugalbandi-branding.jpg", alt: "Jugalbandi — brand identity" },
  { thumb: "/work/branding/the-good-share-branding-thumb.jpg", full: "/work/branding/the-good-share-branding.jpg", alt: "The Good Share — brand identity" },
  { thumb: "/work/branding/ikim-branding-thumb.jpg", full: "/work/branding/ikim-branding.jpg", alt: "i'kim — brand identity" },
];

const SOCIAL_IMAGES: WorkImage[] = [
  { thumb: "/work/social/mbull-features-posts-thumb.jpg", full: "/work/social/mbull-features-posts.jpg", alt: "mBull features — social posts" },
  { thumb: "/work/social/mahindra-festive-posts-thumb.jpg", full: "/work/social/mahindra-festive-posts.jpg", alt: "Mahindra festive — social posts" },
];

const AI_VIDEOS: WorkVideo[] = [
  { src: "/work/ai-videos/akshay-tritiya-reel.mp4", poster: "/work/ai-videos/akshay-tritiya-reel.jpg", alt: "Akshay Tritiya — Reel" },
  { src: "/work/ai-videos/combine-festival-reel.mp4", poster: "/work/ai-videos/combine-festival-reel.jpg", alt: "Combine Festival — Reel" },
  { src: "/work/ai-videos/coolant-caretip-reel.mp4", poster: "/work/ai-videos/coolant-caretip-reel.jpg", alt: "Coolant Care Tip — Reel" },
  { src: "/work/ai-videos/dussera-post.mp4", poster: "/work/ai-videos/dussera-post.jpg", alt: "Dussehra — Post" },
  { src: "/work/ai-videos/gandhi-jayanti-reel.mp4", poster: "/work/ai-videos/gandhi-jayanti-reel.jpg", alt: "Gandhi Jayanti — Reel" },
  { src: "/work/ai-videos/gujrat-day-reel.mp4", poster: "/work/ai-videos/gujrat-day-reel.jpg", alt: "Gujarat Day — Reel" },
  { src: "/work/ai-videos/kavedia-jwellery-reel.mp4", poster: "/work/ai-videos/kavedia-jwellery-reel.jpg", alt: "Kavedia Jewellery — Reel" },
  { src: "/work/ai-videos/labour-day-reel.mp4", poster: "/work/ai-videos/labour-day-reel.jpg", alt: "Labour Day — Reel" },
  { src: "/work/ai-videos/maharashtra-day-cut-4.mp4", poster: "/work/ai-videos/maharashtra-day-cut-4.jpg", alt: "Maharashtra Day — Cut 4" },
  { src: "/work/ai-videos/makar-sankrant-reel.mp4", alt: "Makar Sankranti — Reel" },
  { src: "/work/ai-videos/new-year-reel.mp4", poster: "/work/ai-videos/new-year-reel.jpg", alt: "New Year — Reel" },
  { src: "/work/ai-videos/shivjayanti-reel.mp4", poster: "/work/ai-videos/shivjayanti-reel.jpg", alt: "Shiv Jayanti — Reel" },
  { src: "/work/ai-videos/steering-caretip-reel.mp4", poster: "/work/ai-videos/steering-caretip-reel.jpg", alt: "Steering Care Tip — Reel" },
  { src: "/work/ai-videos/yoga-day-reel.mp4", poster: "/work/ai-videos/yoga-day-reel.jpg", alt: "International Yoga Day — Reel" },
  { src: "/work/ai-videos/mahindra-yuvo-tech-plus-gif.mp4", alt: "Mahindra Yuvo Tech+ — GIF" },
];

const SHORT_CLIPS_VIDEOS: WorkVideo[] = [
  { src: "/work/shorts/265-xp-orchard-final-hd.mp4", poster: "/work/shorts/265-xp-orchard-final-hd.jpg", alt: "265 XP Orchard — Final HD" },
  { src: "/work/shorts/2wd-hero-film-mutes.mp4", poster: "/work/shorts/2wd-hero-film-mutes.jpg", alt: "2WD Hero Film" },
  { src: "/work/shorts/4wd-hero-film-mutes.mp4", poster: "/work/shorts/4wd-hero-film-mutes.jpg", alt: "4WD Hero Film" },
  { src: "/work/shorts/ecodryft-blue.mp4", poster: "/work/shorts/ecodryft-blue.jpg", alt: "Ecodryft — Blue" },
  { src: "/work/shorts/ecodryft-red.mp4", poster: "/work/shorts/ecodryft-red.jpg", alt: "Ecodryft — Red" },
  { src: "/work/shorts/final-4-mahindra-ganesha.mp4", poster: "/work/shorts/final-4-mahindra-ganesha.jpg", alt: "Final 4 — Mahindra Ganesha" },
  { src: "/work/shorts/mah-275-pp-azam-variation-cut-1.mp4", poster: "/work/shorts/mah-275-pp-azam-variation-cut-1.jpg", alt: "Mahindra 275 PP Azam — Variation Cut 1" },
  { src: "/work/shorts/mah-275-pp-azam-variation-cut-2.mp4", poster: "/work/shorts/mah-275-pp-azam-variation-cut-2.jpg", alt: "Mahindra 275 PP Azam — Variation Cut 2" },
  { src: "/work/shorts/mahindra-areca-nut-timeline-final-hd-1.mp4", poster: "/work/shorts/mahindra-areca-nut-timeline-final-hd-1.jpg", alt: "Mahindra Areca Nut Timeline — Final HD 1" },
  { src: "/work/shorts/mahindra-areca-nut-timeline-final-hd-2.mp4", poster: "/work/shorts/mahindra-areca-nut-timeline-final-hd-2.jpg", alt: "Mahindra Areca Nut Timeline — Final HD 2" },
  { src: "/work/shorts/mahindra-jivo-master-2.mp4", poster: "/work/shorts/mahindra-jivo-master-2.jpg", alt: "Mahindra Jivo Master 2" },
  { src: "/work/shorts/mahindra-jivo-master-corrected.mp4", poster: "/work/shorts/mahindra-jivo-master-corrected.jpg", alt: "Mahindra Jivo Master — Corrected" },
  { src: "/work/shorts/mahindra-republic-day-2022.mp4", poster: "/work/shorts/mahindra-republic-day-2022.jpg", alt: "Mahindra Republic Day 2022" },
  { src: "/work/shorts/mahindra-republic-day-2022-2.mp4", poster: "/work/shorts/mahindra-republic-day-2022-2.jpg", alt: "Mahindra Republic Day 2022 — Cut 2" },
  { src: "/work/shorts/mahindra-tractors-womens-day-desh-ki-shakti.mp4", poster: "/work/shorts/mahindra-tractors-womens-day-desh-ki-shakti.jpg", alt: "Mahindra Tractors — Women's Day, Desh Ki Shakti" },
  { src: "/work/shorts/navin-245-spraymaxx-new-branding.mp4", alt: "Navin 245 Spraymaxx — New Branding" },
  { src: "/work/shorts/oja-onion-planter-walkaround.mp4", poster: "/work/shorts/oja-onion-planter-walkaround.jpg", alt: "Oja Onion Planter — Walkaround HD" },
  { src: "/work/shorts/re-metallic-logo.mp4", poster: "/work/shorts/re-metallic-logo.jpg", alt: "RE — Metallic Logo" },
];

export const WORK_CATEGORIES: WorkCategory[] = [
  { id: "ai-videos", title: "AI Videos", itemCount: AI_VIDEOS.length, videos: AI_VIDEOS },
  { id: "branding", title: "Branding", itemCount: BRANDING_IMAGES.length, images: BRANDING_IMAGES },
  { id: "packaging", title: "Packaging", itemCount: PACKAGING_IMAGES.length, images: PACKAGING_IMAGES },
  { id: "print", title: "Print", itemCount: PRINT_IMAGES.length, images: PRINT_IMAGES },
  { id: "short-clips", title: "Short Clips", itemCount: SHORT_CLIPS_VIDEOS.length, videos: SHORT_CLIPS_VIDEOS },
  { id: "social-media", title: "Social Media", itemCount: SOCIAL_IMAGES.length, images: SOCIAL_IMAGES },
];
