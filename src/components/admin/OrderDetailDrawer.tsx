'use client';

import React, { useState } from 'react';
import {
  X,
  Truck,
  FileText,
  User,
  CheckCircle2,
  Save,
  Loader2,
  Package,
} from 'lucide-react';
import { InvoiceModal, InvoiceData } from '@/components/common/InvoiceModal';

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingCity: string;
  shippingAddress: string;
  totalAmount: number;
  status: string;
  trackingNumber?: string | null;
  trackingCarrier?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrderDetailDrawerProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated: (order: AdminOrder) => void;
}

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Beklemede', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { value: 'PROCESSING', label: 'Hazırlanıyor', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { value: 'SHIPPED', label: 'Kargoya Verildi', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { value: 'DELIVERED', label: 'Teslim Edildi', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { value: 'CANCELLED', label: 'İptal Edildi', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
];

export function OrderDetailDrawer({
  order,
  isOpen,
  onClose,
  onOrderUpdated,
}: OrderDetailDrawerProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(order?.status || 'PENDING');
  const [carrier, setCarrier] = useState<string>(order?.trackingCarrier || 'Yurtiçi Kargo');
  const [trackingNumber, setTrackingNumber] = useState<string>(order?.trackingNumber || '');
  const [notes, setNotes] = useState<string>(order?.notes || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  if (!isOpen || !order) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: selectedStatus,
          trackingCarrier: carrier,
          trackingNumber: trackingNumber.trim() || null,
          notes: notes.trim() || null,
        }),
      });

      if (!res.ok) throw new Error('Güncelleme başarısız');

      const data = await res.json();
      onOrderUpdated(data.order);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Sipariş güncellenirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  // Convert to InvoiceData format for InvoiceModal
  const invoiceData: InvoiceData = {
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#0e0e13] border-l border-zinc-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-mono font-black text-white tracking-wider">
                {order.orderNumber}
              </h2>
              <span className="text-xs font-mono text-zinc-500">
                {new Date(order.createdAt).toLocaleString('tr-TR')}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Müşteri: {order.customerName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInvoiceOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>E-Fatura</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Pipeline Selection */}
          <div className="bg-[#121218] border border-zinc-800 p-4">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3">
              Sipariş Durumu
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = selectedStatus === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedStatus(opt.value)}
                    className={`px-3 py-2 text-xs font-mono font-bold uppercase border text-center transition-all ${
                      isSelected
                        ? `${opt.color} ring-1 ring-red-500 font-black`
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shipping & Tracking Input */}
          <div className="bg-[#121218] border border-zinc-800 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
              <Truck className="w-4 h-4 text-red-500" />
              <span>Kargo & Takip Bilgisi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  Kargo Firması
                </label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-zinc-800 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-red-500"
                >
                  <option value="Yurtiçi Kargo">Yurtiçi Kargo</option>
                  <option value="Aras Kargo">Aras Kargo</option>
                  <option value="MNG Kargo">MNG Kargo</option>
                  <option value="Kolay Gelsin">Kolay Gelsin</option>
                  <option value="Kurye Express">Kurye Express (İstanbul)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  Takip Numarası
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Örn: YK-89214712"
                  className="w-full bg-[#0a0a0e] border border-zinc-800 px-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="bg-[#121218] border border-zinc-800 p-4">
            <h3 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-400" />
              <span>Müşteri & Teslimat Bilgileri</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Ad Soyad</span>
                <span className="text-zinc-200 font-medium">{order.customerName}</span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">E-Posta</span>
                <span className="text-zinc-200">{order.customerEmail}</span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Telefon</span>
                <span className="text-zinc-200">{order.customerPhone}</span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Şehir</span>
                <span className="text-zinc-200 font-bold">{order.shippingCity}</span>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">Açık Adres</span>
                <div className="p-2.5 bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                  {order.shippingAddress}
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div className="bg-[#121218] border border-zinc-800 p-4">
            <h3 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-zinc-400" />
              <span>Sipariş Kalemleri ({order.items.length})</span>
            </h3>

            <div className="divide-y divide-zinc-800/80 text-xs font-mono">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-zinc-200 block">{item.name}</span>
                    <span className="text-[11px] text-zinc-500">
                      Beden: <strong className="text-zinc-300">{item.size}</strong> • Adet: {item.quantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white block">
                      {(item.price * item.quantity).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      ({item.price.toLocaleString('tr-TR')} ₺ / adet)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-zinc-400 uppercase">Toplam Tutar:</span>
              <span className="text-base text-red-400">
                {order.totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
              </span>
            </div>
          </div>

          {/* Internal / Delivery Notes */}
          <div className="bg-[#121218] border border-zinc-800 p-4">
            <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Sipariş & Kurye Notu
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Örn: Teslimatta zile basılmayacak..."
              className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between gap-4">
          <div>
            {saveSuccess && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Değişiklikler kaydedildi!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Vazgeç
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>KAYDEDİLİYOR...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>DEĞİŞİKLİKLERİ KAYDET</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Modal Trigger */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        invoice={invoiceData}
      />
    </>
  );
}
