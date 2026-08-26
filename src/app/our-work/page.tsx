import type { Metadata } from "next";
import OurWorkHero from "@/components/our-work/OurWorkHero";
import CategoryRow from "@/components/our-work/CategoryRow";
import { WORK_CATEGORIES } from "@/components/our-work/our-work-data";

export const metadata: Metadata = {
  title: "Our work",
  description: "Every project reflects our commitment to storytelling, innovation, and results.",
};

export default function OurWorkPage() {
  return (
    <div>
      <OurWorkHero />
      {WORK_CATEGORIES.map((category) => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </div>
  );
}
