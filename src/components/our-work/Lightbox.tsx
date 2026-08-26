"use client";

import { useEffect, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import LightboxImage from "./LightboxImage";
import type { WorkImage } from "./our-work-data";

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: WorkImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}) {
  const isOpen = index !== null;

  // Remember the last non-null index so the image stays visible while the
  // CSS closing transition plays, instead of vanishing the instant it closes.
  const [renderIndex, setRenderIndex] = useState<number | null>(index);
  if (index !== null && index !== renderIndex) {
    setRenderIndex(index);
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (renderIndex === null) return null;

  const image = images[renderIndex];

  return (
    <div
      className={`lightbox${isOpen ? " lightbox-visible" : ""}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <button type="button" className="lightbox-close" aria-label="Close preview" onClick={onClose}>
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        className="lightbox-nav lightbox-prev"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image-wrap" key={renderIndex}>
          <LightboxImage image={image} />
        </div>
      </div>

      <button
        type="button"
        className="lightbox-nav lightbox-next"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <p className="lightbox-caption">
        {renderIndex + 1} / {images.length}
      </p>
    </div>
  );
}
