'use client';

import React, { useState } from 'react';
import { X, TicketPercent, Save, Loader2, AlertCircle } from 'lucide-react';

export interface AdminCoupon {
  id: string;
  code: string;
  discount: number;
  type: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
}

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCouponCreated: (coupon: AdminCoupon) => void;
}

export function CouponModal({
  isOpen,
  onClose,
  onCouponCreated,
}: CouponModalProps) {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('15');
  const [type, setType] = useState('PERCENTAGE');
  const [isActive, setIsActive] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          discount: parseFloat(discount),
          type,
          isActive,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Kupon oluşturulamadı.');
      }

      const data = await res.json();
      onCouponCreated(data.coupon);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Kupon kaydedilemedi.');
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
        className="relative w-full max-w-md bg-[#121218] border border-zinc-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-500/10 border border-red-500/30 text-red-500">
              <TicketPercent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase">
                Yeni İndirim Kuponu
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Mağaza için promosyon kodu tanımlayın
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

        {error && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-zinc-400 uppercase text-[11px] mb-1">
              Kupon Kodu *
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ÖRN: DRILL25, STREET50"
              className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-100 font-mono uppercase font-black tracking-wider focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                İndirim Türü
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500"
              >
                <option value="PERCENTAGE">Yüzdelik (%)</option>
                <option value="FIXED">Sabit Tutar (TL)</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                İndirim Değeri *
              </label>
              <input
                type="number"
                required
                min="1"
                step={type === 'PERCENTAGE' ? '1' : '5'}
                max={type === 'PERCENTAGE' ? '100' : '10000'}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-100 font-bold focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded-none bg-zinc-900 border-zinc-700 text-red-600 focus:ring-red-500"
              />
              <span className="text-zinc-300 uppercase text-[11px]">
                Kuponu hemen aktif et
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 uppercase"
            >
              Vazgeç
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-black font-bold uppercase flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>KAYDEDİLİYOR...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>KUPONU OLUŞTUR</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
