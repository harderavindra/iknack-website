"use client";

import { useState } from "react";
import Image from "next/image";
import type { WorkImage } from "./our-work-data";

export default function LightboxImage({ image }: { image: WorkImage }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <span className="lightbox-spinner" aria-hidden="true" />}
      <Image
        src={image.full}
        alt={image.alt}
        fill
        sizes="90vw"
        style={{ objectFit: "contain" }}
        priority
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
