"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  images: { url: string; alt?: string | null }[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const primary = images[0];
  const secondary = images.slice(1, 3);

  const navigate = (dir: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 h-[50vh] md:h-[70vh]">
        <button
          onClick={() => setLightboxIndex(0)}
          className="relative md:row-span-2 h-full overflow-hidden image-reveal cursor-pointer"
        >
          <Image
            src={primary.url}
            alt={primary.alt || title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </button>
        {secondary.length > 0 && (
          <div className="hidden md:grid grid-rows-2 gap-3">
            {secondary.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i + 1)}
                className="relative overflow-hidden image-reveal cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt={img.alt || title}
                  fill
                  className="object-cover"
                  sizes="30vw"
                />
              </button>
            ))}
          </div>
        )}
        {images.length > 3 && (
          <button
            onClick={() => setLightboxIndex(0)}
            className="md:hidden absolute bottom-4 right-4 bg-charcoal/80 text-white text-xs px-4 py-2 tracking-wide uppercase"
          >
            View All {images.length} Photos
          </button>
        )}
      </div>

      {images.length > 3 && (
        <div className="hidden md:flex gap-2 mt-3 overflow-x-auto pb-2">
          {images.slice(3).map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i + 3)}
              className="relative w-32 h-20 shrink-0 overflow-hidden image-reveal"
            >
              <Image
                src={img.url}
                alt={img.alt || title}
                fill
                className="object-cover"
                sizes="128px"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-8">
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            onClick={() => navigate(1)}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white z-10"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
          <p className="absolute bottom-6 text-white/50 text-sm">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
