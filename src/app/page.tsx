import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BrandStory } from "@/components/home/BrandStory";
import { LatestDropsCarousel } from "@/components/home/LatestDropsCarousel";
import { DrillEditorial } from "@/components/home/DrillEditorial";

export default function HomePage() {
  return (
    <div className="w-full bg-black text-white">
      {/* 1. Hero Section matching reference JPEG with coordinates, logo & CTA */}
      <HeroSection />

      {/* 2. 5-Column Category Grid */}
      <CategoryGrid />

      {/* 3. Brand Story Editorial: From Istanbul to the World */}
      <BrandStory />

      {/* 4. Latest Drops / New Arrivals Product Carousel */}
      <LatestDropsCarousel />

      {/* 5. The Drill Collection Lifestyle Split Vitrini */}
      <DrillEditorial />
    </div>
  );
}
