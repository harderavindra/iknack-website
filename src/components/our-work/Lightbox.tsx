"use client";

import { useEffect, useCallback, useState, type ReactNode } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const CLOSE_TRANSITION_MS = 250; // keep in sync with `.lightbox` transition in our-work.css

export default function Lightbox<T>({
  items,
  index,
  onClose,
  onNavigate,
  renderItem,
}: {
  items: T[];
  index: number | null;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
  renderItem: (item: T) => ReactNode;
}) {
  const isOpen = index !== null;

  // Remember the last non-null index so the image stays visible while the
  // CSS closing transition plays, instead of vanishing the instant it closes.
  const [renderIndex, setRenderIndex] = useState<number | null>(index);
  if (index !== null && index !== renderIndex) {
    setRenderIndex(index);
  }

  // Once the 0.25s closing fade has finished, unmount the item. Otherwise a lightbox video
  // stays mounted while hidden — its audio keeps playing and it keeps downloading.
  useEffect(() => {
    if (isOpen) return;
    const timer = window.setTimeout(() => setRenderIndex(null), CLOSE_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

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

  const item = items[renderIndex];

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
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image-wrap" key={renderIndex}>
          {renderItem(item)}
        </div>
      </div>

      <button
        type="button"
        className="lightbox-nav lightbox-next"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <p className="lightbox-caption">
        {renderIndex + 1} / {items.length}
      </p>
    </div>
  );
}
