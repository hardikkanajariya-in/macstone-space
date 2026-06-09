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
      <Link href={`/properties/${property.slug}`} className="group block">
        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-surface-warm">
          {image && (
            <Image
              src={image.url}
              alt={image.alt || property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="label text-accent-light text-[0.625rem]">{property.propertyType}</span>
              {property.status !== "available" && (
                <span className="text-[0.625rem] uppercase tracking-widest text-white/60">
                  {property.status}
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-2 group-hover:text-accent-light transition-colors">
              {property.title}
            </h3>
            <p className="text-white/60 text-sm mb-4">{property.location}</p>
            <div className="flex items-center justify-between">
              <span className="text-white font-medium tracking-wide">{priceDisplay}</span>
              <ArrowUpRight size={20} className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/properties/${property.slug}`} className="group flex gap-6 md:gap-8 items-center">
        <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 overflow-hidden bg-surface-warm">
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
          <span className="label text-[0.625rem] mb-2 block">{property.propertyType}</span>
          <h3 className="font-display text-xl md:text-2xl mb-1 group-hover:text-accent transition-colors">
            {property.title}
          </h3>
          <p className="text-muted text-sm mb-3">{property.location}</p>
          <span className="text-foreground font-medium">{priceDisplay}</span>
        </div>
        <ArrowUpRight size={18} className="text-muted group-hover:text-accent shrink-0 transition-colors" />
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-warm mb-5">
        {image && (
          <Image
            src={image.url}
            alt={image.alt || property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {property.status !== "available" && (
          <span className="absolute top-4 left-4 bg-charcoal/80 text-white text-[0.625rem] uppercase tracking-widest px-3 py-1.5">
            {property.status}
          </span>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="label text-[0.625rem]">{property.propertyType}</span>
          {property.configuration && (
            <span className="text-xs text-muted">{property.configuration}</span>
          )}
        </div>
        <h3 className="font-display text-xl mb-1 group-hover:text-accent transition-colors">
          {property.title}
        </h3>
        <p className="text-muted text-sm mb-3">{property.location}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium">{priceDisplay}</span>
          {property.area && (
            <span className="text-xs text-muted">{property.area.toLocaleString()} sq.ft</span>
          )}
        </div>
      </div>
    </Link>
  );
}
