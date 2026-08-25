import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2.5H8V15h2v6h3v-6h2.4l.6-3.5H13v-2c0-.55.45-1 1-1z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.5 1-2.3 2.2-2.3 1.2 0 2.3.8 2.3 2.3V17" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6.5c-.6.3-1.3.5-2 .6.7-.4 1.3-1.2 1.5-2-.7.4-1.5.7-2.3.9A3.6 3.6 0 0 0 9.8 9c0 .3 0 .5.1.8-3-.2-5.6-1.6-7.4-3.8-.3.6-.5 1.2-.5 1.9 0 1.3.6 2.4 1.6 3.1a3.6 3.6 0 0 1-1.6-.5v.1c0 1.8 1.3 3.3 3 3.6a3.6 3.6 0 0 1-1.6.1c.5 1.5 1.9 2.5 3.5 2.6A7.2 7.2 0 0 1 2 18.4a10.2 10.2 0 0 0 5.6 1.6c6.7 0 10.4-5.6 10.4-10.4v-.5c.7-.5 1.3-1.1 1.8-1.9z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="3.5" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
