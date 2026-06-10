import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface PropertyCardProps {
  property: {
    slug: string;
    title: string;
    location: string;
    price: number;
    priceLabel?: string | null;
    propertyType: string;
    status: string;
    area?: number | null;
    areaUnit?: string | null;
    configuration?: string | null;
    images: { url: string; alt?: string | null }[];
  };
  variant?: "default" | "featured" | "horizontal";
}

export function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const image = property.images[0];
  const priceDisplay = property.priceLabel || formatPrice(property.price, true);

  if (variant === "featured") {
    return (
      <Link href={`/properties/${property.slug}`} className="group block h-full">
        <div className="relative h-full min-h-[500px] overflow-hidden rounded-xl border border-border/30 bg-surface shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-accent/40 transition-all duration-500">
          {image && (
            <Image
              src={image.url}
              alt={image.alt || property.title}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/90 via-[#0F1115]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="label text-accent-light text-[0.625rem] font-semibold tracking-widest">{property.propertyType}</span>
              {property.status !== "available" && (
                <span className="text-[0.625rem] uppercase tracking-widest text-muted bg-background/80 px-2 py-0.5 rounded border border-border/35">
                  {property.status}
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2 group-hover:text-accent-light transition-colors duration-300">
              {property.title}
            </h3>
            <p className="text-muted text-sm mb-4">{property.location}</p>
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <span className="text-accent font-numbers font-semibold text-lg tracking-wide">{priceDisplay}</span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-charcoal transition-all duration-300">
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/properties/${property.slug}`} className="group block bg-surface/50 border border-border/40 hover:border-accent/30 rounded-lg p-4 transition-all duration-300">
        <div className="flex gap-4 md:gap-6 items-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded bg-surface-warm">
            {image && (
              <Image
                src={image.url}
                alt={image.alt || property.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="200px"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span className="label text-[0.5625rem] mb-1.5 block tracking-widest font-semibold">{property.propertyType}</span>
            <h3 className="font-display text-lg md:text-xl mb-1 text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-muted text-xs mb-2">{property.location}</p>
            <span className="text-accent font-numbers font-medium text-sm tracking-wide">{priceDisplay}</span>
          </div>
          <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all duration-300 shrink-0">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.slug}`} className="group block h-full">
      <div className="h-full flex flex-col bg-surface border border-border/55 hover:border-accent/40 rounded-xl overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-warm">
          {image && (
            <Image
              src={image.url}
              alt={image.alt || property.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          {property.status !== "available" && (
            <span className="absolute top-4 left-4 bg-background/90 text-foreground border border-border/40 text-[0.625rem] uppercase tracking-widest px-3 py-1.5 rounded">
              {property.status}
            </span>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="label text-[0.625rem] font-semibold tracking-widest">{property.propertyType}</span>
              {property.configuration && (
                <span className="text-xs text-muted tracking-wide">{property.configuration}</span>
              )}
            </div>
            <h3 className="font-display text-xl mb-1.5 text-foreground group-hover:text-accent-light transition-colors duration-300">
              {property.title}
            </h3>
            <p className="text-muted text-sm mb-4">{property.location}</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-auto">
            <span className="text-accent font-numbers font-semibold text-base tracking-wide">{priceDisplay}</span>
            {property.area && (
              <span className="text-xs text-muted font-numbers font-medium tracking-wide">
                {property.area.toLocaleString()} {property.areaUnit || "sq.ft"}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
