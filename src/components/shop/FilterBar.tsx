"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/data/categories";
import { ProductSize } from "@/lib/types/ecommerce";
import { ArrowUpDown, RotateCcw } from "lucide-react";

const SIZES: ProductSize[] = ["S", "M", "L", "XL", "XXL"];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentSize = searchParams.get("size") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/shop");
  };

  const hasActiveFilters = currentCategory !== "all" || currentSize !== "all" || currentSort !== "newest";

  return (
    <div className="space-y-6 pb-6 border-b border-zinc-850">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParam("category", "all")}
          className={`px-4 py-2 rounded text-xs font-mono font-bold tracking-widest uppercase transition-colors ${
            currentCategory === "all"
              ? "bg-white text-black"
              : "bg-zinc-950 text-zinc-400 border border-zinc-850 hover:border-zinc-700 hover:text-white"
          }`}
        >
          TÜMÜ
        </button>

        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => updateParam("category", cat.slug)}
              className={`px-4 py-2 rounded text-xs font-mono font-bold tracking-widest uppercase transition-colors ${
                isActive
                  ? "bg-white text-black"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-850 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Second Row: Sizes & Sort & Reset */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Size Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-500 uppercase mr-1">
            Beden:
          </span>
          <button
            type="button"
            onClick={() => updateParam("size", "all")}
            className={`px-2.5 py-1 rounded text-xs font-mono ${
              currentSize === "all"
                ? "bg-zinc-800 text-white font-bold"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Tümü
          </button>
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => updateParam("size", size)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                currentSize === size
                  ? "bg-red-600 text-white font-bold"
                  : "bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Right side: Sort & Reset */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={currentSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-zinc-600 font-mono text-xs"
            >
              <option value="newest">En Yeniler</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
