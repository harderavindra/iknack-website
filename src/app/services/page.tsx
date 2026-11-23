import type { Metadata } from "next";
import ServiceRow from "@/components/services/ServiceRow";
import PageHero from "@/components/layout/PageHero";
import { getPageHero } from "@/lib/data/page-heroes";
import { getServicesForDisplay } from "@/lib/data/services";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description: "Integrated creative services with seamless execution.",
};

export default async function ServicesPage() {
  const [services, hero] = await Promise.all([getServicesForDisplay(), getPageHero("services")]);

  return (
    <div>
      <PageHero media={hero} />

      <div className="flex justify-center bg-background px-6 py-10 sm:px-10 lg:px-16">
        <FadeInOnScroll>
          <h1 className="text-center text-3xl font-bold leading-tight text-white sm:whitespace-nowrap">
            Creative solutions crafted for impact.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-neutral-300 sm:text-lg">
            A complete ecosystem of branding, content, films, digital experiences and innovation designed to help brands
            connect, engage and thrive.
          </p>
        </FadeInOnScroll>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-0 md:py-28" aria-label="Our services">
        <div className="divide-y divide-white/10">
          {services.map((service) => (
            <ServiceRow key={service.title} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
