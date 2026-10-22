import type { Metadata } from "next";
import ServiceRow from "@/components/services/ServiceRow";
import { SERVICE_CATEGORIES } from "@/components/services/services-data";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Services",
  description: "Integrated creative services with seamless execution.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="grid h-[85vh] min-h-[560px] grid-cols-2 grid-rows-2 bg-black">
        <div className="relative h-full w-full overflow-hidden rounded-br-[100px] sm:rounded-br-[180px] lg:rounded-br-[320px]">
          <video
            className="h-full w-full object-cover"
            src="/service/Service-V1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-bl-[100px] sm:rounded-bl-[180px] lg:rounded-bl-[320px]">
          <video
            className="h-full w-full object-cover"
            src="/service/Service-V2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-tr-[100px] sm:rounded-tr-[180px] lg:rounded-tr-[320px]">
          <video
            className="h-full w-full object-cover"
            src="/service/Service-V3.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-tl-[100px] sm:rounded-tl-[180px] lg:rounded-tl-[320px]">
          <video
            className="h-full w-full object-cover"
            src="/service/Service-Thumb-V-5.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </section>

      <div className="flex justify-center bg-black px-6 py-10 sm:px-10 lg:px-16">
        <FadeInOnScroll>
          <h1 className="text-center text-2xl font-bold leading-tight whitespace-nowrap text-white sm:text-3xl">
            Creative solutions crafted for impact.
          </h1>
        </FadeInOnScroll>
      </div>

      <section className="px-4 py-20 md:px-0 md:py-28 max-w-6xl mx-auto">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[160px_1fr]">
          <div>
            <span className="text-lg font-medium text-white md:sticky md:top-32">Our Services</span>
          </div>
          <div className="divide-y divide-white/10">
            {SERVICE_CATEGORIES.map((service) => (
              <ServiceRow key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
