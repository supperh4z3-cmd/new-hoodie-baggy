"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="relative z-40 bg-zinc-950 border-b border-zinc-800/80 text-zinc-300 text-xs py-2 px-4 overflow-hidden select-none">
      <div className="flex items-center justify-center gap-3 tracking-widest text-[11px] font-medium uppercase text-center">
        <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse hidden sm:inline-block" />
        <span>
          2.000 TL ÜZERİ TÜM TÜRKİYE&apos;YE ÜCRETSİZ KARGO
        </span>
        <span className="text-zinc-600 hidden md:inline">•</span>
        <span className="hidden md:inline text-zinc-400">
          YENİ DROP: ISTANBUL DRILL 2026
        </span>
        <span className="text-zinc-600 hidden lg:inline">•</span>
        <Link
          href="/shop"
          className="text-white hover:text-red-400 underline underline-offset-4 decoration-zinc-600 hover:decoration-red-400 transition-colors ml-1 font-semibold"
        >
          ŞİMDİ KEŞFET →
        </Link>
      </div>
    </div>
  );
}
