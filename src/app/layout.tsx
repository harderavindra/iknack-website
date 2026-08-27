import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollTopOnLoad from "@/components/layout/ScrollTopOnLoad";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
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
