"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DrillEditorial() {
  return (
    <section className="bg-black py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Feature Card (4 cols) */}
          <div className="lg:col-span-4 bg-zinc-950 border border-zinc-850 p-8 sm:p-10 rounded-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-3">
                EXCLUSIVE DROP
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase leading-tight">
                THE DRILL <br />
                COLLECTION
              </h2>
              <div className="w-12 h-0.5 bg-red-600 my-6" />
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
                MORE THAN CLOTHES. <br />
                IT&apos;S A LIFESTYLE.
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/shop?category=hoodies"
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-zinc-200 px-7 py-3.5 rounded text-xs font-mono font-bold tracking-widest uppercase transition-colors"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image 1: Underground Tunnel Shoot */}
            <div className="relative h-[320px] sm:h-[420px] rounded-sm overflow-hidden border border-zinc-900 group">
              <Image
                src="/images/brand/drill-editorial-1.webp"
                alt="The Drill Collection Shoot"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-[11px] font-mono tracking-widest text-white uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                UNDERGROUND SERIES
              </div>
            </div>

            {/* Image 2: Amsterdam / Istanbul Collection Card */}
            <Link
              href="/shop"
              className="relative h-[320px] sm:h-[420px] rounded-sm overflow-hidden border border-zinc-900 group block"
            >
              <Image
                src="/images/brand/drill-editorial-2.webp"
                alt="Amsterdam & Istanbul Collection"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/20 transition-colors" />

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                  LIMITED RUN
                </span>
                <h3 className="text-xl font-black tracking-widest text-white uppercase group-hover:text-red-400 transition-colors">
                  AMSTERDAM COLLECTION
                </h3>
                <span className="mt-2 text-xs font-mono tracking-widest text-white flex items-center gap-1.5">
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
