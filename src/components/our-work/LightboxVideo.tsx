"use client";

import type { WorkVideo } from "./our-work-data";

export default function LightboxVideo({ video }: { video: WorkVideo }) {
  return (
    <video
      className="lightbox-video"
      src={video.src}
      controls
      autoPlay
      playsInline
    />
  );
}
