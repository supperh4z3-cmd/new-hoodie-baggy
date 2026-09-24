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
    city: "İSTANBUL",
    badge: "SOKAK MODASI YENİDEN TANIMLANDI",
    useLogo: true,
    tagline: "Aynı Şehir, Farklı Bakış Açısı",
    ctaText: "HEMEN KEŞFET",
    ctaLink: "/shop",
  },
  {
    id: "slide-2",
    type: "video",
    src: "/videos/hero-traffic-night.webm",
    poster: "/images/hero/hero-bg.webp",
    coordinates: "52.3676° N, 4.9041° E",
    city: "AMSTERDAM & İSTANBUL",
    badge: "2026 DRILL KOLEKSİYONU",
    headline: "SOKAKLARDAN DÜNYAYA",
    tagline: "Sıradan Kıyafetlerin Ötesinde Bir Yaşam Tarzı",
    ctaText: "YENİ DROP'U İNCELE",
    ctaLink: "/shop?category=hoodies",
  },
  {
    id: "slide-3",
    type: "video",
    src: "/videos/hero-skyline-night.webm",
    poster: "/images/hero/hero-bg.webp",
    coordinates: "460 GSM SAF FRANSIZ PAMUKLU",
    city: "SINIRLI SERİ",
    badge: "TAVİZSİZ TOK KALIPLAR",
    headline: "OVERSIZE & BAGGY KESİMLER",
    tagline: "Yıllar Boyu Formunu Kaybetmeyen Dik Duruş",
    ctaText: "EŞOFMAN & HOODIE",
    ctaLink: "/shop?category=sweatpants",
  },
  {
    id: "slide-4",
    type: "video",
    src: "/videos/hero-street-lights.webm",
    poster: "/images/hero/hero-bg.webp",
    coordinates: "GECE SOKAKLARI // İSTANBUL",
    city: "KADIKÖY & BEYOĞLU",
    badge: "YENİ GÖMLEK & T-SHIRT DROPLARI",
    headline: "SOKAK IŞIKLARI ALTINDA",
    tagline: "Ağır Pamuklu Kumaşlar ve Tavizsiz Dökümler",
    ctaText: "YENİ DROPLARI KEŞFET",
    ctaLink: "/shop",
  },
  {
    id: "slide-5",
    type: "image",
    src: "/images/hero/hero-bg.webp",
    coordinates: "14.5 OZ JAPON DENİMİ",
    city: "ÖZEL ATÖLYE SERİSİ",
    badge: "GENİŞ PAÇA VINTAGE DENİM",
    headline: "SOKAĞIN GERÇEK ZIRHI",
    tagline: "Tasarım ve Üretim %100 İstanbul",
    ctaText: "TÜM KOLEKSİYON",
    ctaLink: "/shop",
  },
];

export function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // 6.5 saniyede bir otomatik kaydırma
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
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
      {/* Arka Plan Medya Katmanları (Videolar ve Geçişler) */}
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

              {/* Sinematik Vinyet & Karanlık Sokak Katmanları */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/35 to-black/90 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Üst Bilgi Satırı: Koordinatlar ve Rozet */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
        <div className="flex flex-col">
          <span className="text-white font-bold">{activeSlide.coordinates}</span>
          <span className="text-zinc-500">{activeSlide.city}</span>
        </div>

        <div className="text-right">
          <span className="text-red-500 font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-red-950/60 shadow-lg">
            {activeSlide.badge}
          </span>
        </div>
      </div>

      {/* Orta Alan: Dinamik Başlık, Logo ve Aksiyonlar */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center my-auto py-10 flex flex-col items-center">
        {/* Subtle Ambient Red Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[260px] bg-red-950/20 blur-[130px] pointer-events-none rounded-full" />

        {/* Logo veya Türkçe Çarpıcı Başlık */}
        <div className="mb-6 drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] transition-all duration-700 animate-in fade-in zoom-in-95 relative z-10">
          {activeSlide.useLogo ? (
            <Logo size="xl" />
          ) : (
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white font-mono leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
              {activeSlide.headline}
            </h1>
          )}
        </div>

        {/* Türkçe Kategori Hızlı Linkleri (Gömlek ve T-shirt dahil) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-widest text-zinc-300 font-semibold mb-8 uppercase relative z-10">
          <Link href="/shop?category=hoodies" className="hover:text-red-400 transition-colors">
            KAPÜŞONLU
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=sweatpants" className="hover:text-red-400 transition-colors">
            EŞOFMAN
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=shirts" className="hover:text-red-400 transition-colors text-white font-bold">
            GÖMLEK
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=tshirts" className="hover:text-red-400 transition-colors text-white font-bold">
            T-SHIRT
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=jackets" className="hover:text-red-400 transition-colors">
            CEKET
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop?category=jeans" className="hover:text-red-400 transition-colors">
            JEAN
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop" className="hover:text-red-400 transition-colors">
            TÜMÜ
          </Link>
        </div>

        {/* Ana Buton (Türkçe & Neon Laser Glow) */}
        <Link
          href={activeSlide.ctaLink}
          className="group inline-flex items-center gap-3 bg-zinc-950/90 hover:bg-white text-white hover:text-black border border-zinc-700/90 hover:border-white px-9 py-4 rounded-xl text-xs font-mono font-black tracking-widest uppercase backdrop-blur-md transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-[1.02] relative z-10"
        >
          <span>{activeSlide.ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>

      {/* Alt Kontrol Barı: Slider Geçişleri, Video Ses/Oynatma ve Türkçe Slogan */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Kontrol Butonları */}
        <div className="flex items-center gap-4">
          {/* İleri / Geri Okları */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white transition-all backdrop-blur-md"
              aria-label="Önceki Video"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white transition-all backdrop-blur-md"
              aria-label="Sonraki Video"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slayt İlerleme Çubukları */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIdx
                    ? "w-8 bg-red-600 shadow-lg shadow-red-900/60"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Slayt ${idx + 1}`}
              />
            ))}
          </div>

          {/* Ses Aç / Kapat */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors backdrop-blur-md"
            aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
            title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Oynat / Durdur */}
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

        {/* Türkçe Slogan */}
        <span className="font-serif italic text-sm text-zinc-400 tracking-wide select-none">
          {activeSlide.tagline}
        </span>
      </div>
    </section>
  );
}
