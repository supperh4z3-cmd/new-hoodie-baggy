"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Plus } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export function LatestDropsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const products = getFeaturedProducts();
  const addItem = useCartStore((state) => state.addItem);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black py-16 sm:py-20 border-b border-zinc-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-900">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">
              NEW ARRIVALS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase">
              LATEST DROPS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="text-xs font-mono font-bold tracking-widest text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase"
            >
              <span>TÜM ÜRÜNLER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="p-2 border border-zinc-800 rounded hover:border-zinc-600 hover:text-white text-zinc-400 transition-colors"
                aria-label="Önceki Ürünler"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="p-2 border border-zinc-800 rounded hover:border-zinc-600 hover:text-white text-zinc-400 transition-colors"
                aria-label="Sonraki Ürünler"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[240px] sm:w-[270px] md:w-[290px] shrink-0 group flex flex-col justify-between bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 rounded-sm p-3.5 transition-all duration-300"
            >
              {/* Product Visual */}
              <div className="relative aspect-square w-full bg-zinc-900 rounded-sm overflow-hidden mb-4 border border-zinc-900">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 240px, 290px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-wider font-bold text-white px-2 py-0.5 rounded border border-white/10 uppercase">
                    {product.badge}
                  </span>
                )}

                {/* Quick Add Button on hover */}
                <button
                  type="button"
                  onClick={() => addItem(product, "L", product.colors[0], 1)}
                  className="absolute bottom-2.5 right-2.5 p-2 bg-white hover:bg-zinc-200 text-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                  aria-label={`${product.name} Sepete Ekle`}
                  title="Hızlı Ekle (L Beden)"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Price */}
              <div>
                <Link
                  href={`/product/${product.slug}`}
                  className="text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-red-400 transition-colors uppercase block truncate"
                >
                  {product.name}
                </Link>

                <div className="mt-1 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-zinc-600 line-through text-[11px]">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center items-center gap-1.5 mt-6">
          <span className="w-6 h-1 bg-white rounded-full" />
          <span className="w-2 h-1 bg-zinc-800 rounded-full" />
          <span className="w-2 h-1 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </section>
  );
}
