import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Lightbulb, 
  HeartHandshake,
  MapPin,
  Award,
  Palette,
  Video,
  Megaphone,
  PenTool,
  Camera,
  ArrowRight,
} from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
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

const WHY_US = [
  {
    Icon: Users,
    title: "Experience",
    description:
      "With six years in the industry, we have a wealth of knowledge and a proven record of successful projects.",
  },
  {
    Icon: Lightbulb,
    title: "Innovation",
    description:
      "We thrive on creativity and innovation, pushing the boundaries of what's possible to deliver fresh and engaging content.",
  },
  {
    Icon: HeartHandshake,
    title: "Client Centric Approach",
    description:
      "Your success is our success. We work closely with our clients, understanding their unique needs and crafting tailored solutions.",
  },
  {
    Icon: MapPin,
    title: "Local Presence",
    description:
      "Based in Mumbai and Pune, we have a deep understanding of the local market dynamics and trends.",
  },
  {
    Icon: Award,
    title: "Quality Assurance",
    description:
      "We adhere to the highest standards of quality in every aspect of our work, ensuring your brand receives the attention it deserves.",
  },
];

const WHAT_WE_OFFER = [
  {
    Icon: Palette,
    title: "Creative Services",
    description:
      "We are the architects of imagination, crafting compelling visual identities, logo designs, and branding solutions.",
  },
  {
    Icon: Video,
    title: "Video Production",
    description:
      "Our in-house video production team transforms concepts into visually stunning videos that convey your message effectively.",
  },
  {
    Icon: Megaphone,
    title: "Social Media Management",
    description:
      "Social media is where conversations happen, and we ensure your brand is part of them. We create campaigns that boost engagement and build a loyal online community.",
  },
  {
    Icon: PenTool,
    title: "Designing",
    description: "We understand that design is not just about aesthetics; it's about storytelling.",
  },
  {
    Icon: Camera,
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
          <h1 className="max-w-2xl text-4xl font-bold text-white md:text-5xl">
            We are a collective of creative thinkers and strategists
          </h1>

          <div className="relative mt-10 overflow-hidden rounded-3xl">
            <ImagePlaceholder
              label="About hero — team collaborating shot"
              aspect="aspect-[16/7]"
              className="rounded-3xl"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
              <p className="text-lg font-semibold text-white md:text-xl">
                Driven By A Shared Purpose
                <br />
                Connect, Inspire, And Grow.
              </p>
            </div>
          </div>

          <ScrollColorReveal
            className="mt-10 max-w-3xl text-lg font-medium leading-relaxed md:text-xl"
            text="Established in 2017, iKnack was founded with a clear vision — to create meaningful, high-impact brand experiences. What began as a focused creative initiative has evolved into a full-service creative and production agency, delivering integrated solutions across branding, films, digital, and AI-driven innovation."
          />

          <div className="mt-12 flex flex-col items-start gap-6 md:flex-row md:items-center">
            <ImagePlaceholder
              label="Team photo"
              aspect="aspect-[4/3]"
              className="md:w-72 md:shrink-0"
            />
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
              <div key={person.name} className="relative overflow-hidden rounded-2xl">
                <ImagePlaceholder label={`${person.name} — headshot`} aspect="aspect-[4/5]" className="rounded-2xl" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <p className="font-semibold text-white">{person.name}</p>
                  <p className="text-sm text-sky-400">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="border-t border-white/10 py-20 md:py-28">
          <h2 className="text-center text-3xl font-bold text-white md:text-4xl">Why us?</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_US.map(({ Icon, title, description }) => (
              <div key={title}>
                <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What do we offer */}
        <section className="border-t border-white/10 py-20 md:py-28">
          <h2 className="text-center text-3xl font-bold text-white md:text-4xl">What do we offer?</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {WHAT_WE_OFFER.map(({ Icon, title, description }) => (
              <div key={title}>
                <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-start justify-between gap-8 border-t border-white/10 py-20 md:flex-row md:items-end md:py-28">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            LET&apos;S TELL
            <br />
            YOUR STORY
          </h2>
          <div className="max-w-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
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
