"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Heart } from "lucide-react";
import { Product } from "@/lib/types/ecommerce";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const showToast = useToastStore((state) => state.showToast);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, "L", product.colors[0], 1);
    showToast(`${product.name} sepete eklendi!`);
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

  return (
    <div className="group relative flex flex-col justify-between bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 rounded-sm p-3 sm:p-3.5 transition-all duration-300">
      {/* Visual Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-zinc-900 rounded-sm overflow-hidden mb-3.5 border border-zinc-900 block"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-wider font-bold text-white px-2 py-0.5 rounded border border-white/10 uppercase">
            {product.badge}
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isInWishlist
              ? "bg-red-600/90 text-white shadow-lg"
              : "bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80"
          }`}
          aria-label={isInWishlist ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isInWishlist ? "fill-white text-white" : ""
            }`}
          />
        </button>

        {/* Quick Add Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-2.5 right-2.5 p-2 bg-white hover:bg-zinc-200 text-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
          aria-label={`${product.name} Sepete Ekle`}
          title="Hızlı Ekle (L Beden)"
        >
          <Plus className="w-4 h-4" />
        </button>
      </Link>

      {/* Info */}
      <div className="space-y-1">
        <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          {product.categoryName}
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-red-400 transition-colors uppercase block truncate"
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between text-xs font-mono pt-1">
          <span className="text-zinc-200 font-bold">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-zinc-600 line-through text-[11px]">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Color Indicators */}
        <div className="flex items-center gap-1 pt-1.5">
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
  );
}
