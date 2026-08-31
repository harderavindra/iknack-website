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
    title: "Tell Us Your Vision",
    description:
      "Share your project details and goals. We ensure complete confidentiality and a clear understanding of your requirements.",
  },
  {
    Icon: Users,
    title: "Get a Creative Consultation",
    description:
      "Our team connects with you to explore ideas, align on objectives, and shape the right creative direction.",
  },
  {
    Icon: Lightbulb,
    title: "Receive a Strategic Plan",
    description:
      "We present a structured approach with timelines, creative direction, and execution clarity — tailored to your brand.",
  },
];

export default function ContactPage() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
           Let's create something meaningful. 

          </h1>
       
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
            Whether you're building a new brand, launching a campaign, producing content or exploring innovative possibilities, we're ready to collaborate and create something exceptional together.

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
    </section>
  );
}
