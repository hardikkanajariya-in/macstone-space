import type { Metadata } from "next";
import { COMPANY } from "./constants";

const siteUrl = COMPANY.url;

export function createMetadata({
  title,
  description,
  path = "",
  image,
  keywords,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title.includes(COMPANY.name) ? title : `${title} | ${COMPANY.name}`;
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    authors: [{ name: COMPANY.founder }],
    creator: COMPANY.name,
    publisher: COMPANY.name,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: COMPANY.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function propertyJsonLd(property: {
  title: string;
  description: string;
  slug: string;
  price: number;
  location: string;
  city: string;
  propertyType: string;
  area?: number | null;
  images: { url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteUrl}/properties/${property.slug}`,
    image: property.images.map((img) => img.url),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressRegion: "Gujarat",
      addressCountry: "IN",
      streetAddress: property.location,
    },
    floorSize: property.area
      ? { "@type": "QuantitativeValue", value: property.area, unitCode: "FTK" }
      : undefined,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: COMPANY.name,
    description: COMPANY.description,
    url: siteUrl,
    telephone: `+91${COMPANY.phone}`,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.line1,
      addressLocality: COMPANY.address.city,
      postalCode: COMPANY.address.pincode,
      addressCountry: "IN",
    },
    founder: {
      "@type": "Person",
      name: COMPANY.founder,
    },
    areaServed: {
      "@type": "City",
      name: "Ahmedabad",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
