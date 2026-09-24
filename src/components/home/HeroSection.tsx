"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

interface HeroSlide {
  id: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  coordinates: string;
  city: string;
  badge: string;
  headline?: string;
  useLogo?: boolean;
  tagline: string;
  ctaText: string;
  ctaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    type: "video",
    src: "/videos/hero-night-city.webm",
    poster: "/images/hero/hero-bg.webp",
    coordinates: "41.0082° N, 28.9784° E",
    city: "ISTANBUL",
    badge: "STREETWEAR REDEFINED",
    useLogo: true,
    tagline: "Same City Different Mindset",
    ctaText: "SHOP NOW",
    ctaLink: "/shop",
  },
  {
    id: "slide-2",
    type: "video",
    src: "/videos/hero-traffic-night.webm",
    poster: "/images/hero/hero-bg.webp",
    coordinates: "52.3676° N, 4.9041° E",
    city: "AMSTERDAM & ISTANBUL",
    badge: "THE DRILL COLLECTION 2026",
    headline: "FROM THE STREETS TO THE WORLD",
    tagline: "More Than Clothes It's A Lifestyle",
    ctaText: "DRILL DROP KEŞFET",
    ctaLink: "/shop?category=hoodies",
  },
  {
    id: "slide-3",
    type: "image",
    src: "/images/hero/hero-bg.webp",
    coordinates: "460 GSM HEAVYWEIGHT",
    city: "LIMITED EDITION",
    badge: "RAW & UNCOMPROMISED",
    headline: "OVERSIZED BAGGY SILHOUETTES",
    tagline: "Raw Street Energy Built To Last",
    ctaText: "BAGGY & SWEATS",
    ctaLink: "/shop?category=sweatpants",
  },
];

export function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-advance slides every 7 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentIdx];

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = !isMuted;
    });
  };

  return (
    <section className="relative w-full min-h-[92vh] md:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Media Layers (Cross-fade between slides) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slide.type === "video" ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster={slide.poster}
                  className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-115"
                >
                  <source src={slide.src} type="video/webm" />
                </video>
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.headline || "Baggy Street"}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center scale-105 filter brightness-90 contrast-110"
                />
              )}

              {/* Cinematic Vignettes & Dark Streetwear Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/35 to-black/90 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Top Overlays: Coordinates & Status */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
        <div className="flex flex-col">
          <span className="text-white font-bold">{activeSlide.coordinates}</span>
          <span className="text-zinc-500">{activeSlide.city}</span>
        </div>

        <div className="text-right">
          <span className="text-red-500 font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-red-950/60">
            {activeSlide.badge}
          </span>
        </div>
      </div>

      {/* Center Branding & Action (Animated Slide Content) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center my-auto py-10 flex flex-col items-center">
        {/* Dynamic Display: Logo or Bold Editorial Headline */}
        <div className="mb-6 drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] transition-all duration-700 animate-in fade-in zoom-in-95">
          {activeSlide.useLogo ? (
            <Logo size="xl" />
          ) : (
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white font-mono leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
              {activeSlide.headline}
            </h1>
          )}
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
          href={activeSlide.ctaLink}
          className="group inline-flex items-center gap-3 bg-zinc-950/90 hover:bg-white text-white hover:text-black border border-zinc-700/90 hover:border-white px-9 py-4 rounded text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md transition-all duration-300 shadow-2xl"
        >
          <span>{activeSlide.ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>

      {/* Bottom Bar: Slider Nav, Video Controls & Script Text */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Controls Container (Left) */}
        <div className="flex items-center gap-4">
          {/* Arrow Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white transition-all backdrop-blur-md"
              aria-label="Önceki Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white transition-all backdrop-blur-md"
              aria-label="Sonraki Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Indicators with Progress Fill */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIdx
                    ? "w-8 bg-red-600"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Video Audio Control */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors backdrop-blur-md"
            aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
            title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Play/Pause Control */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-black/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors backdrop-blur-md"
            aria-label={isPlaying ? "Durdur" : "Oynat"}
            title={isPlaying ? "Durdur" : "Oynat"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Script Text (Right) */}
        <span className="font-serif italic text-sm text-zinc-400 tracking-wide select-none">
          {activeSlide.tagline}
        </span>
      </div>
    </section>
  );
}
