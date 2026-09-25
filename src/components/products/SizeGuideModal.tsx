"use client";

import React, { useEffect } from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  // Lock body scroll and listen for Escape key on mobile & desktop
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
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden w-full max-w-full pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-8 text-white shadow-2xl z-10 animate-in zoom-in-95 duration-200 overflow-hidden box-border max-h-[90vh] overflow-y-auto overscroll-contain"
        style={{ touchAction: "pan-y" }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-850">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-mono font-bold tracking-widest uppercase">
              BEDEN TABLOSU (SIZE GUIDE)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Baggy Street ürünleri <strong>Heavyweight Boxy & Loose Fit</strong> kesimdir. Standart bedeniniz bol ve dökümlü durur. Tam oturmasını istiyorsanız bir beden küçük tercih edebilirsiniz.
          </p>

          {/* Table */}
          <div className="overflow-x-auto border border-zinc-850 rounded-lg">
            <table className="w-full text-xs text-left font-mono">
              <thead className="bg-zinc-900 text-zinc-300 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Beden</th>
                  <th className="py-2.5 px-3">Göğüs / Bel</th>
                  <th className="py-2.5 px-3">Omuz</th>
                  <th className="py-2.5 px-3">Boy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-400">
                <tr>
                  <td className="py-2 px-3 font-bold text-white">S</td>
                  <td className="py-2 px-3">116 cm</td>
                  <td className="py-2 px-3">54 cm</td>
                  <td className="py-2 px-3">70 cm</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">M</td>
                  <td className="py-2 px-3">122 cm</td>
                  <td className="py-2 px-3">56 cm</td>
                  <td className="py-2 px-3">72 cm</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">L</td>
                  <td className="py-2 px-3">128 cm</td>
                  <td className="py-2 px-3">58 cm</td>
                  <td className="py-2 px-3">74 cm</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">XL</td>
                  <td className="py-2 px-3">134 cm</td>
                  <td className="py-2 px-3">60 cm</td>
                  <td className="py-2 px-3">76 cm</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">XXL</td>
                  <td className="py-2 px-3">140 cm</td>
                  <td className="py-2 px-3">62 cm</td>
                  <td className="py-2 px-3">78 cm</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-850 text-[11px] text-zinc-400">
            💡 <em>Model Bilgisi:</em> 185 cm, 80 kg — Ürün çekimlerinde <strong>L Beden</strong> kullanılmıştır.
          </div>
        </div>
      </div>
    </div>
  );
}
