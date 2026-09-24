"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";

export function CategoryGrid() {
  return (
    <section className="bg-black py-4 border-b border-zinc-900">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4">
        {/* Responsive Grid for all categories (7 columns on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-[320px] sm:h-[400px] md:h-[440px] rounded-sm overflow-hidden bg-zinc-950 border border-zinc-900 block"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/10 transition-colors duration-500" />

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col items-start justify-end z-10">
                <h3 className="text-sm sm:text-base font-black tracking-widest text-white uppercase group-hover:text-red-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="mt-1 text-[11px] font-mono tracking-widest text-zinc-400 group-hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
