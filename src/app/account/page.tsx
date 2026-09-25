"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  MapPin,
  Heart,
  ExternalLink,
  Truck,
  ArrowRight,
  ArrowLeft,
  Save,
  MessageCircle,
} from "lucide-react";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useToastStore } from "@/lib/store/useToastStore";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
}

interface OrderData {
  code: string;
  date: string;
  items: OrderItem[];
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
    address: string;
    city: string;
    district: string;
    notes?: string;
  };
  paymentMethod: string;
  status: string;
}

interface SavedAddress {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  fullAddress: string;
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "address" | "wishlist">("orders");
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedAddress, setSavedAddress] = useState<SavedAddress>({
    fullName: "",
    phone: "",
    email: "",
    city: "İstanbul",
    district: "Kadıköy",
    fullAddress: "",
  });

  const wishlistItems = useWishlistStore((state) => state.items);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return;
      try {
        // Load orders from localStorage
        const loadedOrders: OrderData[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("order_BS-")) {
            const val = localStorage.getItem(key);
            if (val) {
              const parsed = JSON.parse(val);
              loadedOrders.push(parsed);
            }
          }
        }

        // Sort by date desc
        loadedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(loadedOrders);

        // Load saved address if present
        const addr = localStorage.getItem("baggy_user_address");
        if (addr) {
          setSavedAddress(JSON.parse(addr));
        } else if (loadedOrders.length > 0) {
          const firstOrder = loadedOrders[0];
          setSavedAddress({
            fullName: `${firstOrder.formData.firstName} ${firstOrder.formData.lastName}`,
            phone: firstOrder.formData.phone,
            email: firstOrder.formData.email,
            city: firstOrder.formData.city,
            district: firstOrder.formData.district,
            fullAddress: firstOrder.formData.address,
          });
        }
      } catch (err) {
        console.error("Account loading error:", err);
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("baggy_user_address", JSON.stringify(savedAddress));
      showToast("Teslimat adresi başarıyla kaydedildi!", "success");
    }
  };

  return (
    <div className="bg-[#050508] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs font-mono text-zinc-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ANASAYFA</span>
          </Link>
          <span>/</span>
          <span className="text-white">HESABIM & SİPARİŞLERİM</span>
        </nav>

        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border border-zinc-850 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-850 border border-zinc-700 flex items-center justify-center text-red-500 shadow-xl">
                <User className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight uppercase">
                    {savedAddress.fullName || "BAGGY STREET MÜŞTERİSİ"}
                  </h1>
                  <span className="bg-red-950 text-red-400 border border-red-800 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                    DRILL CLUB
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {savedAddress.email || "Kayıtlı e-posta adresi bulunmuyor"}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 font-mono text-xs">
              <div className="px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-center">
                <span className="text-zinc-500 block text-[10px] uppercase">Toplam Sipariş</span>
                <span className="text-base font-bold text-white">{orders.length}</span>
              </div>
              <div className="px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-center">
                <span className="text-zinc-500 block text-[10px] uppercase">Favoriler</span>
                <span className="text-base font-bold text-red-400">{wishlistItems.length}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-zinc-850 overflow-x-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
                activeTab === "orders"
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-850"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Siparişlerim ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
                activeTab === "address"
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-850"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Teslimat Adresim</span>
            </button>

            <Link
              href="/wishlist"
              className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-850 ml-auto"
            >
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span>Favori Ürünlerime Git</span>
            </Link>
          </div>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {loading ? (
              <div className="p-12 text-center text-zinc-500 font-mono text-xs">
                Sipariş geçmişi yükleniyor...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center bg-zinc-950 border border-zinc-850 rounded-2xl space-y-4">
                <Package className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-base font-bold font-mono uppercase text-white">
                  Henüz Bir Siparişiniz Bulunmuyor
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  En son çıkan 460 GSM oversize hoodie, drop-shoulder ceket ve vintage denim koleksiyonumuza göz atın.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-white text-black font-bold font-mono text-xs px-6 py-3 rounded-lg uppercase hover:bg-zinc-200 transition-colors"
                  >
                    <span>Koleksiyonu Keşfet</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.code}
                  className="bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden hover:border-zinc-750 transition-all"
                >
                  {/* Order Card Header */}
                  <div className="p-5 bg-zinc-900/60 border-b border-zinc-850 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Sipariş Kodu</span>
                        <span className="font-bold text-white text-sm">{order.code}</span>
                      </div>
                      <div className="h-6 w-px bg-zinc-800" />
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Tarih</span>
                        <span className="text-zinc-300">
                          {new Date(order.date).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-800 text-red-400 font-bold rounded-full text-[11px] uppercase">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{order.status || "Sipariş Alındı"}</span>
                      </span>

                      <Link
                        href={`/order-tracking?code=${order.code}`}
                        className="inline-flex items-center gap-1 text-white hover:text-red-400 bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-lg transition-colors font-bold"
                      >
                        <span>Kargo Takip</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="p-5 divide-y divide-zinc-900">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold font-mono uppercase text-white line-clamp-1">
                              {item.name}
                            </h4>
                            <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2 mt-0.5">
                              <span>Beden: {item.size}</span>
                              <span>•</span>
                              <span>Renk: {item.color}</span>
                              <span>•</span>
                              <span>Adet: {item.quantity}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-mono text-xs font-bold text-white shrink-0">
                          {item.price * item.quantity} ₺
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="p-4 bg-zinc-900/30 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="text-zinc-400 text-[11px]">
                      Teslimat: <span className="text-white">{order.formData.district} / {order.formData.city}</span> ({order.paymentMethod === "cod" ? "Kapıda Ödeme" : order.paymentMethod === "eft" ? "Havale / EFT" : "Kredi Kartı"})
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-zinc-400">Toplam Ödenen:</span>
                      <span className="text-sm font-black text-white">
                        {order.finalTotal} ₺
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Address */}
        {activeTab === "address" && (
          <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 sm:p-8 max-w-2xl">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-black uppercase mb-4">
              <MapPin className="w-4 h-4" />
              <span>VARSAYILAN TESLİMAT BİLGİLERİ</span>
            </div>
            <h3 className="text-base font-bold font-mono uppercase text-white mb-2">
              KAYITLI ADRESİNİ GÜNCELLE
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Bu bilgiler sonraki alışverişlerinizde ödeme adımında otomatik doldurulacaktır.
            </p>

            <form onSubmit={handleSaveAddress} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Ad Soyad</label>
                <input
                  type="text"
                  value={savedAddress.fullName}
                  onChange={(e) => setSavedAddress({ ...savedAddress, fullName: e.target.value })}
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={savedAddress.phone}
                    onChange={(e) => setSavedAddress({ ...savedAddress, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">E-Posta</label>
                  <input
                    type="email"
                    value={savedAddress.email}
                    onChange={(e) => setSavedAddress({ ...savedAddress, email: e.target.value })}
                    placeholder="ornek@email.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Şehir</label>
                  <input
                    type="text"
                    value={savedAddress.city}
                    onChange={(e) => setSavedAddress({ ...savedAddress, city: e.target.value })}
                    placeholder="İstanbul"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">İlçe</label>
                  <input
                    type="text"
                    value={savedAddress.district}
                    onChange={(e) => setSavedAddress({ ...savedAddress, district: e.target.value })}
                    placeholder="Kadıköy"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Açık Adres (Cadde, Sokak, Kapı No)</label>
                <textarea
                  rows={3}
                  value={savedAddress.fullAddress}
                  onChange={(e) => setSavedAddress({ ...savedAddress, fullAddress: e.target.value })}
                  placeholder="Caferağa Mah. Moda Cad. No: 42 D: 3"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-lg uppercase transition-all shadow-lg shadow-red-900/40"
                >
                  <Save className="w-4 h-4" />
                  <span>Adres Bilgilerini Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Support Banner */}
        <div className="mt-14 p-6 bg-zinc-950 border border-zinc-850 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-zinc-300">
              Siparişinizle ilgili acil bir değişiklik veya iade talebiniz mi var?
            </span>
          </div>

          <a
            href="https://wa.me/905321234567?text=Merhaba,%20siparişim%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline font-bold uppercase whitespace-nowrap"
          >
            WhatsApp Müşteri Destek Hattı →
          </a>
        </div>
      </div>
    </div>
  );
}
