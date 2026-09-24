"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, Trash2, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { ProductCard } from "@/components/products/ProductCard";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const showToast = useToastStore((state) => state.showToast);

  const handleAddAllToCart = () => {
    if (items.length === 0) return;
    items.forEach((product) => {
      addItem(product, "L", product.colors[0], 1);
    });
    showToast(`${items.length} ürün sepete eklendi!`);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">
          ANASAYFA
        </Link>
        <span>/</span>
        <span className="text-white">FAVORİLERİM</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest uppercase text-white flex items-center gap-3">
            <span>FAVORİ LİSTEM</span>
            <span className="text-red-500 text-2xl font-mono">({items.length})</span>
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            BEĞENDİĞİN DRILL & STREETWEAR PARÇALARINI BURADA TAKİP ET
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold px-4 py-2.5 rounded uppercase tracking-wider transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>TÜMÜNÜ SEPETE EKLE</span>
            </button>
            <button
              type="button"
              onClick={clearWishlist}
              className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 text-xs font-mono px-3 py-2.5 rounded border border-zinc-800 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>TEMİZLE</span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-16 text-center space-y-5">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-500">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold tracking-widest text-white uppercase">
            FAVORİ LİSTENİZ HENÜZ BOŞ
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Yeni sezon kapüşonlular, baggy pantolonlar ve ceketleri inceleyip kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-8 py-3.5 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              <span>KOLEKSİYONU KEŞFET</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
