'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  ShoppingBag,
  FileText,
  Truck,
} from 'lucide-react';
import {
  OrderDetailDrawer,
  AdminOrder,
} from '@/components/admin/OrderDetailDrawer';
import { InvoiceModal, InvoiceData } from '@/components/common/InvoiceModal';

const STATUS_TABS = [
  { id: 'ALL', label: 'TÜMÜ' },
  { id: 'PENDING', label: 'BEKLEYENLER' },
  { id: 'PROCESSING', label: 'HAZIRLANANLAR' },
  { id: 'SHIPPED', label: 'KARGODA' },
  { id: 'DELIVERED', label: 'TESLİM EDİLDİ' },
  { id: 'CANCELLED', label: 'İPTAL' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Quick Invoice Preview Modal
  const [quickInvoice, setQuickInvoice] = useState<InvoiceData | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      try {
        const queryParams = new URLSearchParams();
        if (activeTab !== 'ALL') queryParams.set('status', activeTab);
        if (search.trim()) queryParams.set('search', search.trim());

        const res = await fetch(`/api/admin/orders?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setOrders(data.orders || []);
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [activeTab, search]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const queryParams = new URLSearchParams();
      if (activeTab !== 'ALL') queryParams.set('status', activeTab);
      if (search.trim()) queryParams.set('search', search.trim());

      const res = await fetch(`/api/admin/orders?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleOrderUpdated = (updated: AdminOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
    setSelectedOrder(updated);
  };

  const openDrawer = (order: AdminOrder) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const openQuickInvoice = (e: React.MouseEvent, order: AdminOrder) => {
    e.stopPropagation();
    const inv: InvoiceData = {
      orderCode: order.orderNumber,
      date: new Date(order.createdAt).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      customerName: order.customerName,
      phone: order.customerPhone,
      email: order.customerEmail,
      address: order.shippingAddress,
      city: order.shippingCity,
      district: 'Merkez',
      paymentMethod: 'Kredi / Banka Kartı (Online)',
      items: order.items.map((it) => ({
        name: it.name,
        size: it.size,
        color: 'Default',
        quantity: it.quantity,
        price: it.price,
      })),
      subtotal: order.totalAmount,
      shippingFee: 0,
      finalTotal: order.totalAmount,
    };
    setQuickInvoice(inv);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Beklemede
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
            Hazırlanıyor
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30">
            Kargoda
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Teslim Edildi
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
            İptal
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-zinc-800 text-zinc-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
            SİPARİŞ & KARGO TAKİBİ
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            Gelen siparişleri yönetin, kargo takip numarası atayın ve fatura kesin
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-500' : ''}`} />
          <span>Yenile</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border transition-colors shrink-0 ${
                  isActive
                    ? 'bg-red-600 text-black border-red-600'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sipariş no, müşteri veya tel..."
            className="w-full bg-[#121218] border border-zinc-800 pl-9 pr-3 py-1.5 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#121218] border border-zinc-800">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs animate-pulse">
            Siparişler yükleniyor...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
            <span>Kriterlere uygun sipariş bulunamadı.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] font-mono uppercase text-zinc-500 bg-zinc-950/40">
                  <th className="py-3 px-4">Sipariş No & Tarih</th>
                  <th className="py-3 px-4">Müşteri</th>
                  <th className="py-3 px-4 hidden md:table-cell">Teslimat Şehri</th>
                  <th className="py-3 px-4">Tutar</th>
                  <th className="py-3 px-4">Durum</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Kargo Takip</th>
                  <th className="py-3 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs font-mono">
                {orders.map((order) => {
                  const dateStr = new Date(order.createdAt).toLocaleString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr
                      key={order.id}
                      onClick={() => openDrawer(order)}
                      className="hover:bg-zinc-900/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-bold text-zinc-200">
                        <div className="group-hover:text-red-400 transition-colors">
                          {order.orderNumber}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-normal">{dateStr}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-zinc-200 font-medium">{order.customerName}</div>
                        <div className="text-[10px] text-zinc-500 truncate max-w-[150px]">
                          {order.customerPhone}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-zinc-400 hidden md:table-cell">
                        {order.shippingCity}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-white">
                        {order.totalAmount.toLocaleString('tr-TR', {
                          minimumFractionDigits: 2,
                        })}{' '}
                        ₺
                      </td>

                      <td className="py-3.5 px-4">{getStatusBadge(order.status)}</td>

                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        {order.trackingNumber ? (
                          <div className="flex items-center gap-1.5 text-zinc-300">
                            <Truck className="w-3.5 h-3.5 text-purple-400" />
                            <span className="font-bold text-[11px]">{order.trackingNumber}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-500 italic">Girilmedi</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => openQuickInvoice(e, order)}
                            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
                            title="E-Faturayı Yazdır / Gör"
                          >
                            <FileText className="w-3.5 h-3.5 text-red-500" />
                          </button>

                          <button
                            onClick={() => openDrawer(order)}
                            className="px-2.5 py-1 bg-zinc-900 hover:bg-red-950/40 text-zinc-300 hover:text-red-400 border border-zinc-800 text-[11px] transition-colors"
                          >
                            Yönet
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        key={selectedOrder ? selectedOrder.id : 'none'}
        order={selectedOrder}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOrderUpdated={handleOrderUpdated}
      />

      {/* Quick Invoice Modal */}
      {quickInvoice && (
        <InvoiceModal
          isOpen={!!quickInvoice}
          onClose={() => setQuickInvoice(null)}
          invoice={quickInvoice}
        />
      )}
    </div>
  );
}
