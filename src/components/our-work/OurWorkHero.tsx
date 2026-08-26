"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./our-work.css";

export default function OurWorkHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".hero-video", {
        width: "100vw",
        height: "80vh",
        borderRadius: "0px",
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600",
          scrub: 1,
          pin: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-video-section" ref={sectionRef}>
      <div className="hero-video-content">
        <video className="hero-video" src="/service-hero-video.mp4" autoPlay muted loop playsInline preload="auto" />
        
      </div>
      <div className="hero-video-overlay">
          <h1>
            Every project reflects
            <br />
            our commitment to storytelling,
            <br />
            innovation, and results.
          </h1>
        </div>
    </div>
  );
}
