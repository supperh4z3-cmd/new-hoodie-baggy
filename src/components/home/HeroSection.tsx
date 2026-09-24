"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[94vh] flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Cinematic Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/images/hero/hero-bg.webp"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-110"
        >
          <source src="/videos/hero-night-city.webm" type="video/webm" />
        </video>

        {/* Cinematic Vignettes & Dark Streetwear Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/85 pointer-events-none" />
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
        {/* Exact Reference BAGGY STREET Typography */}
        <div className="mb-6 drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
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
          className="group inline-flex items-center gap-3 bg-zinc-950/85 hover:bg-white text-white hover:text-black border border-zinc-700/80 hover:border-white px-8 py-3.5 rounded text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md transition-all duration-300 shadow-2xl"
        >
          <span>SHOP NOW</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Bottom Bar: Video Controls & Script Text Overlay */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-between">
        {/* Video Controls */}
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-zinc-400">
          <button
            type="button"
            onClick={togglePlay}
            className="p-1 hover:text-white transition-colors"
            aria-label={isPlaying ? "Videoyu Durdur" : "Videoyu Oynat"}
            title={isPlaying ? "Durdur" : "Oynat"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
            {isPlaying ? "CANLI VIDEO" : "DURAKLATILDI"}
          </span>
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 hover:text-white transition-colors ml-1"
            aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
            title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Script Text */}
        <span className="font-serif italic text-sm text-zinc-400 tracking-wide select-none">
          Same City Different Mindset
        </span>
      </div>
    </section>
  );
}
