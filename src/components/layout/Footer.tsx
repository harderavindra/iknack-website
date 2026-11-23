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
    <footer className=" bg-neutral-900/90 px-4 pt-14 pb-6 md:px-8">
      <div className="mx-auto flex max-w-6xl gap-10 sm:grid-cols-3">
        <div className="flex-1 flex justify-start gap-8 items-center ">
        {STEPS.map(({ title, text, Icon }) => (
          <div className="flex gap-2 items-center " key={title}>
            <Icon
              className="h-6 w-6 text-white"
              strokeWidth={1.75}
              aria-hidden
            />
            <div>
          
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-sm text-neutral-400">{text}</p>
          
          </div>
          </div>
        ))}
        <div>
         <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00bfff] px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#29abe2]"
        >
          Let&apos;s talk
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </Link>
        </div>
        
        </div>
        <div>
            <h3 className="text-sm font-semibold tracking-wide text-sky-400">
              Follow us
            </h3>
            <div className="mt-3 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-sky-400 hover:text-sky-400"
                >
                  <Icon width={16} height={16} />
                </a>
              ))}
            </div>
          </div>
      </div>


      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-sky-400"
            >
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
