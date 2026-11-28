import HomeContent from "@/components/home/HomeContent";
import { getHomeBannerSlides } from "@/lib/data/home-banner";
import { getServiceLinks } from "@/lib/data/services";

// Rendered once and served from the CDN; admin saves call revalidatePath() to refresh it
// immediately, and this hourly revalidate is a safety net.
export const revalidate = 3600;

export default async function Home() {
  const [bannerSlides, services] = await Promise.all([getHomeBannerSlides(), getServiceLinks()]);
  return <HomeContent bannerSlides={bannerSlides} services={services} />;
}
