"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { isUploadedMedia } from "@/lib/media-url";
import type { HomeBannerSlide } from "@/lib/data/home-banner";

const SLIDE_INTERVAL_MS = 3000;

export default function HomeBanner({ slides }: { slides: HomeBannerSlide[] }) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Re-armed on every change, so clicking a dot also gives that slide a full 3s.
  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [active, slides.length]);

  // Only the visible video plays; the others pause and rewind so each starts fresh.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [active]);

  return (
    <div className="home-banner" aria-roledescription="carousel" aria-label="Featured work">
      {slides.map((slide, i) => (
        <div
          key={`${slide.src}-${i}`}
          className={`home-banner-slide${i === active ? " is-active" : ""}`}
          aria-hidden={i !== active}
        >
          {slide.type === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={slide.src}
              poster={slide.poster}
              muted
              loop
              playsInline
              autoPlay={i === 0}
              preload={i === 0 ? "auto" : "metadata"}
            />
          ) : (
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              unoptimized={isUploadedMedia(slide.src)}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      ))}

      {slides.length > 1 && (
        <div className="home-banner-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === active ? "is-active" : undefined}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
