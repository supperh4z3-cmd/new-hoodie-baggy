"use client";

import React, { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterBar } from "@/components/shop/FilterBar";
import { ProductSize } from "@/lib/types/ecommerce";

function ShopContent() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "all";
  const size = searchParams.get("size") || "all";
  const sort = searchParams.get("sort") || "newest";
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Filter by size
    if (size !== "all") {
      result = result.filter((p) => p.sizes.includes(size as ProductSize));
    }

    // Filter by search query
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // default: newest
      result.sort((a) => (a.badge === "NEW" ? -1 : 1));
    }

    return result;
  }, [category, size, sort, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">
          ANASAYFA
        </Link>
        <span>/</span>
        <span className="text-white">SHOP</span>
        {category !== "all" && (
          <>
            <span>/</span>
            <span className="text-red-500 uppercase">{category}</span>
          </>
        )}
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest uppercase text-white">
            {category === "all" ? "TÜM ÜRÜNLER" : category.toUpperCase()}
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            AMSTERDAM & ISTANBUL STREETWEAR COLLECTION
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-400">
          Toplam <strong>{filteredProducts.length}</strong> ürün listeleniyor
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <FilterBar />

      {/* Product Grid / Empty State */}
      <div className="mt-8">
        {filteredProducts.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-16 text-center space-y-4">
            <h3 className="text-base font-bold text-white tracking-widest uppercase">
              SEÇİLEN KRİTERLERE UYGUN ÜRÜN BULUNAMADI
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Farklı bir beden, kategori seçmeyi deneyebilir veya filtreleri sıfırlayabilirsiniz.
            </p>
            <div>
              <Link
                href="/shop"
                className="inline-block bg-white text-black text-xs font-bold px-6 py-2.5 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                FİLTRELERİ SIFIRLA
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-xs font-mono text-zinc-500">
          Katalog Yükleniyor...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
