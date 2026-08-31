"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkVideo } from "./our-work-data";

export default function CategoryVideoThumb({
  video,
  isActive,
  onOpen,
}: {
  video: WorkVideo;
  isActive: boolean;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(!!video.poster);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isActive) {
      el.src = video.src;
      el.load();
      el.play().catch(() => {});
    } else if (el.hasAttribute("src")) {
      // Reset the media resource so the poster frame reappears instead of
      // the last-played frame staying frozen on screen.
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
  }, [isActive, video.src]);

  return (
    <button type="button" className="work-category-thumb" aria-label={`Open ${video.alt} preview`} onClick={onOpen}>
      <span className={`work-thumb-shimmer${loaded ? " work-thumb-shimmer-hide" : ""}`} aria-hidden="true" />
      <video
        ref={videoRef}
        className={`work-thumb-video work-thumb-img${loaded ? " work-thumb-img-loaded" : ""}`}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setLoaded(true)}
      />
    </button>
  );
}
