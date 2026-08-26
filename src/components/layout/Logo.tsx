import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/nav-links";

export default function Logo() {
  return (
    <Link href="/" className="shrink-0" aria-label={`${SITE.name} home`}>
      <Image src="/iknack-logo.svg" alt={SITE.name} width={127} height={43} className="h-10 w-auto" priority />
    </Link>
  );
}
