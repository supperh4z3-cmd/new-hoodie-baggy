"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { DrillCrosshairSvg } from "@/components/common/StreetIcons";

export function DrillEditorial() {
  return (
    <section className="relative bg-[#050508] py-20 sm:py-28 overflow-hidden border-t border-zinc-850">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-red-950/25 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-zinc-800/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Feature Card (4 cols) with Neon Accent */}
          <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-red-500/70 transition-all duration-500">
            {/* Corner Crosshair */}
            <div className="absolute top-4 right-4 text-zinc-700 group-hover:text-red-500 transition-colors">
              <DrillCrosshairSvg size={24} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono font-black tracking-widest text-red-500 uppercase">
                  EXCLUSIVE DROP // ARCHIVE 2026
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-mono leading-none">
                THE DRILL <br />
                <span className="text-red-500 text-glow-red">COLLECTION</span>
              </h2>

              <div className="w-16 h-1 bg-red-600 rounded-full shadow-neon-red" />

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                MORE THAN CLOTHES. <br />
                IT&apos;S A LIFESTYLE.
              </p>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Amsterdam underground drill sahnesi ile Kadıköy gecelerinin karanlık enerjisinden doğan sınırlı seri. Her parça numaralandırılmış seri üretim sertifikasıyla gelir.
              </p>

              {/* Status Badge */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">ÜRETİM LİMİTİ:</span>
                <span className="text-red-400 font-bold">YALNIZCA 150 ADET</span>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/editorial"
                className="group/btn inline-flex items-center justify-between w-full bg-white hover:bg-zinc-200 text-black px-7 py-4 rounded-xl text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 shadow-xl shadow-white/10 hover:scale-[1.01]"
              >
                <span>EXPLORE (LOOKBOOK&apos;U AÇ)</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Visual Grid (7 cols) with Live Looping Video & Lookbook Frame */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Item 1: Live Video Loop Frame */}
            <div className="relative h-[340px] sm:h-[460px] rounded-3xl overflow-hidden border border-zinc-800 group shadow-2xl bg-zinc-950">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
              >
                <source src="/videos/hero-traffic-night.webm" type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Video Tag Overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono">
                <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-red-500 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                  <span>REC 00:44:12</span>
                </span>
                <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-zinc-300">
                  UNDERGROUND DRILL
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1">
                <span className="text-[10px] font-mono text-red-400 uppercase font-black">
                  SOKAK ÇEKİMLERİ
                </span>
                <h4 className="text-lg font-black text-white uppercase font-mono">
                  TUNNEL SQUAD MOTION
                </h4>
              </div>
            </div>

            {/* Item 2: Amsterdam / Istanbul Collection Lookbook Card */}
            <Link
              href="/editorial"
              className="relative h-[340px] sm:h-[460px] rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-500/80 group block shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/brand/drill-editorial-2.webp"
                alt="Amsterdam & Istanbul Collection"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-colors" />

              <div className="absolute top-4 right-4 z-10">
                <span className="bg-red-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase shadow-lg">
                  EDİTORYAL
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block font-bold">
                  AMSTERDAM & ISTANBUL
                </span>
                <h3 className="text-xl font-black tracking-tight text-white uppercase group-hover:text-red-400 transition-colors font-mono leading-tight">
                  EDİTORYAL LOOKBOOK
                </h3>
                <span className="mt-2 text-xs font-mono tracking-widest text-white flex items-center gap-1.5 pt-1">
                  <span className="font-bold">LOOKBOOK&apos;U İNCELE</span>
                  <MoveUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-red-500" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
