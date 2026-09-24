"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types/ecommerce";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatPrice } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const closeCart = useCartStore((state) => state.closeCart);

  return (
    <div className="flex gap-4 py-4 border-b border-zinc-800/80 group">
      {/* Product Image */}
      <Link
        href={`/product/${item.product.slug}`}
        onClick={closeCart}
        className="relative w-20 h-24 bg-zinc-900 rounded-md overflow-hidden shrink-0 border border-zinc-800/60"
      >
        <Image
          src={item.product.images[0] || "/images/products/drill-logo-hoodie.webp"}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details & Controls */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/product/${item.product.slug}`}
              onClick={closeCart}
              className="text-xs font-bold tracking-wider text-white hover:text-red-400 transition-colors line-clamp-1"
            >
              {item.product.name}
            </Link>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-zinc-500 hover:text-red-500 transition-colors p-1"
              aria-label="Ürünü Sil"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
            <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
              {item.size}
            </span>
            <span>•</span>
            <span className="truncate max-w-[120px]">{item.color}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-zinc-800 rounded bg-zinc-950">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Azalt"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-xs font-mono font-medium text-white">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Artır"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-xs font-bold font-mono text-white">
            {formatPrice(item.product.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
