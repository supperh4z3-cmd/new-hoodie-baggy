"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="bg-black py-16 sm:py-24 border-b border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Manifesto & Story (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              <span>BAGGY STREET</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-white uppercase leading-tight">
              FROM ISTANBUL <br />
              <span className="text-zinc-400">TO THE WORLD</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg">
              Baggy Street, İstanbul sokaklarının dinamik enerjisinden ve Amsterdam&apos;ın özgür ruhundan ilham alan, modern sokak stilini ve drill kültürünü bir araya getirir. Oversize kesimler, ağır gramajlı kumaşlar ve özgün tasarımlarla kendi tarzını sokaklarda tavizsiz ifade et.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 bg-transparent hover:bg-white text-white hover:text-black border border-zinc-800 hover:border-white px-7 py-3 rounded text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-4 text-[11px] font-mono tracking-widest text-zinc-600 uppercase">
              ISTANBUL / EST. 2024
            </div>
          </div>

          {/* Right Column: Editorial Visual (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[500px] rounded-lg overflow-hidden border border-zinc-850 shadow-2xl group">
              <Image
                src="/images/brand/brand-story.webp"
                alt="From Istanbul to the World - Baggy Street Editorial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-xs font-mono text-zinc-400">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-white">
                  EDITORIAL VOL. 01
                </span>
                <span className="text-zinc-500">
                  41.0082° N, 28.9784° E
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
