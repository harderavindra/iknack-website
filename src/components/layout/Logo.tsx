import Link from "next/link";
import { SITE } from "@/lib/nav-links";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-none shrink-0" aria-label={`${SITE.name} home`}>
      <span className="text-2xl font-extrabold tracking-tight text-white">
        {SITE.name.toLowerCase()}
      </span>
      <span className="mt-0.5 text-[0.6rem] font-medium tracking-[0.25em] text-neutral-400">
        {SITE.tagline.toUpperCase()}
      </span>
    </Link>
  );
}
