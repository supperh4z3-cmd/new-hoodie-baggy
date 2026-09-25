'use client';

import React, { useState, useEffect } from 'react';
import {
  Ticket,
  PlusCircle,
  RefreshCw,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
} from 'lucide-react';
import { CouponModal, AdminCoupon } from '@/components/admin/CouponModal';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCoupons() {
      try {
        const res = await fetch('/api/admin/coupons');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setCoupons(data.coupons || []);
        }
      } catch (err) {
        console.error('Failed to load coupons:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCoupons();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCouponCreated = (newCoupon: AdminCoupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const handleToggleActive = async (coupon: AdminCoupon) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });

      if (res.ok) {
        const data = await res.json();
        setCoupons((prev) =>
          prev.map((c) => (c.id === coupon.id ? data.coupon : c))
        );
      }
    } catch (err) {
      console.error(err);
      alert('Kupon durumu değiştirilemedi.');
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`"${code}" kuponunu kalıcı olarak silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert('Kupon silinemedi.');
      }
    } catch (err) {
      console.error(err);
      alert('Kupon silinemedi.');
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
            İNDİRİM KUPONLARI & KAMPANYALAR
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            Müşteriler için indirim kodları tanımlayın ve kullanım istatistiklerini takip edin
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-500' : ''}`} />
            <span>Yenile</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni Kupon Oluştur</span>
          </button>
        </div>
      </div>

      {/* Coupons Table / Cards */}
      <div className="bg-[#121218] border border-zinc-800">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs animate-pulse">
            Kuponlar yükleniyor...
          </div>
        ) : coupons.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            <Ticket className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
            <span>Tanımlı indirim kuponu bulunmuyor.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] font-mono uppercase text-zinc-500 bg-zinc-950/40">
                  <th className="py-3 px-4">Kupon Kodu</th>
                  <th className="py-3 px-4">İndirim Oranı</th>
                  <th className="py-3 px-4">Tür</th>
                  <th className="py-3 px-4">Kullanım</th>
                  <th className="py-3 px-4">Durum</th>
                  <th className="py-3 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs font-mono">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-zinc-900 border border-dashed border-red-500/60 text-red-400 font-black tracking-wider text-xs">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className="p-1 text-zinc-500 hover:text-zinc-300"
                          title="Kodu Kopyala"
                        >
                          {copiedCode === coupon.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white">
                      {coupon.type === 'PERCENTAGE'
                        ? `%${coupon.discount} İndirim`
                        : `${coupon.discount.toLocaleString('tr-TR')} ₺ Sabit İndirim`}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-400">
                      {coupon.type === 'PERCENTAGE' ? 'Yüzdelik' : 'Sabit Tutar'}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-300">
                      <span className="font-bold">{coupon.usageCount}</span> kez kullanıldı
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(coupon)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase border transition-colors ${
                          coupon.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-400'
                        }`}
                      >
                        {coupon.isActive ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Aktif</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-zinc-500" />
                            <span>Pasif</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(coupon.id, coupon.code)}
                        className="p-1.5 bg-zinc-900 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-800/40 transition-colors"
                        title="Kuponu Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Coupon Creation Modal */}
      {isModalOpen && (
        <CouponModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCouponCreated={handleCouponCreated}
        />
      )}
    </div>
  );
}
