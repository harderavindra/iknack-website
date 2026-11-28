"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./home.css";
import { INTRO_TITLE, INTRO_PARAGRAPHS, INTRO_HIGHLIGHTS, WHY_US_HOME } from "./home-data";

// Each word is its own span so the scroll animation can colour them one by one.
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return words.flatMap((word, i) => {
    const span = (
      <span className="word" key={i}>
        {word}
      </span>
    );
    return i < words.length - 1 ? [span, " "] : [span];
  });
}
import HomeBanner from "./HomeBanner";
import type { HomeBannerSlide } from "@/lib/data/home-banner";
import type { ServiceLink } from "@/lib/data/services";


export default function HomeContent({
  bannerSlides,
  services,
}: {
  bannerSlides: HomeBannerSlide[];
  services: ServiceLink[];
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
      const LAST_WORD = ".intro-highlights li:last-child";
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
        const ICON_WIDTH = 15;
        const ICON_HEIGHT = 56;
        // The shape lands exactly on the faded "I" of the first highlight word, at the moment
        // that word reaches the middle of the screen — so it follows the intro layout/spacing.
        const getInitialBox = () => {
          const initial = root.querySelector(".intro-highlights .hl-initial");
          if (!initial) return null;
          const rect = initial.getBoundingClientRect();
          return { left: rect.left, width: rect.width, docCenterY: rect.top + window.scrollY + rect.height / 2 };
        };
        const getLandingScroll = () => {
          const box = getInitialBox();
          return box ? Math.max(box.docCenterY - window.innerHeight / 2, 1) : window.innerHeight / 2;
        };

        // Shrink to the small "i" quickly, while still over the banner, so the big shape never
        // covers the intro words…
        gsap.to(icon, {
          width: `${ICON_WIDTH}px`,
          height: `${ICON_HEIGHT}px`,
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "25% top", scrub: 1 },
        });
        // Blue dot becomes a fixed 14×14 square (width comes from the 14px icon). It's a flex
        // child with `flex: 1` (basis 0), so its size is set via flex-basis, not height.
        gsap.to(".shape-top", {
          flexBasis: "14px",
          flexGrow: 0,
          flexShrink: 0,
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "25% top", scrub: 1 },
        });

        // …then glide it onto the faded "I".
        gsap.to(icon, {
          left: () => {
            const box = getInitialBox();
            return box ? box.left + box.width / 2 - ICON_WIDTH / 2 : window.innerWidth / 2;
          },
          top: () => window.innerHeight / 2 - ICON_HEIGHT / 2,
          right: "auto",
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: getLandingScroll,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Black backing for the "i" only between the intro and story sections — never over the
      // banner. A class toggle is derived purely from scroll position on every refresh, so it
      // can't get stuck "on" the way paired fade-in/fade-out tweens could after a reload.
      ScrollTrigger.create({
        trigger: ".intro-section",
        start: "top 15%",
        endTrigger: ".intro-highlights li:last-child",
        end: "top 30%",
        toggleClass: { targets: ".moving-shape-i", className: "has-backing" },
      });

      gsap.to(".shape-bottom", {
        minHeight: "36px", // white stem: 56px mark − 14px blue square − ~6px gap
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
        scrollTrigger: { trigger: LAST_WORD, start: "top 50%", end: "top 42%", scrub: 1 },
      });
      // The "i" sits at mid-screen. Its exit starts as the last word (INTUITIVE) passes it and is
      // done quickly, over the dark intro background, before the story section arrives.
      gsap.to(".shape-top", {
        borderRadius: "20px",
        ease: "none",
        scrollTrigger: { trigger: LAST_WORD, start: "top 42%", end: "top 36%", scrub: 1 },
      });
      gsap.to(".shape-top", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: LAST_WORD, start: "top 36%", end: "top 30%", scrub: 1 },
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

    const mm = gsap.matchMedia(root);

    // "Stories Moves / Brands Beyond the Ordinary". Desktop: revealed step by step while the
    // tall section scrolls under its sticky text. Mobile: the section is short and not sticky,
    // so those scroll positions would only be reached after the text has left the screen —
    // reveal it once as it comes into view instead.
    mm.add("(min-width: 901px)", () => {
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
    });

    mm.add("(max-width: 900px)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".story-section .text-story", { opacity: 1, color: "#29abe2" });
        gsap.set(".story-section .text-moves", { opacity: 1, width: "auto" });
        gsap.set(".story-section .line-two", { opacity: 1 });
        return;
      }
      gsap
        .timeline({ scrollTrigger: { trigger: ".story-section .story-content", start: "top 80%" } })
        .to(".story-section .text-story", { opacity: 1, duration: 0.5, ease: "power2.out" })
        .to(".story-section .text-moves", { opacity: 1, width: "auto", duration: 0.6, ease: "power2.out" })
        .to(".story-section .text-story", { color: "#29abe2", duration: 0.4 }, "<")
        .to(".story-section .line-two", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
    });
    // Mobile: the moving "i" layer is hidden, so each highlight word gets its own brand "i"
    // that builds itself as the word scrolls into view — dot drops in, stem grows, then the
    // rest of the word and its subtitle follow.
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".intro-highlights li").forEach((li) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: li, start: "top 85%", toggleActions: "play none none reverse" },
          })
          .from(li.querySelector(".hl-mark-stem"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.45, ease: "power3.out" })
          .from(li.querySelector(".hl-mark-dot"), { y: -24, opacity: 0, duration: 0.4, ease: "back.out(2.5)" }, "-=0.15")
          .from(li.querySelector(".hl-rest"), { x: -12, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
          .from(li.querySelector(".hl-sub"), { y: 10, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.3");

        // Light up this word's "i" while the word is in the middle band of the screen.
        ScrollTrigger.create({
          trigger: li,
          start: "top 60%",
          end: "bottom 40%",
          toggleClass: { targets: li, className: "is-active" },
        });
      });
    });

    // The "i" lands on the faded "I" of the first highlight word, measured from the page. Web
    // fonts (Poppins) can finish loading after that measurement and move the letter, so measure
    // again once they're ready.
    let disposed = false;
    document.fonts?.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      mm.revert();
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
              <h2 className="intro-title">
                <Words text={INTRO_TITLE} />
              </h2>
              {INTRO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>
                  <Words text={paragraph} />
                </p>
              ))}
            </div>
          </div>
          <div className="intro-highlights">
            <ul>
              {INTRO_HIGHLIGHTS.map((h) => (
                <li key={h.title}>
                  <div className="hl-title">
                    {/* Mobile only: the brand "i" (blue dot + white stem) stands in for the letter. */}
                    <span className="hl-mark" aria-hidden="true">
                      <span className="hl-mark-dot" />
                      <span className="hl-mark-stem" />
                    </span>
                    <em className="hl-initial">{h.title.charAt(0)}</em>
                    <span className="hl-rest">{h.title.slice(1)}</span>
                  </div>
                  <span className="hl-sub">{h.sub}</span>
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
              <Link href={`/services#${service.slug}`}>
                <span className="service-grid-media" aria-hidden="true">
                  {service.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={service.thumbnail} alt="" loading="lazy" />
                  ) : service.video ? (
                    // No image uploaded yet: show a frame of the service video.
                    <video src={`${service.video}#t=0.5`} muted playsInline preload="metadata" />
                  ) : null}
                </span>
                <span className="service-grid-title">{service.title}</span>
              </Link>
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
