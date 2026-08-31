"use client";

import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import type { ServiceCategory } from "./services-data";

export default function ServiceRow({ service }: { service: ServiceCategory }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!video.dataset.loaded) {
            video.dataset.loaded = "true";
            video.src = video.dataset.src ?? "";
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-8 py-16 first:pt-0 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-12">
      <div>
        <h2 className="text-4xl font-bold text-white md:text-5xl">{service.title}</h2>
        <h3 className="mt-2 text-base font-light italic text-neutral-500">{service.subtitle}</h3>
        <p className="mt-6 max-w-2xl leading-relaxed text-neutral-300">{service.description}</p>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {service.links.map((link) => (
            <div key={link} className="flex items-center gap-2 text-sky-400">
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span>{link}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-900 lg:w-80">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          data-src={service.video}
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
    </div>
  );
}
