import type { Metadata } from "next";
import { Eye, Users, Lightbulb, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/nav-links";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Share your vision, goals and ambitions. Our team will shape the strategy, creativity and execution required to bring it to life.",
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
      {/* Mobile: one full-width column. lg+: intro and details left, form card right. */}
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sky-400">CONTACT US</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white">
            Let&apos;s create something meaningful.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">Share your vision, goals and ambitions.</p>
          <p className="mt-3 text-lg leading-relaxed text-neutral-300">
            Our team will shape the strategy, creativity and execution required to bring it to life.
          </p>

          <ol className="mt-10 space-y-5 border-t border-white/10 pt-8">
            {STEPS.map(({ Icon, title, description }) => (
              <li key={title} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-sm text-neutral-400">{description}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="mt-10 space-y-4 border-t border-white/10 pt-8 text-neutral-300">
            <div className="flex gap-3">
              <dt>
                <Mail className="mt-0.5 h-5 w-5 text-sky-400" aria-label="Email" />
              </dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="hover:text-sky-400">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <MapPin className="mt-0.5 h-5 w-5 text-sky-400" aria-label="Address" />
              </dt>
              <dd>{SITE.address.join(" ")}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
