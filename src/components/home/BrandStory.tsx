"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveUpRight, Volume2, VolumeX, Film, Camera } from "lucide-react";
import {
  DrillCrosshairSvg,
  HeavyStitchSvg,
  RazorBladeSvg,
  StreetCoordinatesSvg,
  BarcodeTagSvg,
} from "@/components/common/StreetIcons";

export function BrandStory() {
  const [activeMedia, setActiveMedia] = useState<"image" | "video">("video");
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

            {/* 4 Interactive Fabric Anatomy Pills */}
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

          {/* Right Column: Interactive Video / Photo Viewer (6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* View Selector Tabs */}
            <div className="flex items-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => setActiveMedia("video")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  activeMedia === "video"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>CANLI SOKAK REEL [VİDEO]</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMedia("image")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  activeMedia === "image"
                    ? "bg-white text-black shadow-lg"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>FOTOĞRAF ÇEKİMİ</span>
              </button>
            </div>

            {/* Media Box */}
            <div className="relative h-[440px] sm:h-[520px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group bg-zinc-950">
              {activeMedia === "video" ? (
                <div className="relative w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  >
                    <source src="/videos/hero-skyline-night.webm" type="video/webm" />
                  </video>

                  {/* Camera HUD Overlays */}
                  <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between z-20">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-red-500 font-bold">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        <span>LIVE 4K DRILL CAM</span>
                      </div>
                      <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-zinc-300">
                        ISTANBUL NIGHT RUN
                      </span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <DrillCrosshairSvg size={44} className="text-red-500/80 animate-pulse" />
                    </div>

                    <div className="flex items-end justify-between text-[11px] font-mono">
                      <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-white font-bold">
                        VOL. 2026 ARCHIVE
                      </span>
                      <BarcodeTagSvg size={28} className="text-white hidden sm:block" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src="/images/brand/brand-story.webp"
                    alt="From Istanbul to the World - Baggy Street Editorial"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-xs font-mono text-zinc-300">
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white font-bold">
                      EDİTORYAL VOL. 01
                    </span>
                    <span className="text-zinc-400 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                      41.0082° N, 28.9784° E
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Asymmetric Red Accent Border Underneath */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-red-500/20 -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
