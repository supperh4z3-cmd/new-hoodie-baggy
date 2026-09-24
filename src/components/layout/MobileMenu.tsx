"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, MapPin, ShoppingBag, Heart, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { Logo } from "./Logo";
import { InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const totalItemCount = useCartStore((state) => state.getTotalItemCount());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm bg-[#09090b] text-white flex flex-col justify-between h-full border-r border-zinc-800 shadow-2xl z-10 animate-in slide-in-from-left duration-300 overflow-y-auto">
        {/* Top Header */}
        <div className="p-5 border-b border-zinc-850 flex items-center justify-between bg-black/40 sticky top-0 z-20 backdrop-blur-md">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800/80 border border-zinc-800"
            aria-label="Menüyü Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-6">
          {/* Quick Status Bar (Cart & Wishlist) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                onClose();
                openCart();
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all text-left group"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-red-500" />
                <span className="text-xs font-mono font-bold uppercase">SEPET</span>
              </div>
              <span className="text-[11px] font-mono bg-white text-black font-bold px-1.5 py-0.5 rounded-full">
                {totalItemCount}
              </span>
            </button>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-xs font-mono font-bold uppercase">FAVORİLER</span>
              </div>
              <span className="text-[11px] font-mono bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            </Link>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-red-950/20 border border-red-900/40 rounded-lg p-2.5 text-center">
            <span className="text-[10px] font-mono text-red-400 font-bold tracking-wider flex items-center justify-center gap-1.5 uppercase">
              <Sparkles className="w-3 h-3" />
              <span>2.000 ₺ Üzeri Ücretsiz Kargo</span>
            </span>
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex flex-col space-y-3 pt-1">
            <Link
              href="/"
              onClick={onClose}
              className="text-base font-black tracking-widest uppercase hover:text-red-500 transition-colors flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850"
            >
              <span>ANASAYFA</span>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/shop"
              onClick={onClose}
              className="text-base font-black tracking-widest uppercase hover:text-red-500 transition-colors flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850"
            >
              <div className="flex items-center gap-2">
                <span>TÜM ÜRÜNLER</span>
                <span className="bg-red-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold">
                  DROP 2026
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/editorial"
              onClick={onClose}
              className="text-base font-black tracking-widest uppercase hover:text-red-500 transition-colors flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850"
            >
              <div className="flex items-center gap-2">
                <span>LOOKBOOK / EDİTORYAL</span>
                <span className="bg-zinc-800 text-red-400 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold border border-red-900/50">
                  35MM
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="text-base font-black tracking-widest uppercase hover:text-red-500 transition-colors flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850"
            >
              <span>HİKAYEMİZ & MANİFESTO</span>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </Link>
          </nav>

          {/* Visual Category Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400 uppercase">
              <span>Kategoriler</span>
              <span className="text-[10px] text-zinc-600">5 Kategori</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  onClick={onClose}
                  className="group relative h-24 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 block"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="160px"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-2.5 flex flex-col justify-end">
                    <span className="text-xs font-black tracking-wider text-white uppercase group-hover:text-red-400 transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      {cat.itemCount} Ürün
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-5 border-t border-zinc-850 bg-black/60 space-y-3">
          <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-mono">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>41.0082° N, 28.9784° E ISTANBUL</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400 pt-1">
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>

            <span className="text-[11px] text-zinc-400 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              TR / TRY (₺)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
