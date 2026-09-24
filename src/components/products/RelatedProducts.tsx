"use client";

import React from "react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const related = PRODUCTS.filter((p) => p.id !== currentProductId)
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, 4);

  return (
    <section className="mt-20 pt-12 border-t border-zinc-900">
      <div className="mb-8">
        <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">
          TAMAMLAYICI PARÇALAR
        </span>
        <h2 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase">
          BENZER DROPLAR
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
