"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { CategorySlug, Product } from "@/lib/types/ecommerce";

type FilterTab = "all" | CategorySlug;

export function LatestDropsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  React.useEffect(() => {
    let isMounted = true;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (
          isMounted &&
          data.success &&
          Array.isArray(data.products) &&
          data.products.length > 0
        ) {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.warn("LatestDropsCarousel dynamic fetch fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filterTabs: { id: FilterTab; label: string; count?: number }[] = [
    { id: "all", label: "TÜM DROPLAR" },
    { id: "shirts", label: "GÖMLEK (SHIRTS)" },
    { id: "tshirts", label: "T-SHIRT" },
    { id: "hoodies", label: "KAPÜŞONLU / HOODIE" },
    { id: "sweatpants", label: "BAGGY EŞOFMAN" },
    { id: "jeans", label: "DENİM JEANS" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black py-16 sm:py-24 border-b border-zinc-900 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-5 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest text-red-500 uppercase font-bold">
                2026 RESMİ SEZON DROPLARI
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-mono">
              LATEST DROPS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="text-xs font-mono font-bold tracking-widest text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase bg-zinc-900/80 px-3.5 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700"
            >
              <span>TÜM KOLEKSİYON ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="p-2.5 border border-zinc-800 bg-zinc-950 rounded-lg hover:border-zinc-600 hover:text-white text-zinc-400 transition-colors shadow-md"
                aria-label="Önceki Ürünler"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="p-2.5 border border-zinc-800 bg-zinc-950 rounded-lg hover:border-zinc-600 hover:text-white text-zinc-400 transition-colors shadow-md"
                aria-label="Sonraki Ürünler"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6">
          {filterTabs.map((tab) => {
            const count =
              tab.id === "all"
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === tab.id).length;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-950/80 scale-[1.02]"
                    : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-850 hover:border-zinc-700"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-black/40 text-white" : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Container (Büyük Geniş Kartlar) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] md:w-[350px] lg:w-[370px] shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Carousel Progress Subtitle */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>KART ÜZERİNDE BEDEN SEÇİMİ VE ÇİFT GÖRSEL ÖNİZLEME AKTİF</span>
          </div>
          <span className="hidden sm:inline">
            GÖSTERİLEN: {filteredProducts.length} PARÇA
          </span>
        </div>
      </div>
    </section>
  );
}
