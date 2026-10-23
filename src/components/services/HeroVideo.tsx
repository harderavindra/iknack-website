"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Setting `muted` as a JSX attribute can race hydration — browsers only
    // honor autoplay once `.muted` is true as a DOM *property*, so a video
    // that tries to autoplay before React finishes hydrating can get silently
    // blocked and stay on a black frame. Setting it explicitly here avoids that.
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-sky-300/20 transition-opacity duration-500 ${loaded ? "pointer-events-none opacity-0" : "opacity-100"}`}
      />
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
      />
    </>
  );
}
