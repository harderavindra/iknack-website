"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import CategoryThumb from "./CategoryThumb";
import Lightbox from "./Lightbox";
import type { WorkCategory } from "./our-work-data";
import "swiper/css";

export default function CategoryRow({ category }: { category: WorkCategory }) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = category.images;

  return (
    <section className="work-category" id={category.id}>
      <div className="work-category-header">
        <h2>{category.title}</h2>
        <div className="work-category-nav">
          <button
            type="button"
            aria-label={`Scroll ${category.title} left`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${category.title} right`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        className="work-category-track"
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        speed={600}
      >
        {Array.from({ length: category.itemCount }).map((_, i) => {
          const image = images?.[i];
          return (
            <SwiperSlide key={i}>
              <div className="work-category-item-inner">
                {image ? (
                  <CategoryThumb image={image} onOpen={() => setLightboxIndex(i)} />
                ) : (
                  <ImagePlaceholder label={`${category.title} — item ${i + 1}`} aspect="aspect-[4/3]" />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {images && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(dir) =>
            setLightboxIndex((current) => {
              if (current === null) return current;
              return (current + dir + images.length) % images.length;
            })
          }
        />
      )}
    </section>
  );
}
