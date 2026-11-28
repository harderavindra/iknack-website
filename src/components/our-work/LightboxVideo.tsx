"use client";

import type { WorkVideo } from "./our-work-data";

export default function LightboxVideo({ video }: { video: WorkVideo }) {
  return (
    <video
      className="lightbox-video"
      src={video.src}
      poster={video.poster}
      aria-label={video.alt}
      controls
      autoPlay
      playsInline
    />
  );
}
