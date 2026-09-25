import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BrandStory } from "@/components/home/BrandStory";
import { LatestDropsCarousel } from "@/components/home/LatestDropsCarousel";
import { DrillEditorial } from "@/components/home/DrillEditorial";

export default function HomePage() {
  return (
    <div className="w-full bg-[#050508] text-white overflow-hidden">
      {/* 1. Video Hero Section with Multi-Video Slider & Turkish Copy */}
      <HeroSection />

      {/* Dynamic Crimson Marquee Ticker 1 */}
      <div className="bg-red-600 text-black py-3 overflow-hidden whitespace-nowrap font-mono font-black text-xs sm:text-sm tracking-widest uppercase flex select-none shadow-2xl relative z-20">
        <div className="animate-marquee flex gap-8 items-center">
          <span>★ 460 GSM AĞIR GRAMAJ SAF PAMUK</span>
          <span>★ 14.5 OZ JAPON SELVEDGE HAM DENİM</span>
          <span>★ 380 GSM FLANEL İŞÇİ GÖMLEKLERİ</span>
          <span>★ 300 GSM ASİT YIKAMA DRILL TEE</span>
          <span>★ İSTANBUL & AMSTERDAM DRILL ARCHIVE</span>
          <span>★ 2.000 ₺ ÜZERİ ÜCRETSİZ HIZLI KARGO</span>
          <span>★ NO SEASONS. ONLY DROPS.</span>
          <span>★ 460 GSM AĞIR GRAMAJ SAF PAMUK</span>
          <span>★ 14.5 OZ JAPON SELVEDGE HAM DENİM</span>
          <span>★ 380 GSM FLANEL İŞÇİ GÖMLEKLERİ</span>
          <span>★ 300 GSM ASİT YIKAMA DRILL TEE</span>
          <span>★ İSTANBUL & AMSTERDAM DRILL ARCHIVE</span>
          <span>★ 2.000 ₺ ÜZERİ ÜCRETSİZ HIZLI KARGO</span>
          <span>★ NO SEASONS. ONLY DROPS.</span>
        </div>
      </div>

      {/* 2. 7-Kategori Vitrini (Gömlek ve T-shirt Dahil) */}
      <CategoryGrid />

      {/* 3. Brand Story Editorial: From Istanbul to the World */}
      <BrandStory />

      {/* 4. Latest Drops / New Arrivals Product Carousel (Büyük Kartlar & Kategori Sekmeleri) */}
      <LatestDropsCarousel />

      {/* Dynamic Monochromatic Reverse Marquee Ticker 2 */}
      <div className="bg-white text-black py-2.5 overflow-hidden whitespace-nowrap font-mono font-black text-xs tracking-widest uppercase flex select-none relative z-20">
        <div className="animate-marquee-reverse flex gap-8 items-center">
          <span>★ OVERSIZED BOXY FIT SILHOUETTES</span>
          <span>★ KADIKÖY ATÖLYE ÜRETİMİ</span>
          <span>★ TAVİZSİZ TOK DOKULAR</span>
          <span>★ SINIRLI SAYIDA ÜRETİM</span>
          <span>★ SAME CITY. DIFFERENT MINDSET.</span>
          <span>★ YALNIZCA BAGGY STREET&apos;TE</span>
          <span>★ OVERSIZED BOXY FIT SILHOUETTES</span>
          <span>★ KADIKÖY ATÖLYE ÜRETİMİ</span>
          <span>★ TAVİZSİZ TOK DOKULAR</span>
          <span>★ SINIRLI SAYIDA ÜRETİM</span>
          <span>★ SAME CITY. DIFFERENT MINDSET.</span>
          <span>★ YALNIZCA BAGGY STREET&apos;TE</span>
        </div>
      </div>

      {/* 5. The Drill Collection Lifestyle Split Vitrini */}
      <DrillEditorial />
    </div>
  );
}
