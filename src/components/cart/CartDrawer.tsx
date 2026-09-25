"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { FreeShippingBar } from "./FreeShippingBar";
import { CartItemRow } from "./CartItemRow";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const totalItemCount = useCartStore((state) => state.getTotalItemCount());
  const subtotal = useCartStore((state) => state.getSubtotal());
  const discountAmount = useCartStore((state) => state.getDiscountAmount());
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const shippingFee = useCartStore((state) => state.getShippingFee());
  const finalTotal = useCartStore((state) => state.getFinalTotal());

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Prevent background scroll and horizontal gestures on mobile when drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.body.style.touchAction = "pan-y";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      document.body.style.touchAction = originalTouchAction;
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponMessage({ text: res.message, isError: false });
      setCouponInput("");
    } else {
      setCouponMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex justify-end overflow-hidden w-full max-w-full pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className="relative w-full max-w-full sm:max-w-md bg-zinc-950 text-white flex flex-col justify-between h-full border-l border-zinc-800 shadow-2xl z-10 animate-in slide-in-from-right duration-300 overflow-hidden box-border"
        style={{ touchAction: "pan-y", overscrollBehavior: "contain" }}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-850 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <ShoppingBag className="w-5 h-5 text-white shrink-0" />
            <h2 className="text-sm font-mono font-bold tracking-widest uppercase truncate">
              SEPETİNİZ ({totalItemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors shrink-0"
            aria-label="Sepeti Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="px-4 sm:px-5 pt-3 sm:pt-4 shrink-0">
          <FreeShippingBar />
        </div>

        {/* Item List / Empty State */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-5 divide-y divide-zinc-850/60 overscroll-contain">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wider">
                  SEPETİNİZ HENÜZ BOŞ
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Sokak kültürünü yansıtan en yeni Baggy Street drop&apos;larını keşfetmeye başlayın.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-2 inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-6 py-3 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                <span>ALIŞVERİŞE BAŞLA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          )}
        </div>

        {/* Footer Summary (if items exist) */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-850 bg-zinc-950/95 space-y-3 sm:space-y-4 shrink-0 w-full min-w-0 overflow-hidden box-border">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full min-w-0">
              <div className="relative flex-1 min-w-0">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 shrink-0 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Kupon Kodu (Örn: BAGGY10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full min-w-0 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 pl-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono uppercase box-border"
                />
              </div>
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-3 sm:px-4 py-2 rounded font-mono font-semibold transition-colors shrink-0"
              >
                UYGULA
              </button>
            </form>

            {couponMessage && (
              <p
                className={`text-[11px] font-mono ${
                  couponMessage.isError ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {couponMessage.text}
              </p>
            )}

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded text-emerald-400 min-w-0">
                <span className="truncate">Aktif Kupon: <strong>{appliedCoupon}</strong></span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-zinc-400 hover:text-white underline text-[11px] shrink-0 ml-2"
                >
                  Kaldır
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>İndirim</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Kargo</span>
                <span className={shippingFee === 0 ? "text-emerald-400" : "text-white"}>
                  {shippingFee === 0 ? "ÜCRETSİZ" : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-850">
                <span>TOPLAM</span>
                <span className="text-base text-red-500">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2 w-full min-w-0">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3.5 rounded uppercase tracking-widest transition-colors shadow-lg shadow-red-950/50"
              >
                <span>ÖDEMEYE GEÇ (CHECKOUT)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full flex items-center justify-center text-zinc-400 hover:text-white text-xs font-mono py-1.5 transition-colors"
              >
                <span>Sepeti Görüntüle ve Düzenle</span>
              </Link>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">256-Bit SSL Güvenli Alışveriş & Hızlı Teslimat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
