import Link from "next/link";
import { ArrowUpRight, Eye, Lightbulb, Users } from "lucide-react";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons/social";
import { SITE } from "@/lib/nav-links";

const SOCIAL_LINKS = [
  { label: "YouTube", href: SITE.social.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: SITE.social.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: SITE.social.instagram, Icon: InstagramIcon },
];

const STEPS = [
  { title: "Share your brief", text: "Tell us your vision.", Icon: Eye },
  { title: "Let's connect", text: "Explore ideas together.", Icon: Users },
  {
    title: "Plan the next step",
    text: "Find the right approach.",
    Icon: Lightbulb,
  },
];

const LEGAL_LINKS = [
  { label: "Terms of use", href: "/terms-of-use" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900/90 px-4 pt-12 pb-6 md:px-8 md:pt-14">
      {/* Mobile: steps stacked, full-width CTA, social row. lg+: everything on one row. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex flex-col gap-8 lg:flex-1 lg:flex-row lg:items-center lg:justify-start lg:gap-8">
          <ol className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-8">
            {STEPS.map(({ title, text, Icon }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <p className="text-sm text-neutral-400">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00bfff] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#29abe2] sm:w-auto lg:py-2"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-6 lg:block lg:border-0 lg:pt-0">
          <h3 className="text-sm font-semibold tracking-wide text-sky-400">Follow us</h3>
          <div className="flex gap-3 lg:mt-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-sky-400 hover:text-sky-400 lg:h-9 lg:w-9"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="py-1 hover:text-sky-400">
              {link.label}
            </Link>
          ))}
        </nav>
        <p>
          Copyright&copy; {year} {SITE.legalName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
