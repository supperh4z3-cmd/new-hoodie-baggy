"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[94vh] flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Image with dark cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.webp"
          alt="Baggy Street Istanbul Night Streetwear"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-in fade-in zoom-in-105 duration-1000"
        />
        {/* Dark vignettes & gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/80" />
      </div>

      {/* Top Overlays */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
        <div className="flex flex-col">
          <span className="text-white font-bold">41.0082° N, 28.9784° E</span>
          <span className="text-zinc-500">ISTANBUL</span>
        </div>

        <div className="text-right">
          <span className="text-white font-bold tracking-widest uppercase">
            STREETWEAR REDEFINED
          </span>
        </div>
      </div>

      {/* Center Branding & Action */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center my-auto py-12 flex flex-col items-center">
        {/* Huge Graffiti Logo Display */}
        <div className="mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          <Logo size="xl" />
        </div>

        {/* Streetwear Categories Breadcrumb / Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono tracking-widest text-zinc-300 font-semibold mb-8 uppercase">
          <Link href="/shop?category=hoodies" className="hover:text-white transition-colors">
            HOODIES
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=sweatpants" className="hover:text-white transition-colors">
            SWEATPANTS
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=jackets" className="hover:text-white transition-colors">
            JACKETS
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=jeans" className="hover:text-white transition-colors">
            JEANS
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop" className="hover:text-white transition-colors">
            MORE
          </Link>
        </div>

        {/* Primary CTA Button */}
        <Link
          href="/shop"
          className="group inline-flex items-center gap-3 bg-zinc-950/80 hover:bg-white text-white hover:text-black border border-zinc-700/80 hover:border-white px-8 py-3.5 rounded text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md transition-all duration-300 shadow-2xl"
        >
          <span>SHOP NOW</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Bottom Script Text Overlay */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex justify-end">
        <span className="font-serif italic text-sm text-zinc-400 tracking-wide select-none">
          Same City Different Mindset
        </span>
      </div>
    </section>
  );
}
