'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LowStockItem {
  id: string;
  size: string;
  stock: number;
  product: {
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
  };
}

interface LowStockAlertsProps {
  items: LowStockItem[];
}

export function LowStockAlerts({ items }: LowStockAlertsProps) {
  return (
    <div className="bg-[#121218] border border-zinc-800 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Kritik Stok Uyarıları
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            15 adet ve altı kalan varyantlar
          </p>
        </div>

        <Link
          href="/admin/products"
          className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
        >
          <span>Stokları Düzenle</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="py-10 text-center text-zinc-500 font-mono text-xs">
          <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
          <span>Tüm ürün stok seviyeleri optimal durumda.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 relative bg-zinc-800 shrink-0 overflow-hidden border border-zinc-700/50">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-mono font-semibold text-zinc-200 truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-zinc-500">
                    <span>Beden: <strong className="text-zinc-300">{item.size}</strong></span>
                    <span>•</span>
                    <span>{item.product.price.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 ml-3">
                <span
                  className={`inline-block px-2.5 py-1 text-[11px] font-mono font-black border ${
                    item.stock <= 5
                      ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                  }`}
                >
                  {item.stock} ADET
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
