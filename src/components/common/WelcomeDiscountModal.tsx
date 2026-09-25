"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Copy, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { useToastStore } from "@/lib/store/useToastStore";

export function WelcomeDiscountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const showToast = useToastStore((state) => state.showToast);
  const DISCOUNT_CODE = "BAGGY10";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if modal was dismissed within the last 24 hours
    const dismissedAt = localStorage.getItem("baggy_welcome_dismissed");
    if (dismissedAt) {
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (now - parseInt(dismissedAt, 10) < twentyFourHours) {
        return; // Don't show
      }
    }

    // Show after 3.5 seconds of browsing to not be jarring
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("baggy_welcome_dismissed", Date.now().toString());
    }
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      showToast(`Kupon kodu kopyalandı: ${DISCOUNT_CODE}`, "success");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      handleCopyCode();
      showToast("Aramıza hoş geldin! %10 indirim kuponun aktif.", "success");
      setEmail("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="İlk Siparişe Özel İndirim"
    >
      <div
        className="relative w-full max-w-lg bg-[#09090c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-black/50 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-colors"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Art Banner */}
        <div className="relative h-32 sm:h-36 bg-gradient-to-r from-red-950 via-zinc-900 to-black p-6 flex flex-col justify-end border-b border-zinc-850">
          <div className="absolute top-3 left-4 flex items-center gap-1.5 bg-red-600/90 text-white font-mono text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded uppercase">
            <Sparkles className="w-3 h-3" />
            <span>DROP 2026 // HOŞ GELDİN HEDİYESİ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight uppercase text-white">
            İLK SİPARİŞİNE ÖZEL <span className="text-red-500">%10 İNDİRİM</span>
          </h2>
          <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
            Heavyweight hoodie, baggy sweatpants & vintage denimlerde geçerli.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Coupon Code Pill */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">İndirim Kodu</span>
              <span className="text-xl font-black font-mono tracking-widest text-white">
                {DISCOUNT_CODE}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-red-900/30 uppercase"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
          </div>

          {/* Newsletter Box */}
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <label className="block text-xs font-mono text-zinc-400 uppercase">
                Bültene Katıl &amp; Gizli Drop Bildirimlerini Kaçırma:
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresinizi girin"
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors font-mono"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs px-4 py-2.5 rounded-lg transition-colors uppercase whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>Kazan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-400 font-mono text-xs text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Harika! %10 kuponun tanımlandı. Sepette kullanabilirsin.</span>
            </div>
          )}

          {/* Footer note */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>2.000 ₺ üzeri ücretsiz kargo</span>
            </div>
            <button
              onClick={handleClose}
              className="text-zinc-400 hover:text-white transition-colors underline"
            >
              Alışverişe Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
