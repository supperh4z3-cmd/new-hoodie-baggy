'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  Truck,
  Ticket,
  Layers,
} from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { RecentOrdersTable } from '@/components/admin/RecentOrdersTable';
import { LowStockAlerts } from '@/components/admin/LowStockAlerts';

interface AnalyticsData {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    pendingOrders: number;
    totalProducts: number;
    lowStockCount: number;
  };
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    shippingCity: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: Array<{
      id: string;
      name: string;
      size: string;
      quantity: number;
      price: number;
    }>;
  }>;
  lowStockItems: Array<{
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
  }>;
  categoryBreakdown: Array<{
    category: string;
    count: number;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await fetch('/api/admin/analytics');
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setData(json);
          }
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/analytics');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to refresh analytics:', err);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-zinc-900 w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-[#121218] border border-zinc-800" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-72 bg-[#121218] border border-zinc-800" />
          <div className="h-72 bg-[#121218] border border-zinc-800" />
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    lowStockCount: 0,
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              GENEL BAKIŞ & RAPORLAR
            </h1>
          </div>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            BAGGY STREET Istanbul & Amsterdam operasyon kontrol merkezi
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-500' : ''}`} />
            <span>Yenile</span>
          </button>

          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-500 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Yeni Drop / Ürün</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Toplam Hasılat"
          value={`${stats.totalRevenue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`}
          subValue="İptal edilmeyen tüm siparişler"
          icon={DollarSign}
          change="+18.4%"
          trend="up"
          accentColor="emerald"
        />

        <StatCard
          title="Toplam Sipariş"
          value={stats.totalOrders.toString()}
          subValue={`${stats.pendingOrders} sipariş işlem bekliyor`}
          icon={ShoppingBag}
          change="+12.0%"
          trend="up"
          accentColor="blue"
        />

        <StatCard
          title="Katalogdaki Ürünler"
          value={stats.totalProducts.toString()}
          subValue="Aktif sokak koleksiyonu"
          icon={Package}
          trend="neutral"
          accentColor="red"
        />

        <StatCard
          title="Kritik Stok Uyarısı"
          value={stats.lowStockCount.toString()}
          subValue="15 adedin altındaki bedenler"
          icon={AlertTriangle}
          trend={stats.lowStockCount > 0 ? 'down' : 'neutral'}
          accentColor={stats.lowStockCount > 0 ? 'amber' : 'emerald'}
        />
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/orders"
          className="p-4 bg-[#121218] border border-zinc-800/80 hover:border-blue-500/50 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-zinc-200 uppercase">
                Sipariş & Kargo Yönetimi
              </h3>
              <p className="text-[11px] text-zinc-500 font-mono">
                {stats.pendingOrders} kargo hazırlanmayı bekliyor
              </p>
            </div>
          </div>
          <span className="text-zinc-500 group-hover:text-white font-mono transition-colors">→</span>
        </Link>

        <Link
          href="/admin/products"
          className="p-4 bg-[#121218] border border-zinc-800/80 hover:border-red-500/50 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-400 group-hover:bg-red-500 group-hover:text-black transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-zinc-200 uppercase">
                Envanter & Beden Stok
              </h3>
              <p className="text-[11px] text-zinc-500 font-mono">
                Beden stoklarını ve fiyatları güncelle
              </p>
            </div>
          </div>
          <span className="text-zinc-500 group-hover:text-white font-mono transition-colors">→</span>
        </Link>

        <Link
          href="/admin/coupons"
          className="p-4 bg-[#121218] border border-zinc-800/80 hover:border-amber-500/50 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-zinc-200 uppercase">
                İndirim Kuponları
              </h3>
              <p className="text-[11px] text-zinc-500 font-mono">
                Yeni kampanya ve promosyon kodu oluştur
              </p>
            </div>
          </div>
          <span className="text-zinc-500 group-hover:text-white font-mono transition-colors">→</span>
        </Link>
      </div>

      {/* Main Grid: Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={data?.recentOrders || []} />
        </div>

        <div>
          <LowStockAlerts items={data?.lowStockItems || []} />
        </div>
      </div>
    </div>
  );
}
