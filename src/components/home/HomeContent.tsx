"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./home.css";
import { INTRO_TEXT, INTRO_HIGHLIGHTS, WHY_US_HOME } from "./home-data";
import HomeBanner from "./HomeBanner";
import type { HomeBannerSlide } from "@/lib/data/home-banner";


export default function HomeContent({
  bannerSlides,
  services,
}: {
  bannerSlides: HomeBannerSlide[];
  services: { slug: string; title: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    const unsubscribeScroll = lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.to(".shape-top", {
        background: "linear-gradient(45deg, #29ABE2, #29ABE2)",
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "0% top", end: "10% top", scrub: 1 },
      });
      gsap.to(".shape-bottom", {
        background: "linear-gradient(45deg, #fff, #fff)",
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "0% top", end: "10% top", scrub: 1 },
      });

      const icon = root.querySelector<HTMLDivElement>(".moving-shape-i");
      if (icon) {
        const getHighlightLeft = () => {
          const highlight = root.querySelector(".intro-highlights li");
          return highlight ? highlight.getBoundingClientRect().left : window.innerWidth / 2;
        };

        gsap.to(icon, {
          width: "14px",
          height: "60px",
          left: getHighlightLeft,
          top: () => window.innerHeight / 2 - 50,
          right: "auto",
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "50% top", scrub: 1, invalidateOnRefresh: true },
        });
      }

      // Black backing for the "i" only between the intro and story sections — never over the
      // banner. A class toggle is derived purely from scroll position on every refresh, so it
      // can't get stuck "on" the way paired fade-in/fade-out tweens could after a reload.
      ScrollTrigger.create({
        trigger: ".intro-section",
        start: "top 15%",
        endTrigger: ".story-section",
        end: "top 60%",
        toggleClass: { targets: ".moving-shape-i", className: "has-backing" },
      });

      gsap.to(".shape-bottom", {
        minHeight: "38px", // white stem ≈ ⅝ of the 60px mark, leaving room for the blue dot
        ease: "none",
        scrollTrigger: { trigger: ".intro-section", start: "-200vh top", end: "-180vh top", scrub: 1 },
      });

      const words = root.querySelectorAll(".intro-text .word");
      gsap.to(words, {
        color: "#29abe2",
        stagger: { each: 1 / Math.max(words.length, 1), from: "start" },
        ease: "none",
        scrollTrigger: { trigger: ".intro-section", start: "0% top", end: "100% top", scrub: 1 },
      });

      gsap.to(".intro-text", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top 80%", end: "top 50%", scrub: 1 },
      });

      gsap.to(".shape-bottom", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top 90%", end: "top 75%", scrub: 1 },
      });
      gsap.to(".shape-top", {
        borderRadius: "20px",
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top 75%", end: "top 60%", scrub: 1 },
      });
      gsap.to(".shape-top", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top 40%", end: "top 20%", scrub: 1 },
      });

      gsap.to(".story-section .text-story", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top 75%", end: "top 60%", scrub: 1 },
      });
      gsap.to(".story-section .text-story", {
        color: "#29abe2",
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top 30%", end: "top 20%", scrub: 1 },
      });
      gsap.to(".story-section .text-moves", {
        opacity: 1,
        width: "auto",
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "0% top", end: "10% top", scrub: 1 },
      });
      gsap.to(".story-section .line-two", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "30% top", end: "40% top", scrub: 1 },
      });

      gsap.utils.toArray<HTMLElement>(".why-item").forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      unsubscribeScroll();
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="home-page"
      ref={containerRef}
    >
      <div className="imoving-area">
        <div className="moving-shape-i">
          <div className="shape-top" />
          <div className="shape-bottom" />
        </div>
      </div>

      <section className="hero-section">
        <HomeBanner slides={bannerSlides} />
      </section>

      <section className="intro-section">
        <div className="intro-content">
          <div className="intro-text">
            <div className="intro-text-content">
              {INTRO_TEXT.split(" ").flatMap((word, i, words) => {
                const span = (
                  <span className="word" key={i}>
                    {word}
                  </span>
                );
                return i < words.length - 1 ? [span, " "] : [span];
              })}
            </div>
          </div>
          <div className="intro-highlights">
            <ul>
              {INTRO_HIGHLIGHTS.map((h) => (
                <li key={h.title}>
                  {h.title}
                  <span>{h.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="story-section">
        <div className="story-content">
          <div className="line-one">
            <span className="text-story" style={{ opacity: 0 }}>
              Stories{" "}
            </span>
            <span className="text-moves" style={{ opacity: 0, width: 0 }}>
              Moves{" "}
            </span>
          </div>
          <div className="line-two" style={{ opacity: 0 }}>
            <span className="text-brand">Brands </span>
            <span className="text-beyond" style={{ color: "#29abe2" }}>
              Beyond{" "}
            </span>
            <span className="text-the">the </span>
            <span className="text-Ordinary">Ordinary</span>
          </div>
        </div>
      </div>

      <section className="service-grid-section" aria-label="Our services">
        <ul className="service-grid">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services#${service.slug}`}>{service.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="why-us-section">
        <div className="why-us-content">
          <h2>Why brands choose iKnack</h2>
          <div className="why-list">
            {WHY_US_HOME.map((item) => (
              <div className="why-item" key={item.number}>
                <h4>{item.title}</h4>
                <div className="info">
                  <p className="text-xl">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
