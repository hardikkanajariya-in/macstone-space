import { Suspense } from "react";
import { getProperties } from "@/lib/data";
import { PropertyCard } from "@/components/public/PropertyCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { PropertyFilters } from "@/components/public/PropertyFilters";
import { createMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";
import { FadeInUp } from "@/components/public/MotionComponents";

export const metadata = createMetadata({
  title: "Properties",
  description: `Explore premium residential, commercial, and investment properties curated by ${COMPANY.name}.`,
  path: "/properties",
});

interface PageProps {
  searchParams: Promise<{
    category?: string;
    type?: string;
    location?: string;
    status?: string;
    featured?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const properties = await getProperties({
    category: params.category,
    type: params.type,
    location: params.location,
    status: params.status,
    featured: params.featured === "true",
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    search: params.search,
  });

  return (
    <>
      {/* Title Section */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-24 bg-surface border-b border-border/20">
        <div className="container-wide px-5 md:px-8">
          <FadeInUp>
            <SectionHeading
              label="Bespoke Portfolio"
              title="Curated Collections"
              description="A distinguished collection of residential, commercial, and investment opportunities in Gujarat."
            />
          </FadeInUp>
        </div>
      </section>

      {/* Main List Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide px-5 md:px-8">
          <FadeInUp delay={0.1}>
            <Suspense fallback={<div className="h-20" />}>
              <PropertyFilters />
            </Suspense>
          </FadeInUp>

          {properties.length === 0 ? (
            <FadeInUp delay={0.2} className="text-center py-24 border border-border/40 rounded-2xl bg-surface/20">
              <p className="font-display text-2xl text-foreground mb-3 font-normal">No properties found</p>
              <p className="text-muted text-sm max-w-sm mx-auto font-light">
                Try adjusting your search filters or contact our Private Office for confidential off-market requests.
              </p>
            </FadeInUp>
          ) : (
            <>
              <FadeInUp delay={0.2}>
                <p className="text-xs text-accent uppercase tracking-wider font-semibold mb-8">
                  {properties.length} asset{properties.length === 1 ? "" : "s"} identified
                </p>
              </FadeInUp>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {properties.map((property, index) => (
                  <FadeInUp key={property.id} delay={0.05 * (index % 3)} className="h-full">
                    <PropertyCard property={property} />
                  </FadeInUp>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
