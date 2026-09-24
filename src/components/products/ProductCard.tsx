"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product, ProductSize } from "@/lib/types/ecommerce";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const showToast = useToastStore((state) => state.showToast);

  const handleSizeAdd = (e: React.MouseEvent, size: ProductSize) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, size, product.colors[0], 1);
    showToast(`${product.name} (${size}) sepete eklendi!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      showToast(`${product.name} favorilere eklendi!`);
    } else {
      showToast(`${product.name} favorilerden çıkarıldı.`, "info");
    }
  };

  const hasSecondImage = product.images.length > 1;
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  // Key streetwear feature pill
  const getFeaturePill = () => {
    if (product.details?.material?.includes("460 GSM") || product.name.includes("460 GSM")) return "460 GSM";
    if (product.details?.material?.includes("14 oz") || product.details?.material?.includes("Denim")) return "14 OZ DENIM";
    if (product.category === "sweatpants") return "WIDE LEG";
    if (product.category === "jackets") return "DWR TEKNİK";
    if (product.badge) return product.badge;
    return "HEAVYWEIGHT";
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between bg-zinc-950/90 border border-zinc-850 hover:border-zinc-600/90 rounded-md p-3 sm:p-4 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/80"
    >
      {/* Visual Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-zinc-900 rounded-sm overflow-hidden mb-3.5 border border-zinc-900 block"
      >
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            hasSecondImage && isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100 group-hover:scale-105"
          }`}
        />

        {/* Secondary Model / Editorial View on Hover */}
        {hasSecondImage && (
          <Image
            src={product.images[1]}
            alt={`${product.name} editorial view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Badges Stack (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-widest font-black text-white px-2 py-0.5 rounded border border-white/20 uppercase shadow-md">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="bg-red-600/90 backdrop-blur-md text-[10px] font-mono tracking-wider font-bold text-white px-2 py-0.5 rounded uppercase shadow-md">
              -%{discountPercent}
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isInWishlist
              ? "bg-red-600 text-white shadow-lg shadow-red-950/60 ring-1 ring-red-400"
              : "bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 border border-white/10"
          }`}
          aria-label={isInWishlist ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
              isInWishlist ? "fill-white text-white" : ""
            }`}
          />
        </button>

        {/* Quick Size Selector Bar (Slides up on Hover) */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-black/90 backdrop-blur-md p-2.5 transition-all duration-300 transform border-t border-white/10 flex flex-col gap-1.5 z-20 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-400">
            <span className="flex items-center gap-1">
              <ShoppingBag className="w-3 h-3 text-red-500" />
              <span>HIZLI EKLE:</span>
            </span>
            <span className="text-zinc-500">BEDEN SEÇ</span>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={(e) => handleSizeAdd(e, s)}
                className="py-1 rounded bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black text-[10px] font-mono font-bold transition-all text-center border border-zinc-800 hover:border-white"
                title={`${s} Beden Sepete Ekle`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Link>

      {/* Info Section */}
      <div className="space-y-1.5 pt-1">
        {/* Top Tag & Category */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest">
          <span className="text-zinc-500 uppercase">{product.categoryName}</span>
          <span className="text-red-400/90 bg-red-950/40 border border-red-900/40 px-1.5 py-0.2 rounded text-[9px] font-bold">
            {getFeaturePill()}
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-black tracking-wider text-white group-hover:text-red-400 transition-colors uppercase block truncate"
        >
          {product.name}
        </Link>

        {/* Pricing Row */}
        <div className="flex items-baseline justify-between font-mono pt-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-zinc-600 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Color Dots */}
          <div className="flex items-center gap-1">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                title={color}
                className="w-2.5 h-2.5 rounded-full border border-zinc-700 bg-zinc-800"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
