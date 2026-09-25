'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingCity: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
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
    <div className="bg-[#121218] border border-zinc-800 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            Son Gelen Siparişler
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Canlı sipariş akışı ve anlık durumlar
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
        >
          <span>Tümünü Gör</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="py-12 text-center text-zinc-500 font-mono text-xs">
          <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
          <span>Henüz kayıtlı sipariş bulunmuyor.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-mono uppercase text-zinc-500">
                <th className="py-3 px-3">Sipariş No</th>
                <th className="py-3 px-3">Müşteri</th>
                <th className="py-3 px-3 hidden sm:table-cell">Şehir</th>
                <th className="py-3 px-3">Tutar</th>
                <th className="py-3 px-3">Durum</th>
                <th className="py-3 px-3 text-right">Detay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs font-mono">
              {orders.map((order) => {
                const dateFormatted = new Date(order.createdAt).toLocaleDateString('tr-TR', {
                  day: '2-digit',
                  month: '2-digit',
                });

                return (
                  <tr key={order.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-zinc-200">
                      <div>{order.orderNumber}</div>
                      <span className="text-[10px] text-zinc-500">{dateFormatted}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="text-zinc-200 font-medium">{order.customerName}</div>
                      <div className="text-[10px] text-zinc-500 truncate max-w-[140px]">
                        {order.customerEmail}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-zinc-400 hidden sm:table-cell">
                      {order.shippingCity}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-white">
                      {order.totalAmount.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                      })}{' '}
                      ₺
                    </td>
                    <td className="py-3.5 px-3">{getStatusBadge(order.status)}</td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/admin/orders`}
                        className="px-2.5 py-1 bg-zinc-900 hover:bg-red-950/40 text-zinc-300 hover:text-red-400 border border-zinc-800 text-[11px] transition-colors"
                      >
                        İncele
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
