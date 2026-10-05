import type { Metadata } from "next";
import OurWorkHero from "@/components/our-work/OurWorkHero";
import CategoryRow from "@/components/our-work/CategoryRow";
import { getWorkCategoriesForDisplay } from "@/lib/data/work";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our work (CMS preview)",
  description: "Every project reflects our commitment to storytelling, innovation, and results.",
};

export default async function OurWorkCmsPage() {
  const categories = await getWorkCategoriesForDisplay();

  return (
    <div>
      <OurWorkHero />
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </div>
  );
}
