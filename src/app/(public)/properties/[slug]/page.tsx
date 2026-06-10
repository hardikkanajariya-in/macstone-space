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
import { MapPin, Phone, Mail, Check } from "lucide-react";
import { FadeInUp } from "@/components/public/MotionComponents";

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
    { label: "Property ID", value: property.propertyId || "—" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertyJsonLd(property)),
        }}
      />

      <section className="pt-24 md:pt-28 bg-background">
        <PropertyGallery images={property.images} title={property.title} />
      </section>

      <section className="section-padding !pt-12 bg-background">
        <div className="container-wide px-5 md:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <FadeInUp className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="label text-[0.625rem] font-semibold tracking-widest bg-surface px-3 py-1 rounded border border-border/40">{property.propertyType}</span>
                  {property.featured && (
                    <span className="text-[0.625rem] uppercase tracking-widest text-accent font-semibold">Featured Portfolio</span>
                  )}
                </div>
                <h1 className="heading-lg mb-4 text-foreground font-display font-light">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted mb-6">
                  <MapPin size={16} className="text-accent" />
                  <span className="text-sm font-light">{property.location}, {property.city}</span>
                </div>
                <p className="text-3xl font-numbers font-semibold text-accent">{priceDisplay}</p>
              </FadeInUp>

              {highlights.length > 0 && (
                <FadeInUp className="mb-12 border-t border-border/30 pt-8">
                  <h2 className="font-display text-xl text-foreground mb-4 font-normal">Property Highlights</h2>
                  <div className="flex flex-wrap gap-3">
                    {highlights.map((h) => (
                      <span key={h} className="px-4 py-2 bg-surface/50 text-xs text-accent-light border border-accent/30 rounded-full font-medium tracking-wide">
                        {h}
                      </span>
                    ))}
                  </div>
                </FadeInUp>
              )}

              <FadeInUp className="mb-12">
                <h2 className="font-display text-xl text-foreground mb-6 font-normal">Quick Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-xl overflow-hidden border border-border/40">
                  {quickInfo.map((info) => (
                    <div key={info.label} className="bg-surface p-5 text-center sm:text-left">
                      <p className="label text-[0.5625rem] font-semibold tracking-widest text-accent mb-1.5">{info.label}</p>
                      <p className="text-sm text-foreground capitalize font-numbers font-medium">{info.value}</p>
                    </div>
                  ))}
                </div>
              </FadeInUp>

              <FadeInUp className="mb-12 border-t border-border/30 pt-8">
                <h2 className="font-display text-xl text-foreground mb-6 font-normal">Description</h2>
                <div className="prose-editorial text-muted text-base leading-relaxed font-light space-y-4">
                  {property.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </FadeInUp>

              {amenities.length > 0 && (
                <FadeInUp className="mb-12 border-t border-border/30 pt-8">
                  <h2 className="font-display text-xl text-foreground mb-6 font-normal">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {amenities.map((a) => (
                      <div key={a} className="flex items-center gap-3 text-sm text-muted">
                        <div className="w-5 h-5 rounded-full border border-accent/30 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-accent" />
                        </div>
                        <span className="font-light">{a}</span>
                      </div>
                    ))}
                  </div>
                </FadeInUp>
              )}

              {locationAdvantages && (
                <FadeInUp className="mb-12 border-t border-border/30 pt-8">
                  <h2 className="font-display text-xl text-foreground mb-6 font-normal">Location Advantages</h2>
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
                        <div key={key} className="bg-surface/30 p-5 rounded-xl border border-border/40">
                          <h3 className="label text-[0.625rem] font-semibold mb-3 tracking-widest text-accent-light">{labels[key] || key}</h3>
                          <ul className="space-y-2.5">
                            {items.map((item) => (
                              <li key={item} className="text-xs text-muted flex items-start gap-2.5 font-light">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </FadeInUp>
              )}

              {property.investmentNotes && (
                <FadeInUp className="mb-12 p-8 bg-surface border-l-2 border-accent rounded-r-xl shadow-lg">
                  <h2 className="font-display text-xl text-foreground mb-4 font-normal">Investment Perspective</h2>
                  <p className="text-sm text-muted leading-relaxed font-light">{property.investmentNotes}</p>
                </FadeInUp>
              )}
            </div>

            {/* Sidebar Columns */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* Inquiry Box */}
                <FadeInUp className="border border-border bg-surface/40 p-6 md:p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
                  <h3 className="font-display text-xl text-foreground mb-1">Request Private Viewing</h3>
                  <p className="text-xs text-muted mb-6">Receive detailed financial metrics and arrange access.</p>
                  <InquiryForm
                    type="property"
                    propertyId={property.id}
                    propertyTitle={property.title}
                    variant="compact"
                  />
                </FadeInUp>

                {/* Principal Officer Profile */}
                <FadeInUp delay={0.1} className="border border-border bg-surface/40 p-6 md:p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-accent/40 shadow-md">
                      <Image
                        src={UNSPLASH_IMAGES.founder}
                        alt={COMPANY.founder}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="font-display text-lg text-foreground">{COMPANY.founder}</p>
                      <p className="text-[10px] text-accent uppercase tracking-wider font-semibold">Principal Consultant</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm border-t border-border/20 pt-4">
                    <a href={`tel:+91${COMPANY.phone}`} className="flex items-center gap-3 text-muted hover:text-accent transition-colors duration-300">
                      <Phone size={14} className="text-accent" />
                      <span className="text-xs font-light">{COMPANY.phoneDisplay}</span>
                    </a>
                    <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-muted hover:text-accent transition-colors duration-300">
                      <Mail size={14} className="text-accent" />
                      <span className="text-xs font-light truncate max-w-[200px]">{COMPANY.email}</span>
                    </a>
                  </div>
                  <Link href="/contact" className="btn-primary w-full mt-6 text-center text-xs py-3 rounded-lg font-semibold block">
                    Schedule Consultation
                  </Link>
                </FadeInUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-surface/50 border-t border-border/20">
          <div className="container-wide px-5 md:px-8">
            <SectionHeading label="Refined Alternatives" title="Related Portfolios" />
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
