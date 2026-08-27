import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Palette, Video, Megaphone, PenTool, Camera, ArrowRight } from "lucide-react";
import ScrollColorReveal from "@/components/ui/ScrollColorReveal";

export const metadata: Metadata = {
  title: "About us",
  description:
    "iKnack is a collective of creative thinkers and strategists delivering brand experiences from strategy to execution.",
};

const LEADERSHIP = [
  { name: "Jitendra Vasoikar", role: "Founder & CEO", photo: "/jitendra.png", width: 431, height: 407 },
  { name: "Umesh Sadashive", role: "Co-Founder and Production Head", photo: "/umesh.png", width: 400, height: 407 },
  { name: "Azim Pathan", role: "Creative Director", photo: "/azim.png", width: 453, height: 407 },
];

const WHY_US = [
  {
    icon: "/about-icon1.svg",
    title: "Experience",
    description:
      "With six years in the industry, we have a wealth of knowledge and a proven record of successful projects.",
  },
  {
    icon: "/about-icon2.svg",
    title: "Innovation",
    description:
      "We thrive on creativity and innovation, pushing the boundaries of what's possible to deliver fresh and engaging content.",
  },
  {
    icon: "/about-icon3.svg",
    title: "Client Centric Approach",
    description:
      "Your success is our success. We work closely with our clients, understanding their unique needs and crafting tailored solutions.",
  },
  {
    icon: "/about-icon4.svg",
    title: "Local Presence",
    description:
      "Based in Mumbai and Pune, we have a deep understanding of the local market dynamics and trends.",
  },
  {
    icon: "/about-icon5.svg",
    title: "Quality Assurance",
    description:
      "We adhere to the highest standards of quality in every aspect of our work, ensuring your brand receives the attention it deserves.",
  },
];

const WHAT_WE_OFFER = [
  {
       Icon: "/about-icon6.svg",
    title: "Creative Services",
    description:
      "We are the architects of imagination, crafting compelling visual identities, logo designs, and branding solutions.",
  },
  {
    Icon: "/about-icon7.svg",
    title: "Video Production",
    description:
      "Our in-house video production team transforms concepts into visually stunning videos that convey your message effectively.",
  },
  {
    Icon: "/about-icon8.svg",
    title: "Social Media Management",
    description:
      "Social media is where conversations happen, and we ensure your brand is part of them. We create campaigns that boost engagement and build a loyal online community.",
  },
  {
    Icon: "/about-icon9.svg",
    title: "Designing",
    description: "We understand that design is not just about aesthetics; it's about storytelling.",
  },
  {
    Icon: "/about-icon10.svg",
    title: "Photography",
    description: "We ensure that each photograph becomes a powerful asset in your brand's visual identity.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Intro */}
        <section className="pt-16 md:pt-24">
        

          <div className="relative mt-10 aspect-[16/7]  rounded-3xl px-40">
              <h1 className="max-w-3xl text-2xl absolute -left-20  -top-10 font-semibold text-white md:text-5xl z-2 text-shadow-2xl text-shadow-black" style={{     "textShadow": "3px 4px black" }}>
            We are a collective of creative thinkers and strategists
          </h1>
            <Image
              src="/aboutus-hero-img.webp"
              alt="iKnack team collaborating"
              fill
              sizes="(min-width: 768px) 1152px, 100vw"
              style={{ objectFit: "cover", borderRadius: "1.5rem" }}
              priority
            />
            <div className="pointer-events-none absolute -right-20 -bottom-15  p-6 md:p-8 " style={{     "textShadow": "3px 4px black" }}>
              <p className="text-lg font-semibold text-white md:text-4xl">
                Driven By A Shared Purpose
                <br />
                Connect, Inspire, And Grow.
              </p>
            </div>
          </div>

          <ScrollColorReveal
            className=" max-w-3xl  mx-auto items-center text-lg font-medium leading-relaxed md:text-2xl md:py-30"
            text="Established in 2017, iKnack was founded with a clear vision — to create meaningful, high-impact brand experiences. What began as a focused creative initiative has evolved into a full-service creative and production agency, delivering integrated solutions across branding, films, digital, and AI-driven innovation."
          />

          <div className="mt-12 flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:w-72 md:shrink-0">
              <Image
                src="/about-us-img1.webp"
                alt="iKnack team"
                fill
                sizes="(min-width: 768px) 288px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-lg leading-relaxed text-neutral-300">
              Today, we partner with forward-thinking brands to transform ideas into powerful
              narratives — combining strategy, creativity, and execution to deliver work that
              resonates and performs.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 md:py-28">
          <h2 className="text-center text-3xl font-bold text-white md:text-4xl">Our Leadership</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {LEADERSHIP.map((person) => (
              <div key={person.name} className="relative overflow-hidden rounded-2xl bg-neutral-900 flex items-center justify-center overflow-visible ">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={person.width}
                  height={person.height}
                 
                  style={{ width: "80%", height: "auto", objectFit: "cover", display: "block", margin: "0 auto", transform: "translateY(-10%)" }}
                />
                <div className="pointer-events-none absolute inset-x-0 bg-gradient-to-t from-black/100 to-transparent/20 p-4 pt-20" style={{ bottom: "0px", background: "linear-gradient(360deg, black 20%, #000000b3 50%, transparent 100%)" }}>
                  <p className="font-semibold text-white">{person.name}</p>
                  <p className="text-sm text-sky-400">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="border-t border-white/10 py-20 md:py-28">
          <h2 className="text-center text-4xl font-semibold text-white md:text-6xl mb-20">Why us?</h2>
          <div className="mt-12 grid  sm:grid-cols-2 lg:grid-cols-5 border border-white/30">
            {WHY_US.map(({ icon, title, description }) => (
              <div key={title} className="border-r border-white/30 last:border-none p-6">
                <Image src={icon} alt="" width={42} height={42} />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What do we offer */}
        <section className="border-t border-white/10 py-20 md:py-28">
          <h2 className="text-center text-4xl font-semibold text-white md:text-6xl mb-20">What do we offer?</h2>
          <div className="mt-12 grid  sm:grid-cols-2 lg:grid-cols-5 border border-white/30">
            {WHAT_WE_OFFER.map(({ Icon, title, description }) => (
              <div key={title} className="border-r border-white/30 last:border-none p-6">
                <Image src={Icon} alt="" width={42} height={42} />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2  leading-relaxed text-neutral-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center justify-center gap-30 border-t border-white/10 py-20 md:flex-row md:items-center md:py-28">
          <h2 className="text-4xl font-bold text-white md:text-6xl gap-3 flex flex-col">
            <div className="flex items-center gap-2">
            LET&apos;S TELL
            <img src="/logo-icon.svg" alt="iKnack team collaborating" className="h-12 w-12" />
            </div>
            
            YOUR STORY
          </h2>
          
          <div className="">
            <p className="text-lg font-medium uppercase tracking-widest text-neutral-50">
              Request a consultation. Discuss your project.
              <br />
              Connect with our team.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-400 transition-colors hover:text-sky-300"
            >
              Say Hello <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
