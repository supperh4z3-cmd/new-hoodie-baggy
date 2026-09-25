"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  CreditCard,
  Search,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  FileText,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { InvoiceModal } from "@/components/common/InvoiceModal";

interface OrderData {
  code: string;
  date: string;
  items: Array<{
    id?: string;
    product?: {
      id?: string;
      name?: string;
      price?: number;
      images?: string[];
    };
    name?: string;
    price?: number;
    size?: string;
    color?: string;
    quantity?: number;
  }>;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  codFee: number;
  finalTotal: number;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    district: string;
    address: string;
  };
  paymentMethod: string;
  status: string;
}

function getOrderData(code: string): OrderData | null {
  if (!code) return null;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`order_${code}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
  }

  // Fallback mock order if code not found in local storage
  return {
    code,
    date: new Date().toLocaleDateString("tr-TR"),
    items: [
      {
        id: "mock-1",
        product: {
          id: "prod-1",
          name: "HEAVYWEIGHT DRILL HOODIE (460 GSM)",
          price: 1850,
          images: ["/images/products/drill-logo-hoodie.webp"],
        },
        size: "L",
        color: "Pitch Black",
        quantity: 1,
      },
    ],
    subtotal: 1850,
    discountAmount: 0,
    shippingFee: 0,
    codFee: 0,
    finalTotal: 1850,
    formData: {
      firstName: "Mehmet",
      lastName: "Yılmaz",
      email: "mehmet.yilmaz@example.com",
      phone: "0532 123 45 67",
      city: "İstanbul",
      district: "Kadıköy",
      address: "Moda Caddesi No: 42/3",
    },
    paymentMethod: "credit-card",
    status: "Sipariş Alındı",
  };
}

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  
  const [activeCode, setActiveCode] = useState<string>(() => {
    if (initialCode) return initialCode;
    if (typeof window !== "undefined") {
      return localStorage.getItem("last_order_code") || "BS-849201";
    }
    return "BS-849201";
  });

  const [searchCode, setSearchCode] = useState(activeCode);
  const [order, setOrder] = useState<OrderData | null>(() => getOrderData(activeCode));
  const [dbOrder, setDbOrder] = useState<{
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingCity: string;
    shippingAddress: string;
    totalAmount: number;
    status: string;
    trackingCarrier?: string | null;
    trackingNumber?: string | null;
    createdAt: string;
    items: Array<{
      id: string;
      name: string;
      size: string;
      price: number;
      quantity: number;
      productId?: string | null;
    }>;
  } | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    if (!activeCode) return;
    let isMounted = true;

    async function fetchDbOrder() {
      try {
        const res = await fetch(`/api/orders/${activeCode}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.order) {
            setDbOrder(json.order);
            const formatted: OrderData = {
              code: json.order.orderNumber,
              date: new Date(json.order.createdAt).toLocaleDateString("tr-TR"),
              items: json.order.items.map((it: { id: string; name: string; size: string; price: number; quantity: number; productId?: string | null }) => ({
                id: it.id,
                product: {
                  id: it.productId || it.id,
                  name: it.name,
                  price: it.price,
                  images: ["/images/products/drill-logo-hoodie.webp"],
                },
                size: it.size,
                color: "Default",
                quantity: it.quantity,
              })),
              subtotal: json.order.totalAmount,
              discountAmount: 0,
              shippingFee: 0,
              codFee: 0,
              finalTotal: json.order.totalAmount,
              formData: {
                firstName: json.order.customerName.split(" ")[0] || json.order.customerName,
                lastName: json.order.customerName.split(" ").slice(1).join(" ") || "",
                email: json.order.customerEmail,
                phone: json.order.customerPhone,
                city: json.order.shippingCity,
                district: "Merkez",
                address: json.order.shippingAddress,
              },
              paymentMethod: "credit-card",
              status:
                json.order.status === "DELIVERED"
                  ? "Teslim Edildi"
                  : json.order.status === "SHIPPED"
                  ? "Kargoya Verildi"
                  : json.order.status === "PROCESSING"
                  ? "Hazırlanıyor"
                  : "Sipariş Alındı",
            };
            setOrder(formatted);
          }
        }
      } catch {
        // Fallback to local storage if API call fails
      }
    }

    fetchDbOrder();

    return () => {
      isMounted = false;
    };
  }, [activeCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      const code = searchCode.trim().toUpperCase();
      setActiveCode(code);
      setOrder(getOrderData(code));
    }
  };

  const isStep1Done = true;
  const isStep2Done = dbOrder
    ? ["PROCESSING", "SHIPPED", "DELIVERED"].includes(dbOrder.status)
    : true;
  const isStep3Done = dbOrder
    ? ["SHIPPED", "DELIVERED"].includes(dbOrder.status)
    : false;
  const isStep4Done = dbOrder ? dbOrder.status === "DELIVERED" : false;

  const carrierName = dbOrder?.trackingCarrier || "Yurtiçi Kargo";

  const steps = [
    {
      label: "Sipariş Alındı",
      desc: "Ödeme onaylandı & sipariş sisteme düştü",
      isComplete: isStep1Done,
      icon: CheckCircle2,
    },
    {
      label: "Hazırlanıyor",
      desc: "Ürünler paketleniyor ve kalite kontrolü yapılıyor",
      isComplete: isStep2Done,
      icon: Package,
    },
    {
      label: "Kargoya Verildi",
      desc: dbOrder?.trackingNumber
        ? `${carrierName} Takip No: ${dbOrder.trackingNumber}`
        : "Kargo takip numarası atanması bekleniyor",
      isComplete: isStep3Done,
      icon: Truck,
    },
    {
      label: "Teslim Edildi",
      desc: isStep4Done ? "Alıcıya başarıyla teslim edildi" : "Alıcı adresine sevk edilecek",
      isComplete: isStep4Done,
      icon: MapPin,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">
          ANASAYFA
        </Link>
        <span>/</span>
        <span className="text-white">SİPARİŞ TAKİBİ</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-850">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-white">
            SİPARİŞ DURUMU
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            GÜNCEL KARGO VE TESLİMAT AŞAMALARI
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Sipariş Kodu (BS-XXXXXX)"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-3 py-2 pl-9 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-red-500 uppercase"
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-3.5 py-2 rounded font-mono font-bold transition-colors"
          >
            SORGULA
          </button>
        </form>
      </div>

      {order ? (
        <div className="space-y-8 animate-in fade-in">
          {/* Order Header Card */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400">SİPARİŞ KODU:</span>
                <span className="text-base font-mono font-black text-red-500 bg-red-950/40 border border-red-800/40 px-3 py-1 rounded">
                  #{order.code}
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-500">
                Tahmini Teslimat: <strong>2-3 İş Günü</strong> (Yurtiçi Kargo)
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setShowInvoice(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white transition-colors font-mono text-xs font-bold uppercase shadow-md"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>E-Arşiv Fatura</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Siparişiniz Onaylandı
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Hazırlık aşamasına geçildi
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Status */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 sm:p-8">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-8">
              KARGO VE TESLİMAT SÜRECİ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {steps.map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="flex md:flex-col items-start gap-4 relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                        st.isComplete
                          ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/60"
                          : "bg-zinc-900 border-zinc-800 text-zinc-500"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className={`text-xs font-bold uppercase tracking-wider ${
                          st.isComplete ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        {st.label}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-1">
                        {st.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2-Column: Order Details & Products */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Products List (7 cols) */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-850 rounded-xl p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-white pb-3 border-b border-zinc-850">
                SİPARİŞTEKİ ÜRÜNLER ({order.items.length})
              </h3>

              <div className="divide-y divide-zinc-900">
                {order.items.map((item, idx) => {
                  const itemImg = item.product?.images?.[0] || item.product?.images?.[0] || "/images/products/drill-logo-hoodie.webp";
                  const itemName = item.product?.name || item.name || "BAGGY STREET PARÇASI";
                  const itemPrice = item.product?.price ?? item.price ?? 0;
                  const itemQty = item.quantity || 1;

                  return (
                    <div key={idx} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-20 bg-zinc-900 rounded overflow-hidden shrink-0 border border-zinc-800">
                          <Image
                            src={itemImg}
                            alt={itemName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white uppercase tracking-wider">
                            {itemName}
                          </div>
                          <div className="text-[11px] font-mono text-zinc-500 mt-1">
                            Beden: {item.size || "L"} • Renk: {item.color || "Siyah"} • Adet: {itemQty}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-white">
                        {formatPrice(itemPrice * itemQty)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-4 border-t border-zinc-850 space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="text-white">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Kupon İndirimi</span>
                    <span>-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span className="text-emerald-400">
                    {order.shippingFee === 0 ? "ÜCRETSİZ" : formatPrice(order.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-850">
                  <span>TOPLAM TUTAR</span>
                  <span className="text-red-500">{formatPrice(order.finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 space-y-4">
                <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-white pb-3 border-b border-zinc-850 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>TESLİMAT ADRESİ</span>
                </h3>
                <div className="text-xs font-mono space-y-1.5 text-zinc-300">
                  <div className="font-bold text-white uppercase">
                    {order.formData.firstName} {order.formData.lastName}
                  </div>
                  <div>{order.formData.phone}</div>
                  <div>{order.formData.email}</div>
                  <div className="text-zinc-400 pt-1">
                    {order.formData.address}
                  </div>
                  <div className="text-zinc-400">
                    {order.formData.district} / {order.formData.city}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 space-y-4">
                <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-white pb-3 border-b border-zinc-850 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-red-500" />
                  <span>ÖDEME YÖNTEMİ</span>
                </h3>
                <div className="text-xs font-mono text-zinc-300">
                  {order.paymentMethod === "credit-card" && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Kredi / Banka Kartı (3D Secure Onaylı)</span>
                    </div>
                  )}
                  {order.paymentMethod === "bank-transfer" && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Havale / EFT (Garanti BBVA)</span>
                    </div>
                  )}
                  {order.paymentMethod === "cash-on-delivery" && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Kapıda Ödeme</span>
                    </div>
                  )}
                </div>
              </div>

              {/* WhatsApp Live Support Button */}
              <a
                href={`https://wa.me/905321234567?text=${encodeURIComponent(
                  `Merhaba Baggy Street, ${order.code} kodlu siparişim hakkında bilgi almak istiyorum.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold py-3.5 rounded-xl uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950/50"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP İLE DURUMU SOR</span>
              </a>

              <Link
                href="/shop"
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider transition-colors"
              >
                <span>ALIŞVERİŞE DEVAM ET</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-16 text-center space-y-4">
          <p className="text-zinc-400 text-sm">
            Lütfen sipariş durumunu sorgulamak için geçerli bir sipariş kodu girin.
          </p>
        </div>
      )}

      {/* Official E-Arşiv Invoice Modal */}
      {order && showInvoice && (
        <InvoiceModal
          isOpen={showInvoice}
          onClose={() => setShowInvoice(false)}
          invoice={{
            orderCode: order.code,
            date: order.date,
            customerName: `${order.formData.firstName} ${order.formData.lastName}`,
            phone: order.formData.phone,
            email: order.formData.email,
            address: order.formData.address,
            city: order.formData.city,
            district: order.formData.district,
            paymentMethod: order.paymentMethod,
            items: order.items.map((it) => ({
              name: it.product?.name || it.name || "BAGGY STREET PARÇASI",
              size: it.size || "L",
              color: it.color || "Siyah",
              quantity: it.quantity || 1,
              price: it.product?.price ?? it.price ?? 0,
            })),
            subtotal: order.subtotal || order.finalTotal,
            discountAmount: order.discountAmount,
            shippingFee: order.shippingFee,
            codFee: order.codFee,
            finalTotal: order.finalTotal,
          }}
        />
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-zinc-500 font-mono text-xs">
          SİPARİŞ BİLGİLERİ YÜKLENİYOR...
        </div>
      }
    >
      <OrderTrackingContent />
    </Suspense>
  );
}
