"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowRight, MapPin } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { InstagramIcon, YoutubeIcon } from "./SocialIcons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-zinc-950 text-white flex flex-col justify-between h-full border-r border-zinc-800 p-6 shadow-2xl z-10 animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <span className="font-mono text-xs tracking-widest text-zinc-400">
              BAGGY STREET / MENÜ
            </span>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-900"
              aria-label="Menüyü Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-5">
            <Link
              href="/"
              onClick={onClose}
              className="text-lg font-bold tracking-wider hover:text-red-500 transition-colors flex items-center justify-between group"
            >
              <span>ANASAYFA</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-500" />
            </Link>

            <Link
              href="/shop"
              onClick={onClose}
              className="text-lg font-bold tracking-wider hover:text-red-500 transition-colors flex items-center justify-between group"
            >
              <span>TÜM ÜRÜNLER (SHOP)</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-500" />
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="text-lg font-bold tracking-wider hover:text-red-500 transition-colors flex items-center justify-between group"
            >
              <span>FAVORİLERİM</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-500" />
            </Link>

            {/* Categories Submenu */}
            <div className="pt-2 pb-2 pl-3 border-l-2 border-zinc-800 space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 block uppercase">
                Kategoriler
              </span>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  onClick={onClose}
                  className="text-sm text-zinc-300 hover:text-white block tracking-wider"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              onClick={onClose}
              className="text-lg font-bold tracking-wider hover:text-red-500 transition-colors flex items-center justify-between group"
            >
              <span>OUR STORY (HAKKIMIZDA)</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-500" />
            </Link>
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>41.0082° N, 28.9784° E ISTANBUL</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
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
            <span className="text-xs text-zinc-500 font-mono">
              TR / TRY (₺)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
