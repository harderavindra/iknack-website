import type { Metadata } from "next";
import { Eye, Users, Lightbulb } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Share your vision with iKnack and we'll help you craft impactful brand experiences that deliver real results.",
};

const STEPS = [
  {
    Icon: Eye,
    title: "Share your brief",
    description: "Tell us your vision.",
  },
  {
    Icon: Users,
    title: "Let's connect",
    description: "Explore ideas together.",
  },
  {
    Icon: Lightbulb,
    title: "Plan the next step",
    description: "Find the right approach.",
  },
];

export default function ContactPage() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex max-w-[60%] flex-col gap-12">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sky-400">CONTACT US</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">
            Let&apos;s create something great together.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
            Tell us what you have in mind. We&apos;ll help turn your vision into reality.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
            {STEPS.map(({ Icon, title, description }) => (
              <div key={title}>
                <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
        </div>
      </div>
    </section>
  );
}
