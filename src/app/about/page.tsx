import type { Metadata } from "next";
import Image from "next/image";
import ScrollColorReveal from "@/components/ui/ScrollColorReveal";

export const metadata: Metadata = {
  title: "About us",
  description:
    "iKnack is a collective of creative thinkers and strategists delivering brand experiences from strategy to execution.",
};

const LEADERSHIP = [
  { name: "Jitendra Vasoikar", role: "Founder & CEO" },
  { name: "Umesh Sadashive", role: "Co-Founder and Production Head" },
  { name: "Azim Pathan", role: "Creative Director" },
];

const ABOUT_PARAGRAPHS = [
  "Founded in 2017, iKnack began with a simple belief: great ideas deserve exceptional execution.",
  "What started as a focused creative initiative has evolved into a full-service creative and production partner, helping brands communicate with clarity, creativity and confidence.",
  "Today, we combine branding, content, films, digital experiences and emerging AI technologies to create work that connects with people and drives meaningful results.",
];

export default function AboutPage() {
  return (
    <div className="px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Intro */}
        <section className="pt-16 md:pt-24">
        

          <div className="mt-10">
            <h1 className="max-w-4xl text-2xl font-semibold leading-tight text-white md:text-5xl">
              Building brands, stories and experiences that people remember.
            </h1>
           

            <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-3xl">
              <Image
                src="/aboutus-hero-img.webp"
                alt="iKnack team collaborating"
                fill
                sizes="(min-width: 768px) 1152px, 100vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          <div className="py-16 text-center md:py-30">
            <h2 className="text-[36px] font-bold leading-tight text-sky-400">About Us</h2>
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <ScrollColorReveal
                key={paragraph}
                className="mt-6 text-lg font-medium leading-relaxed md:text-2xl"
                text={paragraph}
              />
            ))}
          </div>

          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-20">
            <div className="relative aspect-[4/2.6] w-full overflow-hidden rounded-2xl md:w-120 md:shrink-0">
              <Image
                src="/about-us-img1.webp"
                alt="iKnack team"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h2 className="text-[36px] font-bold leading-tight text-sky-400">Our Approach</h2>
              <p className="mt-4 text-xl font-semibold text-white md:text-2xl">Every project begins with understanding.</p>
              <p className="mt-6 text-lg leading-relaxed text-neutral-300">
                We listen, explore and uncover insights that shape stronger strategies, sharper ideas and more impactful
                experiences.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                By bringing together creative thinking, technical expertise and seamless execution, we create work that
                delivers value at every touchpoint.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-[36px] font-bold leading-tight text-sky-400">The people behind the work</h2>
            <p className="mt-4 text-xl font-semibold text-white md:text-2xl">Different expertise, shared ambition.</p>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              A team of strategists, creatives, producers and problem solvers united by one goal, creating work that
              matters.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              Together, we bring diverse perspectives, collaborative thinking and a commitment to excellence that drives
              every project forward.
            </p>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-3 md:gap-12">
            {LEADERSHIP.map((person) => (
              <div key={person.name} className="rounded-2xl border border-white/10 bg-neutral-900 p-6 text-center">
                <p className="text-lg font-semibold text-white">{person.name}</p>
                <p className="mt-1 text-sm text-sky-400">{person.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
