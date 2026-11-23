import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollTopOnLoad from "@/components/layout/ScrollTopOnLoad";

// Brand font. Only two weights exist: Light (300) and Bold (700) — other weights
// requested via Tailwind (font-medium, font-semibold…) resolve to the nearest one.
const brandFont = localFont({
  variable: "--font-brand",
  src: [
    { path: "../fonts/Fortheloveoffonts-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Fortheloveoffonts-Bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "iKnack Creative Services",
    template: "%s | iKnack Creative Services",
  },
  description:
    "iKnack is a dynamic advertising and creative agency delivering branding, films, digital, and experiential solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${brandFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white">
        <ScrollTopOnLoad />
        <Header />
        <main className="flex-1 -mt-18">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
