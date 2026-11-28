import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { getPageHero } from "@/lib/data/page-heroes";
import CategoryRow from "@/components/our-work/CategoryRow";
import { getWorkCategoriesForDisplay } from "@/lib/data/work";

// Rendered once and served from the CDN; admin saves call revalidatePath() to refresh it
// immediately, and this hourly revalidate is a safety net.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our work",
  description: "Every project reflects our commitment to storytelling, innovation, and results.",
};

export default async function OurWorkPage() {
  const [categories, hero] = await Promise.all([getWorkCategoriesForDisplay(), getPageHero("our-work")]);

  return (
    <div>
      <PageHero media={hero} />
      <div className="flex justify-center bg-background px-6 py-10 sm:px-10 lg:px-16">
        <h1 className="max-w-3xl text-center text-3xl font-bold leading-tight text-white sm:text-3xl">
          Every project reflects our commitment to storytelling, innovation, and results.
        </h1>
      </div>
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </div>
  );
}
