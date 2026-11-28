"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/nav-links";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // While the mobile menu is open: Escape closes it and the page behind doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-4 z-1000 px-4 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl  border-white/10 bg-neutral-950/70 px-6 py-4 shadow-lg shadow-black/40 backdrop-blur">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-sky-400 ${
                  isActive ? "border-b-2 border-sky-400 pb-1 text-sky-400" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <>
          {/* Dim the page behind; tap anywhere outside the panel to close. */}
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Floats over the page (absolute) instead of pushing content down. */}
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="absolute inset-x-4 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/95 p-3 shadow-2xl shadow-black/60 backdrop-blur md:hidden"
          >
            <ul>
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg transition-colors ${
                        isActive ? "bg-white/5 text-sky-400" : "text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#00bfff] px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#29abe2]"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
