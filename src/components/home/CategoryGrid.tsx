"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { DrillCrosshairSvg } from "@/components/common/StreetIcons";

export function CategoryGrid() {
  const getCategoryPill = (slug: string) => {
    switch (slug) {
      case "hoodies":
        return "460 GSM TERRY";
      case "sweatpants":
        return "WIDE LEG BAGGY";
      case "jackets":
        return "DWR SU GEÇİRMEZ";
      case "jeans":
        return "14.5 OZ SELVEDGE";
      case "shirts":
        return "380 GSM FLANEL";
      case "tshirts":
        return "300 GSM ASİT YIKAMA";
      case "accessories":
        return "316L ÇELİK & YÜN";
      default:
        return "OVERSIZE";
    }
  };

  return (
    <section className="relative bg-[#07070b] py-8 sm:py-12 border-b border-zinc-850 overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-red-950/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[250px] bg-zinc-800/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-[1520px] mx-auto px-3 sm:px-6 relative z-10">
        {/* Top Mini-Header */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800/80 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold tracking-widest uppercase">
              KATEGORİLER // SEZON 2026 SİLÜETLERİ
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="hidden sm:inline">7 RESMİ KATEGORİ</span>
            <span className="bg-red-950/60 text-red-400 border border-red-900/60 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]">
              TAVİZSİZ TOK KALIPLAR
            </span>
          </div>
        </div>

        {/* 7-Column Responsive Grid with Hover Glows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3.5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-[340px] sm:h-[420px] md:h-[460px] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-red-500/80 transition-all duration-500 block shadow-lg hover:shadow-2xl hover:shadow-red-950/50 hover:-translate-y-1"
            >
              {/* Background Image with Zoom */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover object-center filter contrast-110 brightness-95 transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Shadows */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 opacity-60" />

              {/* Top Tags */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="text-[9px] font-mono font-black text-red-400 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-red-900/50 uppercase">
                  {getCategoryPill(cat.slug)}
                </span>
                <span className="text-[10px] font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
                  {cat.itemCount} DROP
                </span>
              </div>

              {/* Corner Laser Accent on Hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <DrillCrosshairSvg size={18} className="text-red-500" />
              </div>

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col items-start justify-end z-10 space-y-1.5">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0">
                  KOLEKSİYON
                </span>

                <h3 className="text-sm sm:text-base font-black tracking-wider text-white uppercase group-hover:text-red-400 transition-colors duration-300 font-mono leading-tight">
                  {cat.name}
                </h3>

                <span className="mt-1 text-[11px] font-mono tracking-widest text-zinc-400 group-hover:text-white flex items-center gap-1.5 transition-colors pt-1">
                  <span className="font-bold">İNCELE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 text-red-500" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
