"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveUpRight, Volume2, VolumeX } from "lucide-react";
import {
  DrillCrosshairSvg,
  HeavyStitchSvg,
  RazorBladeSvg,
  StreetCoordinatesSvg,
} from "@/components/common/StreetIcons";

export function BrandStory() {
  const [audioActive, setAudioActive] = useState(true);

  return (
    <section className="relative bg-[#06060a] py-20 sm:py-28 border-b border-zinc-850 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-red-950/25 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-zinc-800/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Street Ticker & Audio Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-5 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <DrillCrosshairSvg size={20} className="text-red-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase font-black">
              SOKAK MANİFESTOSU // ISTANBUL & AMSTERDAM
            </span>
          </div>

          {/* Equalizer Widget */}
          <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-mono shadow-xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => setAudioActive(!audioActive)}
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              {audioActive ? (
                <Volume2 className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              )}
              <span className="text-[10px] tracking-wider text-zinc-400 font-bold">
                {audioActive ? "140 BPM DRILL RADIO" : "SES KAPALI"}
              </span>
            </button>

            <div className="flex items-end gap-1 h-3.5 w-6">
              <span
                className={`w-1 bg-red-500 rounded-t transition-all duration-300 ${
                  audioActive ? "h-3 animate-pulse" : "h-1"
                }`}
              />
              <span
                className={`w-1 bg-red-500 rounded-t transition-all duration-500 ${
                  audioActive ? "h-2 animate-bounce" : "h-1"
                }`}
              />
              <span
                className={`w-1 bg-red-500 rounded-t transition-all duration-200 ${
                  audioActive ? "h-3.5 animate-pulse" : "h-1"
                }`}
              />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <StreetCoordinatesSvg size={18} className="text-red-500" />
            <span>41.0082° N, 28.9784° E</span>
          </div>
        </div>

        {/* 2-Column Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Principles (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-950/40 border border-red-900/60 px-3 py-1 rounded-full text-xs font-mono text-red-400 uppercase font-black">
              <RazorBladeSvg size={16} className="text-red-400" />
              <span>KURALLARI YIKAN SOKAK MODASI</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase font-mono leading-none">
              FROM ISTANBUL <br />
              <span className="text-stroke-white text-transparent">TO THE WORLD</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg font-sans">
              Baggy Street; Amsterdam&apos;ın yağmurlu kanallarında doğan karanlık drill müziğinin sert basları ile İstanbul sokaklarının bitmeyen enerjisini bir araya getiren bağımsız bir tasarım atölyesidir.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg font-sans">
              Hızlı modanın dayattığı tekdüze dar kalıplara meydan okuyoruz. 460 GSM saf Fransız havlu pamuk, 14.5 oz sert Japon selvedge denim ve düşük omuzlu tok boxy kalıplarla sokağın gerçek zırhını inşa ediyoruz.
            </p>

            {/* 4 Fabric Anatomy Pills */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 flex items-center gap-2">
                <HeavyStitchSvg size={18} className="text-red-500 shrink-0" />
                <span className="text-zinc-200 font-bold">460 GSM SAF HAVLU</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 flex items-center gap-2">
                <HeavyStitchSvg size={18} className="text-amber-500 shrink-0" />
                <span className="text-zinc-200 font-bold">14.5 OZ RAW DENİM</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 flex items-center gap-2">
                <HeavyStitchSvg size={18} className="text-red-400 shrink-0" />
                <span className="text-zinc-200 font-bold">380 GSM FLANEL</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 flex items-center gap-2">
                <HeavyStitchSvg size={18} className="text-zinc-400 shrink-0" />
                <span className="text-zinc-200 font-bold">300 GSM ASİT YIKAMA</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 shadow-xl shadow-red-950/70 hover:scale-[1.02]"
              >
                <span>HİKAYEMİZİ OKU</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/editorial"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 px-6 py-3.5 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-colors"
              >
                <span>LOOKBOOK ARŞİVİ</span>
                <MoveUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Editorial Visual (No Video Switcher) */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[460px] sm:h-[540px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group bg-zinc-950">
              <Image
                src="/images/brand/brand-story.webp"
                alt="From Istanbul to the World - Baggy Street Editorial"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs font-mono text-zinc-300 z-10">
                <span className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white font-bold">
                  EDİTORYAL ÇEKİM // VOL. 01
                </span>
                <span className="text-zinc-400 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  41.0082° N, 28.9784° E
                </span>
              </div>
            </div>

            {/* Asymmetric Red Accent Border Underneath */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-full h-full rounded-3xl border-2 border-red-500/20 -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
