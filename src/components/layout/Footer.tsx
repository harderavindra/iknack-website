import Link from "next/link";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons/social";
import Logo from "./Logo";
import { SITE } from "@/lib/nav-links";

const SOCIAL_LINKS = [
  { label: "Instagram", href: SITE.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: SITE.social.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: SITE.social.linkedin, Icon: LinkedinIcon },
  { label: "Twitter", href: SITE.social.twitter, Icon: TwitterIcon },
  { label: "YouTube", href: SITE.social.youtube, Icon: YoutubeIcon },
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
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-sky-400">Address</h3>
          <address className="mt-3 space-y-0.5 text-sm not-italic text-neutral-400">
            {SITE.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-sky-400">Contact us</h3>
          <div className="mt-3 space-y-0.5 text-sm text-neutral-400">
            <p>Phone: {SITE.phone}</p>
            <p>Email: {SITE.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-sky-400">Follow us</h3>
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

      {/* <div className="mx-auto mt-12 max-w-6xl">
        <Logo />
      </div> */}

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-sky-400">
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
