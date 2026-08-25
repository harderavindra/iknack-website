export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our work", href: "/our-work" },
  { label: "Contact us", href: "/contact" },
];

export const SITE = {
  name: "iKnack",
  tagline: "Creative Services",
  legalName: "Iknack Creative Services LLP",
  address: ["C201, Mangalya Premises,", "Marol, Andheri East,", "Mumbai 400059"],
  phone: "+91 9876543210",
  email: "info@iknack.com",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/",
  },
};
