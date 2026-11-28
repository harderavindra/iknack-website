import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";
import { getPageHero } from "@/lib/data/page-heroes";
import { getServiceLinks } from "@/lib/data/services";

// Rendered once and served from the CDN; admin saves call revalidatePath() to refresh it
// immediately, and this hourly revalidate is a safety net.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About us",
  description:
    "iKnack is a collective of creative thinkers and strategists delivering brand experiences from strategy to execution.",
};

const LEADERSHIP = [
  { name: "Jitendra Vasoikar", role: "Founder and CEO" },
  { name: "Umesh Sadashive", role: "Co-Founder and Production Head" },
  { name: "Azim Pathan", role: "Creative Director" },
];

const ABOUT_PARAGRAPHS = [
  "Founded in 2017, iKnack began with a simple belief: great ideas deserve exceptional execution.",
  "What started as a focused creative initiative has evolved into a full-service creative and production partner, helping brands communicate with clarity, creativity and confidence.",
  "Today, we combine branding, content, films, digital experiences and emerging AI technologies to create work that connects with people and drives meaningful results.",
];

const APPROACH_PARAGRAPHS = [
  "Every project begins with understanding.",
  "We listen, explore and uncover insights that shape stronger strategies, sharper ideas and more impactful experiences.",
  "By bringing together creative thinking, technical expertise and seamless execution, we create work that delivers value at every touchpoint.",
];

const TEAM_PARAGRAPHS = [
  "Different expertise, shared ambition.",
  "A team of strategists, creatives, producers and problem solvers united by one goal, creating work that matters.",
  "Together, we bring diverse perspectives, collaborative thinking and a commitment to excellence that drives every project forward.",
];

// One type scale for the whole page (matches the service rows on /services).
const HEADING = "text-3xl font-bold leading-tight text-white";
const PARAGRAPH = "text-lg leading-relaxed text-neutral-300";

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-5">
      {items.map((text) => (
        <p key={text} className={PARAGRAPH}>
          {text}
        </p>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const FOUNDED = 2017;

export default async function AboutPage() {
  const [hero, services] = await Promise.all([getPageHero("about"), getServiceLinks()]);

  // Facts only — derived from the founding year, the live service list and the office address.
  const facts = [
    { value: String(FOUNDED), label: "Founded" },
    { value: `${new Date().getFullYear() - FOUNDED}+`, label: "Years of creative craft" },
    { value: String(services.length), label: "Integrated service verticals" },
    { value: "Mumbai", label: "Headquartered in" },
  ];

  return (
    <div>
      <PageHero media={hero} />

      <div className="mx-auto max-w-6xl divide-y divide-white/10 px-4 md:px-0">
        {/* About Us: story left, key facts right */}
        <section className="py-20 md:py-28">
          <FadeInOnScroll>
            <div className="grid items-start gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">
              <div>
                <h2 className={HEADING}>About Us</h2>
                <div className="mt-6">
                  <Paragraphs items={ABOUT_PARAGRAPHS} />
                </div>
              </div>

              <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                {facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className={`flex min-w-0 flex-col-reverse justify-end gap-3 p-6 md:p-8 ${i % 2 === 0 ? "border-r border-white/10" : ""} ${i < 2 ? "border-b border-white/10" : ""}`}
                  >
                    <dt className="text-xs uppercase tracking-[0.2em] text-neutral-500">{fact.label}</dt>
                    <dd className="text-3xl font-bold leading-none text-sky-400 lg:text-4xl">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Our Approach: image left, text right */}
        <section className="py-20 md:py-28">
          <FadeInOnScroll>
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-900">
                <Image
                  src="/about-us-img1.webp"
                  alt="iKnack team at work"
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className={HEADING}>Our Approach</h2>
                <div className="mt-6">
                  <Paragraphs items={APPROACH_PARAGRAPHS} />
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Team: intro, then leadership cards */}
        <section className="py-20 md:py-28">
          <FadeInOnScroll>
            <div className="max-w-3xl">
              <h2 className={HEADING}>The people behind the work</h2>
              <div className="mt-6">
                <Paragraphs items={TEAM_PARAGRAPHS} />
              </div>
            </div>
          </FadeInOnScroll>

          <ul className="mt-14 grid gap-6 sm:grid-cols-3 md:gap-8">
            {LEADERSHIP.map((person) => (
              <li
                key={person.name}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-sky-400/50"
              >
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-400/10 text-lg font-bold text-sky-400"
                >
                  {initials(person.name)}
                </span>
                <p className="mt-8 text-xl font-bold text-white">{person.name}</p>
                <p className="mt-1 text-sm text-neutral-400">{person.role}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
