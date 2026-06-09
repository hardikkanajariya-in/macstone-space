import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPropertyBySlug, getRelatedProperties } from "@/lib/data";
import { PropertyGallery } from "@/components/public/PropertyGallery";
import { PropertyCard } from "@/components/public/PropertyCard";
import { InquiryForm } from "@/components/public/InquiryForm";
import { SectionHeading } from "@/components/public/SectionHeading";
import { createMetadata, propertyJsonLd } from "@/lib/seo";
import { formatPrice, parseJsonArray } from "@/lib/utils";
import { COMPANY, UNSPLASH_IMAGES } from "@/lib/constants";
import { MapPin, Phone, Mail } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return createMetadata({
    title: property.seoTitle || property.title,
    description: property.seoDescription || property.shortDescription || property.description.slice(0, 160),
    path: `/properties/${slug}`,
    image: property.images[0]?.url,
    keywords: property.seoKeywords?.split(",").map((k) => k.trim()),
  });
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const related = await getRelatedProperties(property.id, property.category);
  const highlights = parseJsonArray<string>(property.highlights);
  const amenities = parseJsonArray<string>(property.amenities);
  const locationAdvantages = property.locationAdvantages
    ? (JSON.parse(property.locationAdvantages) as Record<string, string[]>)
    : null;

  const priceDisplay = property.priceLabel || formatPrice(property.price, true);

  const quickInfo = [
    { label: "Property Type", value: property.propertyType },
    { label: "Area", value: property.area ? `${property.area.toLocaleString()} ${property.areaUnit}` : "—" },
    { label: "Configuration", value: property.configuration || "—" },
    { label: "Status", value: property.status },
    { label: "Possession", value: property.possession || "—" },
    { label: "Ownership", value: property.ownership || "—" },
    { label: "Facing", value: property.facing || "—" },
    { label: "Property ID", value: property.propertyId },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertyJsonLd(property)),
        }}
      />

      <section className="pt-20 md:pt-24">
        <PropertyGallery images={property.images} title={property.title} />
      </section>

      <section className="section-padding !pt-10">
        <div className="container-wide px-5 md:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="label text-[0.625rem]">{property.propertyType}</span>
                  {property.featured && (
                    <span className="text-[0.625rem] uppercase tracking-widest text-accent">Featured</span>
                  )}
                </div>
                <h1 className="heading-lg mb-3">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted mb-6">
                  <MapPin size={16} />
                  <span>{property.location}, {property.city}</span>
                </div>
                <p className="text-2xl md:text-3xl font-display">{priceDisplay}</p>
              </div>

              {highlights.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-display text-xl mb-4">Property Highlights</h2>
                  <div className="flex flex-wrap gap-3">
                    {highlights.map((h) => (
                      <span key={h} className="px-4 py-2 bg-surface-warm text-sm border border-border-light">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-12">
                <h2 className="font-display text-xl mb-6">Quick Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
                  {quickInfo.map((info) => (
                    <div key={info.label} className="bg-background p-4 md:p-5">
                      <p className="label text-[0.5625rem] mb-1">{info.label}</p>
                      <p className="text-sm capitalize">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="font-display text-xl mb-6">Description</h2>
                <div className="prose-editorial">
                  {property.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {amenities.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-display text-xl mb-6">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((a) => (
                      <div key={a} className="flex items-center gap-3 text-sm">
                        <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {locationAdvantages && (
                <div className="mb-12">
                  <h2 className="font-display text-xl mb-6">Location Advantages</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(locationAdvantages).map(([key, items]) => {
                      if (!items?.length) return null;
                      const labels: Record<string, string> = {
                        landmarks: "Landmarks",
                        schools: "Schools",
                        hospitals: "Hospitals",
                        commercial: "Commercial Zones",
                        lifestyle: "Lifestyle",
                      };
                      return (
                        <div key={key}>
                          <h3 className="label text-[0.625rem] mb-3">{labels[key] || key}</h3>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item} className="text-sm text-muted flex items-start gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full mt-2 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {property.investmentNotes && (
                <div className="mb-12 p-8 bg-surface-warm border border-border-light">
                  <h2 className="font-display text-xl mb-4">Investment Perspective</h2>
                  <p className="text-sm text-muted leading-relaxed">{property.investmentNotes}</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <div className="border border-border p-6 md:p-8">
                  <h3 className="font-display text-xl mb-6">Inquire About This Property</h3>
                  <InquiryForm
                    type="property"
                    propertyId={property.id}
                    propertyTitle={property.title}
                    variant="compact"
                  />
                </div>

                <div className="border border-border p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={UNSPLASH_IMAGES.founder}
                        alt={COMPANY.founder}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="font-display text-lg">{COMPANY.founder}</p>
                      <p className="text-xs text-muted">Principal Consultant</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <a href={`tel:+91${COMPANY.phone}`} className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                      <Phone size={14} />
                      {COMPANY.phoneDisplay}
                    </a>
                    <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                      <Mail size={14} />
                      {COMPANY.email}
                    </a>
                  </div>
                  <Link href="/contact" className="btn-primary w-full mt-6 text-center text-xs">
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-surface-warm">
          <div className="container-wide px-5 md:px-8">
            <SectionHeading label="You May Also Like" title="Related Properties" />
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
