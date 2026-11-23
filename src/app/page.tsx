import HomeContent from "@/components/home/HomeContent";
import { getHomeBannerSlides } from "@/lib/data/home-banner";
import { getServiceLinks } from "@/lib/data/services";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [bannerSlides, services] = await Promise.all([getHomeBannerSlides(), getServiceLinks()]);
  return <HomeContent bannerSlides={bannerSlides} services={services} />;
}
