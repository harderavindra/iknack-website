import Image from "next/image";
import HeroVideo from "@/components/services/HeroVideo";
import type { PageHeroMedia } from "@/lib/data/page-heroes";

// Full-width hero shared by /about, /services and /our-work, so they are all the same size.
export default function PageHero({ media }: { media: PageHeroMedia }) {
  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-background">
      {media.type === "video" ? (
        <HeroVideo src={media.src} poster={media.poster} />
      ) : (
        <Image src={media.src} alt="" fill priority sizes="100vw" className="object-cover" />
      )}
    </section>
  );
}
