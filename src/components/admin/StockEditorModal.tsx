'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Save, Loader2, CheckCircle2 } from 'lucide-react';

interface SizeStock {
  id?: string;
  size: string;
  stock: number;
}

export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  comparePrice?: number | null;
  badge?: string | null;
  image: string;
  description: string;
  inStock: boolean;
  details?: {
    fabric: string;
    fit: string;
    gsm: number;
    origin: string;
  } | null;
  sizes: SizeStock[];
}

interface StockEditorModalProps {
  product: AdminProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onStockUpdated: (product: AdminProduct) => void;
}

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export function StockEditorModal({
  product,
  isOpen,
  onClose,
  onStockUpdated,
}: StockEditorModalProps) {
  // Initialize stocks from product or default sizes
  const [stockMap, setStockMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    DEFAULT_SIZES.forEach((s) => {
      map[s] = 0;
    });
    if (product?.sizes) {
      product.sizes.forEach((s) => {
        map[s.size] = s.stock;
      });
    }
    return map;
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const handleStockChange = (size: string, value: number) => {
    const val = Math.max(0, value);
    setStockMap((prev) => ({
      ...prev,
      [size]: val,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      const sizesArray = Object.entries(stockMap).map(([size, stock]) => ({
        size,
        stock,
      }));

      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sizes: sizesArray }),
      });

      if (!res.ok) throw new Error('Stok güncellenemedi');

      const data = await res.json();
      onStockUpdated(data.product);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      alert('Stok kaydedilirken bir hata meydana geldi.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#121218] border border-zinc-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative bg-zinc-900 border border-zinc-700/80 shrink-0 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase truncate max-w-[280px]">
                {product.name}
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Beden Bazında Envanter Düzenle
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Rows */}
        <div className="py-6 space-y-3">
          {Object.entries(stockMap).map(([size, stock]) => {
            const isCritical = stock <= 5;
            const isLow = stock > 5 && stock <= 15;

            return (
              <div
                key={size}
                className="flex items-center justify-between p-3 bg-zinc-900/60 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-8 flex items-center justify-center font-mono font-black text-sm bg-zinc-800 border border-zinc-700 text-zinc-200">
                    {size}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                      isCritical
                        ? 'text-red-400 bg-red-500/10 border-red-500/30'
                        : isLow
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    }`}
                  >
                    {isCritical ? 'Tükeniyor' : isLow ? 'Az Stok' : 'Yeterli'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStockChange(size, stock - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => handleStockChange(size, parseInt(e.target.value, 10) || 0)}
                    className="w-16 bg-[#0a0a0e] border border-zinc-700 text-center py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-red-500"
                  />

                  <button
                    type="button"
                    onClick={() => handleStockChange(size, stock + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div>
            {success && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Stoklar güncellendi!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-mono uppercase"
            >
              İptal
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-black font-mono font-bold text-xs uppercase flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>KAYDEDİLİYOR...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>STOKLARI KAYDET</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
