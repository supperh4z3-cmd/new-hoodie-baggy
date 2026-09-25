"use client";

import React from "react";
import { X, Printer, ShieldCheck, QrCode } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export interface InvoiceData {
  orderCode: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  paymentMethod: string;
  items: Array<{
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  discountAmount?: number;
  shippingFee: number;
  codFee?: number;
  finalTotal: number;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceData;
}

export function InvoiceModal({ isOpen, onClose, invoice }: InvoiceModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Approximate %10 textile VAT breakdown in Turkey
  const vatRate = 0.1;
  const taxableAmount = Math.round(invoice.subtotal / (1 + vatRate));
  const vatAmount = invoice.subtotal - taxableAmount;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-zinc-950 text-white border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              RESMİ E-ARŞİV FATURA ÖNİZLEMESİ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-xs font-mono font-bold uppercase"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>YAZDIR / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div id="printable-invoice" className="p-6 sm:p-8 space-y-6 text-xs font-mono bg-zinc-950 text-zinc-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-zinc-800">
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono tracking-tighter text-white uppercase flex items-center gap-2">
                <span>BAGGY STREET</span>
                <span className="text-[10px] text-red-500 border border-red-500/40 px-1.5 py-0.5 rounded">
                  TEKSTİL A.Ş.
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Caferağa Mah. Moda Cad. No: 42/3, Kadıköy / İstanbul
              </p>
              <p className="text-[11px] text-zinc-500">
                Kadıköy V.D. 1234567890 • Mersis: 012345678900001
              </p>
            </div>

            <div className="text-right sm:text-right font-mono space-y-1">
              <div className="text-xs font-bold text-white uppercase">
                E-ARŞİV FATURA
              </div>
              <div className="text-[11px] text-red-400">
                NO: GIB2026-{invoice.orderCode.replace("BS-", "")}
              </div>
              <div className="text-[11px] text-zinc-400">
                Tarih: {new Date(invoice.date).toLocaleDateString("tr-TR")}
              </div>
              <div className="text-[10px] text-zinc-500">
                Düzenleme Saati: 14:32:10
              </div>
            </div>
          </div>

          {/* Customer / Order Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-900/60 border border-zinc-850 rounded-xl">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-bold">SAYIN (ALICI):</span>
              <span className="text-sm font-bold text-white block mt-0.5">
                {invoice.customerName}
              </span>
              <span className="text-zinc-400 block mt-1">
                {invoice.address}
              </span>
              <span className="text-zinc-400 block">
                {invoice.district} / {invoice.city}
              </span>
            </div>

            <div className="space-y-1 text-right sm:text-right">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">İletişim:</span>{" "}
                <span className="text-zinc-300">{invoice.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">E-Posta:</span>{" "}
                <span className="text-zinc-300">{invoice.email}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">Ödeme Türü:</span>{" "}
                <span className="text-white font-bold uppercase">
                  {invoice.paymentMethod === "cod"
                    ? "Kapıda Ödeme"
                    : invoice.paymentMethod === "eft"
                    ? "Havale / EFT"
                    : "Kredi Kartı (3D Secure)"}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-zinc-850 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-850 text-[11px] uppercase">
                <tr>
                  <th className="p-3">Ürün Açıklaması</th>
                  <th className="p-3 text-center">Beden / Renk</th>
                  <th className="p-3 text-center">Adet</th>
                  <th className="p-3 text-right">Birim Fiyat</th>
                  <th className="p-3 text-right">Tutar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/30">
                    <td className="p-3 font-bold text-white uppercase">
                      {item.name}
                    </td>
                    <td className="p-3 text-center text-zinc-400">
                      {item.size} • {item.color}
                    </td>
                    <td className="p-3 text-center font-bold text-white">
                      {item.quantity}
                    </td>
                    <td className="p-3 text-right text-zinc-400">
                      {formatPrice(item.price)}
                    </td>
                    <td className="p-3 text-right font-bold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Breakdown Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="flex items-center gap-3 text-zinc-500 text-[10px] max-w-xs">
              <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg shrink-0">
                <QrCode className="w-10 h-10 text-white" />
              </div>
              <p>
                İşbu fatura 213 sayılı V.U.K. hükümlerine göre elektronik ortamda tanzim edilmiş olup ıslak imza gerektirmez.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 p-3 bg-zinc-900/50 border border-zinc-850 rounded-xl">
              <div className="flex justify-between text-zinc-400">
                <span>Ara Toplam (KDV Hariç):</span>
                <span>{formatPrice(taxableAmount)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>KDV (%10):</span>
                <span>{formatPrice(vatAmount)}</span>
              </div>
              {invoice.discountAmount && invoice.discountAmount > 0 && (
                <div className="flex justify-between text-red-400">
                  <span>İndirim Tutarı:</span>
                  <span>-{formatPrice(invoice.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Kargo Bedeli:</span>
                <span>{invoice.shippingFee === 0 ? "ÜCRETSİZ" : formatPrice(invoice.shippingFee)}</span>
              </div>
              {invoice.codFee && invoice.codFee > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>Kapıda Hizmet Bedeli:</span>
                  <span>{formatPrice(invoice.codFee)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-black text-sm text-white">
                <span>GENEL TOPLAM:</span>
                <span>{formatPrice(invoice.finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Legal Stamp Footer */}
          <div className="pt-4 border-t border-zinc-850 flex items-center justify-between text-[10px] text-zinc-500">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GİB E-Arşiv Portal Onaylı</span>
            </div>
            <span>BAGGY STREET TEKSTİL SAN. TİC. A.Ş.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
