"use client";

import { useState } from "react";
import Image from "next/image";
import type { WorkImage } from "./our-work-data";

export default function CategoryThumb({ image, onOpen }: { image: WorkImage; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button type="button" className="work-category-thumb" aria-label={`Open ${image.alt} preview`} onClick={onOpen}>
      <span className={`work-thumb-shimmer${loaded ? " work-thumb-shimmer-hide" : ""}`} aria-hidden="true" />
      <Image
        src={image.thumb}
        alt={image.alt}
        fill
        sizes="450px"
        style={{ objectFit: "cover" }}
        className={`work-thumb-img${loaded ? " work-thumb-img-loaded" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </button>
  );
}
