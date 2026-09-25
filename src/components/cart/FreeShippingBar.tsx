"use client";

import React from "react";
import { Truck, CheckCircle2 } from "lucide-react";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "@/lib/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export function FreeShippingBar() {
  const subtotal = useCartStore((state) => state.getSubtotal());
  const isFree = useCartStore((state) => state.isFreeShipping());
  const remaining = useCartStore((state) => state.getFreeShippingRemaining());

  const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2.5 sm:p-3 text-xs w-full min-w-0 overflow-hidden box-border">
      <div className="flex items-center justify-between mb-2 gap-2 min-w-0">
        <div className="flex items-center gap-1.5 font-medium min-w-0 flex-1">
          {isFree ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Truck className="w-4 h-4 text-red-500 shrink-0" />
          )}
          <span className={`text-[11px] sm:text-xs truncate ${isFree ? "text-emerald-400 font-semibold" : "text-zinc-300"}`}>
            {isFree
              ? "Tebrikler! Kargonuz Ücretsiz."
              : `Ücretsiz kargo için ${formatPrice(remaining)} daha ekleyin`}
          </span>
        </div>
        <span className="font-mono text-zinc-500 shrink-0 text-[11px] sm:text-xs">{percentage}%</span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isFree ? "bg-emerald-500" : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
