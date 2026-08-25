"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollColorReveal({
  text,
  className = "",
  fromColor = "#525252",
  toColor = "#38bdf8",
}: {
  text: string;
  className?: string;
  fromColor?: string;
  toColor?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("span"),
        { color: fromColor },
        {
          color: toColor,
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [fromColor, toColor]);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ color: fromColor }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
