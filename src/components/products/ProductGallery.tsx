"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
  badge?: string;
}

export function ProductGallery({ images, name, badge }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "/images/products/drill-logo-hoodie.webp");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full max-w-full min-w-0 overflow-hidden">
      {/* Thumbnail column */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded bg-zinc-900 border overflow-hidden shrink-0 transition-all ${
                activeImage === img
                  ? "border-white ring-1 ring-white"
                  : "border-zinc-800 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
                unoptimized={img.startsWith('/uploads/') || img.startsWith('http')}
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Large Image */}
      <div className="relative flex-1 min-w-0 aspect-[3/4] sm:aspect-square md:aspect-[4/5] bg-zinc-950 rounded-lg overflow-hidden border border-zinc-850 shadow-2xl">
        <Image
          src={activeImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover object-center transition-all duration-300 hover:scale-105"
          unoptimized={activeImage.startsWith('/uploads/') || activeImage.startsWith('http')}
        />

        {badge && (
          <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-[11px] font-mono tracking-widest font-bold text-white px-3 py-1 rounded border border-white/10 uppercase">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
