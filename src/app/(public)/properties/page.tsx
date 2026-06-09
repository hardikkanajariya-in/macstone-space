import { Suspense } from "react";
import { getProperties } from "@/lib/data";
import { PropertyCard } from "@/components/public/PropertyCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { PropertyFilters } from "@/components/public/PropertyFilters";
import { createMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";

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
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-surface-warm">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Portfolio"
            title="Curated Properties"
            description="A distinguished collection of residential, commercial, and investment opportunities."
          />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-wide px-5 md:px-8">
          <Suspense fallback={<div className="h-20" />}>
            <PropertyFilters />
          </Suspense>

          {properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl mb-3">No properties found</p>
              <p className="text-muted text-sm">
                Try adjusting your filters or contact us for personalized recommendations.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted mb-8">
                {properties.length} propert{properties.length === 1 ? "y" : "ies"} found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
