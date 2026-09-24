"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RotateCcw, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const discountAmount = useCartStore((state) => state.getDiscountAmount());
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const shippingFee = useCartStore((state) => state.getShippingFee());
  const finalTotal = useCartStore((state) => state.getFinalTotal());
  const clearCart = useCartStore((state) => state.clearCart);

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponMsg({ text: res.message, isError: false });
      setCouponInput("");
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold tracking-widest text-white uppercase">
          SİPARİŞİNİZ ALINDI!
        </h1>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Baggy Street siparişiniz başarıyla oluşturuldu. Sipariş takip numaranız ve kargo bilgilendirmesi e-posta adresinize iletilecektir.
        </p>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg inline-block text-xs font-mono text-zinc-300">
          Sipariş Kodu: #BS-{Math.floor(100000 + Math.random() * 900000)}
        </div>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-8 py-3.5 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            <span>ALIŞVERİŞE DEVAM ET</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">
          ANASAYFA
        </Link>
        <span>/</span>
        <span className="text-white">SEPETİM</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-white mb-8">
        ALIŞVERİŞ SEPETİ ({items.length})
      </h1>

      {items.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center space-y-5">
          <p className="text-zinc-400 text-sm">
            Sepetinizde şu anda hiç ürün bulunmuyor.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-8 py-3.5 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            <span>KOLEKSİYONU KEŞFET</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <FreeShippingBar />

            <div className="bg-zinc-950 border border-zinc-850 rounded-xl divide-y divide-zinc-850">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="relative w-20 h-24 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-zinc-800"
                    >
                      <Image
                        src={item.product.images[0] || "/images/products/drill-logo-hoodie.webp"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm font-bold tracking-wider text-white hover:text-red-400 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400 font-mono">
                        <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-200">
                          Beden: {item.size}
                        </span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                      <div className="mt-2 text-xs font-mono text-zinc-500">
                        Birim: {formatPrice(item.product.price)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                    {/* Quantity counter */}
                    <div className="flex items-center border border-zinc-800 rounded bg-zinc-900">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-zinc-400 hover:text-white"
                        aria-label="Azalt"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-zinc-400 hover:text-white"
                        aria-label="Artır"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line total */}
                    <div className="text-sm font-bold font-mono text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-500 hover:text-red-500 p-1.5 transition-colors"
                      aria-label="Ürünü Çıkar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-between items-center text-xs font-mono">
              <Link href="/shop" className="text-zinc-400 hover:text-white underline">
                ← Alışverişe Devam Et
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="text-zinc-500 hover:text-red-400 transition-colors"
              >
                Sepeti Temizle
              </button>
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 space-y-5">
              <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-white border-b border-zinc-850 pb-4">
                SİPARİŞ ÖZETİ
              </h2>

              {/* Promo code */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Kupon (Örn: BAGGY10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 pl-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-3 py-2 rounded font-mono font-semibold transition-colors"
                  >
                    UYGULA
                  </button>
                </div>
                {couponMsg && (
                  <p
                    className={`text-[11px] font-mono ${
                      couponMsg.isError ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded text-emerald-400">
                    <span>Kupon: <strong>{appliedCoupon}</strong></span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-zinc-400 hover:text-white underline text-[11px]"
                    >
                      Kaldır
                    </button>
                  </div>
                )}
              </form>

              {/* Totals */}
              <div className="space-y-2 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-850">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>İndirim Tutarı</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Kargo Ücreti</span>
                  <span className={shippingFee === 0 ? "text-emerald-400" : "text-white"}>
                    {shippingFee === 0 ? "ÜCRETSİZ" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-850">
                  <span>TOPLAM</span>
                  <span className="text-red-500">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-4 rounded uppercase tracking-widest transition-colors shadow-lg shadow-red-950/50"
              >
                <span>ÖDEMEYE GEÇ (CHECKOUT)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Guarantees Box */}
            <div className="bg-zinc-950/60 border border-zinc-850/80 rounded-xl p-5 space-y-3 text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-red-500 shrink-0" />
                <span>Yurtiçi Kargo ile 2-4 iş gününde kapında</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>14 gün boyunca koşulsuz ücretsiz iade</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL güvenli şifrelenmiş ödeme altyapısı</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
