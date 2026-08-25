"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Poppins, Roboto, Reenie_Beanie } from "next/font/google";
import "./home.css";
import { INTRO_TEXT, INTRO_HIGHLIGHTS, SLIDES, SERVICE_CARDS, WHY_US_HOME } from "./home-data";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "800"], variable: "--font-poppins" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-roboto" });
const reenieBeanie = Reenie_Beanie({ subsets: ["latin"], weight: "400", variable: "--font-reenie" });

export default function HomeContent() {
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
    const unsubscribeScroll = lenis.on("scroll", () => ScrollTrigger.update());

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
        gsap.to(icon, {
          width: "20px",
          height: "80px",
          boxShadow: "rgba(0, 0, 0, 0.9) 12px 0px 10px",
          left: () => window.innerWidth / 2,
          top: () => window.innerHeight / 2 - 50,
          right: "auto",
          backgroundColor: "#000",
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "50% top", scrub: 1 },
        });
      }

      gsap.to(".shape-bottom", {
        minHeight: "50px",
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
      gsap.to(".moving-shape-i", {
        backgroundColor: "transparent",
        boxShadow: "none",
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top 75%", end: "top 60%", scrub: 1 },
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

      gsap.set(".slide-1", { opacity: 1, rotate: -15, scale: 0.5, y: "-50vh" });
      gsap.set([".slide-2", ".slide-3", ".slide-4"], { opacity: 0, rotate: 45 });

      gsap.to(".slide-1", {
        rotate: 0,
        scale: 1,
        y: "0vh",
        duration: 1,
        scrollTrigger: { trigger: ".story-section", start: "40% top", end: "100% top", scrub: 1 },
      });

      const parent = root.querySelector<HTMLDivElement>(".parent");

      const slideVideos = new Map<number, HTMLVideoElement>();
      const cardVideos = new Map<number, HTMLVideoElement>();
      [1, 2, 3, 4, 5].forEach((n) => {
        const sv = root.querySelector<HTMLVideoElement>(`.slide-${n} video`);
        if (sv) slideVideos.set(n, sv);
        const cv = root.querySelector<HTMLVideoElement>(`.c${n} video`);
        if (cv) cardVideos.set(n, cv);
      });

      const loadVideo = (video: HTMLVideoElement) => {
        if (video.dataset.loaded) return;
        video.dataset.loaded = "true";
        video.src = video.dataset.src ?? "";
        video.load();
      };

      let activeIndex = 1;
      let activeSlideVideo: HTMLVideoElement | null = null;
      let sectionActive = false;

      const activateSlide = (n: number) => {
        const next = slideVideos.get(n) ?? null;
        if (activeSlideVideo && activeSlideVideo !== next) activeSlideVideo.pause();
        activeSlideVideo = next;
        const cardNext = cardVideos.get(n);
        if (cardNext) loadVideo(cardNext);
        if (next && sectionActive) {
          loadVideo(next);
          next.play().catch(() => {});
        }
      };

      const unloadAllVideos = () => {
        sectionActive = false;
        activeSlideVideo?.pause();
        activeSlideVideo = null;
        [...slideVideos.values(), ...cardVideos.values()].forEach((video) => {
          video.pause();
          video.removeAttribute("src");
          video.load();
          delete video.dataset.loaded;
        });
      };

      const setCurrent = (n: number) => {
        activeIndex = n;
        if (parent) parent.className = `parent current-${n}`;
        activateSlide(n);
      };

      const activateCurrent = () => {
        sectionActive = true;
        activateSlide(activeIndex);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          onEnter: activateCurrent,
          onEnterBack: activateCurrent,
          onLeave: unloadAllVideos,
          onLeaveBack: unloadAllVideos,
        },
      });

      tl.call(() => setCurrent(1))
        .to({}, { duration: 0.01 })
        .to(".slide-2", { opacity: 1, rotate: 0, duration: 0.01 })
        .call(() => setCurrent(2))
        .to(".parent", { rotate: -30, duration: 0.01 }, "<")
        .to({}, { duration: 0.01 })
        .to(".slide-3", { opacity: 1, rotate: 0, duration: 0.01 })
        .call(() => setCurrent(3))
        .to(".parent", { rotate: -60, duration: 0.01 }, "<")
        .to({}, { duration: 0.01 })
        .to(".slide-4", { opacity: 1, rotate: 0, duration: 0.01 })
        .call(() => setCurrent(4))
        .to(".parent", { rotate: -90, duration: 0.01 }, "<")
        .to({}, { duration: 0.01 })
        .call(() => setCurrent(5))
        .to(".parent", { rotate: -120, duration: 0.01 }, "<");

      gsap.utils.toArray<HTMLElement>(".why-item").forEach((item) => {
        gsap.to(item, {
          y: 100,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 30%",
            end: "bottom top",
            scrub: 1,
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
      className={`home-page ${poppins.variable} ${roboto.variable} ${reenieBeanie.variable}`}
      ref={containerRef}
    >
      <div className="imoving-area">
        <div className="moving-shape-i">
          <div className="shape-top" />
          <div className="shape-bottom" />
        </div>
      </div>

      <section className="hero-section">
        <iframe
          src="https://my.spline.design/discover-rWQ5KPWumj6brPtUawH5feSp/"
          title="iKnack hero animation"
          width="100%"
          height="100%"
          loading="lazy"
        />
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

      <div className="services-section">
        {SLIDES.map((slide) => (
          <div key={slide.id} className={`${slide.id} slide`}>
            {slide.type === "video" ? (
              <video data-src={slide.src} loop muted playsInline preload="none" poster={slide.poster} />
            ) : (
              <Image src={slide.src} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
            )}
          </div>
        ))}

        <div className="card-rotation">
          <div className="parent">
            {SERVICE_CARDS.map((card) => (
              <div key={card.id} className={`child ${card.id}`}>
                <div className="content">
                  <h2>
                    {card.heading[0]}
                    <br />
                    {card.heading[1]}
                    <span>
                      {card.heading[0]}
                      <br />
                      {card.heading[1]}
                    </span>
                  </h2>
                  <ul>
                    {card.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                {card.media.type === "video" ? (
                  <video
                    data-src={card.media.src}
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster={card.media.poster}
                  />
                ) : (
                  <Image src={card.media.src} alt="" fill sizes="400px" style={{ objectFit: "cover" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="why-us-section">
        <div className="why-us-content">
          <h3>Why us</h3>
          <h2>
            Because great brands deserve
            <br />
            more than just design — they deserve vision.
          </h2>
          <div className="why-list">
            {WHY_US_HOME.map((item) => (
              <div className="why-item" key={item.number}>
                <div className="number">{item.number}</div>
                <h4>{item.title}</h4>
                <div className="info">
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
