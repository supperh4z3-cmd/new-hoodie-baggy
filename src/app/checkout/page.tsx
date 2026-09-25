"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Banknote,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "credit-card" | "bank-transfer" | "cash-on-delivery";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const discountAmount = useCartStore((state) => state.getDiscountAmount());
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const baseShippingFee = useCartStore((state) => state.getShippingFee());
  const clearCart = useCartStore((state) => state.clearCart);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "Mehmet",
    lastName: "Yılmaz",
    email: "mehmet.yilmaz@example.com",
    phone: "0532 123 45 67",
    city: "İstanbul",
    district: "Kadıköy",
    address: "Moda Caddesi No: 42/3",
    zipCode: "34710",
    orderNotes: "Zil çalmayın lütfen, kapıya bırakabilirsiniz.",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [ibanCopied, setIbanCopied] = useState(false);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [cardData, setCardData] = useState({
    cardHolder: "MEHMET YILMAZ",
    cardNumber: "4543 •••• •••• 8821",
    expiry: "12/28",
    cvv: "321",
    installments: "single",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Additional fee for cash on delivery
  const codFee = paymentMethod === "cash-on-delivery" ? 35 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + baseShippingFee + codFee);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ad gereklidir";
    if (!formData.lastName.trim()) newErrors.lastName = "Soyad gereklidir";
    if (!formData.email.trim()) newErrors.email = "E-posta gereklidir";
    if (!formData.phone.trim()) newErrors.phone = "Telefon gereklidir";
    if (!formData.city.trim()) newErrors.city = "Şehir seçiniz";
    if (!formData.district.trim()) newErrors.district = "İlçe gereklidir";
    if (!formData.address.trim()) newErrors.address = "Teslimat adresi gereklidir";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    setIsProcessing(true);

    // Generate unique order number
    const generatedCode = `BS-${Math.floor(100000 + Math.random() * 900000)}`;

    // Store in localStorage for the order tracking simulation
    const orderData = {
      code: generatedCode,
      date: new Date().toISOString(),
      items,
      subtotal,
      discountAmount,
      shippingFee: baseShippingFee,
      codFee,
      finalTotal,
      formData,
      paymentMethod,
      status: "Sipariş Alındı",
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`order_${generatedCode}`, JSON.stringify(orderData));
        localStorage.setItem("last_order_code", generatedCode);
      } catch {
        // Ignore
      }
    }

    // Simulate 1.5s bank/server processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push(`/order-tracking?code=${generatedCode}`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-5">
        <h1 className="text-2xl font-black tracking-widest text-white uppercase">
          SEPETİNİZ BOŞ
        </h1>
        <p className="text-xs font-mono text-zinc-400">
          Ödeme adımına geçebilmek için sepetinize en az bir ürün eklemelisiniz.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-8 py-3.5 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors"
        >
          <span>ÜRÜNLERİ İNCELE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">
          ANASAYFA
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-white transition-colors">
          SEPETİM
        </Link>
        <span>/</span>
        <span className="text-white">GÜVENLİ ÖDEME (CHECKOUT)</span>
      </nav>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-850">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-white">
            GÜVENLİ SİPARİŞ TAMAMLAMA
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            256-BIT SSL İLE ŞİFRELENMİŞ GÜVENLİ ÖDEME ALTYAPISI
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded">
          <Lock className="w-3.5 h-3.5" />
          <span>SSL GÜVENLİ BAĞLANTI</span>
        </div>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Forms (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Delivery Address */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-850">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">
                TESLİMAT VE FATURA BİLGİLERİ
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Ad *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`w-full bg-zinc-900 border rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.firstName ? "border-red-500" : "border-zinc-800"
                  }`}
                  placeholder="Adınız"
                />
                {errors.firstName && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Soyad *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full bg-zinc-900 border rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.lastName ? "border-red-500" : "border-zinc-800"
                  }`}
                  placeholder="Soyadınız"
                />
                {errors.lastName && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {errors.lastName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  E-Posta Adresi *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full bg-zinc-900 border rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.email ? "border-red-500" : "border-zinc-800"
                  }`}
                  placeholder="ornek@mail.com"
                />
                {errors.email && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full bg-zinc-900 border rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.phone ? "border-red-500" : "border-zinc-800"
                  }`}
                  placeholder="05XX XXX XX XX"
                />
                {errors.phone && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  İl (Şehir) *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="İstanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Bursa">Bursa</option>
                  <option value="Antalya">Antalya</option>
                  <option value="Adana">Adana</option>
                  <option value="Eskişehir">Eskişehir</option>
                  <option value="Trabzon">Trabzon</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  İlçe *
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className={`w-full bg-zinc-900 border rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.district ? "border-red-500" : "border-zinc-800"
                  }`}
                  placeholder="Kadıköy, Beşiktaş vb."
                />
                {errors.district && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {errors.district}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Açık Teslimat Adresi *
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full bg-zinc-900 border rounded px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors resize-none ${
                    errors.address ? "border-red-500" : "border-zinc-800"
                  }`}
                  placeholder="Mahalle, Cadde/Sokak, Bina No, Daire No"
                />
                {errors.address && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {errors.address}
                  </span>
                )}
              </div>

              {/* WhatsApp Notification Option */}
              <div className="sm:col-span-2 pt-1">
                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 cursor-pointer select-none text-xs font-mono text-zinc-300 hover:border-zinc-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={notifyWhatsapp}
                    onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                    className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0"
                  />
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Kargo takip ve sipariş durumumu WhatsApp üzerinden anlık mesaj olarak bildir.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-850">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">
                ÖDEME YÖNTEMİ
              </h2>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("credit-card")}
                className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === "credit-card"
                    ? "bg-red-950/20 border-red-500 ring-1 ring-red-500 text-white"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-5 h-5 text-red-400" />
                  <span className="text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
                    3D SECURE
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Kredi / Banka Kartı
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">
                    Taksit & Tek Çekim
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("bank-transfer")}
                className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === "bank-transfer"
                    ? "bg-red-950/20 border-red-500 ring-1 ring-red-500 text-white"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded">
                    %5 İNDİRİM
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Havale / EFT
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">
                    Anında IBAN Transferi
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cash-on-delivery")}
                className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === "cash-on-delivery"
                    ? "bg-red-950/20 border-red-500 ring-1 ring-red-500 text-white"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
                    +35 ₺
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Kapıda Ödeme
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">
                    Nakit veya Kart ile
                  </div>
                </div>
              </button>
            </div>

            {/* Credit Card Detail Fields */}
            {paymentMethod === "credit-card" && (
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-lg p-5 space-y-4 animate-in fade-in">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    type="text"
                    value={cardData.cardHolder}
                    onChange={(e) =>
                      setCardData({ ...cardData, cardHolder: e.target.value.toUpperCase() })
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2 text-xs text-white uppercase focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    value={cardData.cardNumber}
                    onChange={(e) =>
                      setCardData({ ...cardData, cardNumber: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Son Kullanma Tarihi (AA/YY)
                    </label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData({ ...cardData, expiry: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      CVV / Güvenlik Kodu
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData({ ...cardData, cvv: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer Details */}
            {paymentMethod === "bank-transfer" && (
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-lg p-5 space-y-3 font-mono text-xs animate-in fade-in">
                <p className="text-zinc-300">
                  Lütfen sipariş tutarını aşağıdaki banka hesabına havale/EFT yaparken açıklama kısmına <strong>Adınızı ve Sipariş Kodunuzu</strong> ekleyiniz.
                </p>
                <div className="bg-black/60 p-4 rounded-xl border border-zinc-800 space-y-2.5 text-zinc-300">
                  <div className="flex justify-between items-center">
                    <span><strong>Banka:</strong> Garanti BBVA</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/50 text-[10px]">
                      %5 HAVALE İNDİRİMİ
                    </span>
                  </div>
                  <div><strong>Hesap Sahibi:</strong> BAGGY STREET TEKSTİL A.Ş.</div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-zinc-850">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">IBAN NUMARASI:</span>
                      <span className="text-white font-bold select-all tracking-wider text-xs sm:text-sm">
                        TR42 0006 2000 0001 2345 6789 01
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText("TR420006200000012345678901");
                        setIbanCopied(true);
                        setTimeout(() => setIbanCopied(false), 2000);
                      }}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                        ibanCopied
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                          : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                      }`}
                    >
                      {ibanCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>KOPYALANDI!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>IBAN KOPYALA</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Cash on Delivery Details */}
            {paymentMethod === "cash-on-delivery" && (
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-lg p-5 space-y-2 text-xs font-mono text-zinc-400 animate-in fade-in">
                <p>
                  Siparişiniz Yurtiçi Kargo kuryesi tarafından adresinize getirildiğinde kapıda <strong>Nakit</strong> veya <strong>Kredi Kartı</strong> ile tek çekim şeklinde ödeyebilirsiniz.
                </p>
                <p className="text-red-400">
                  * Kapıda ödeme hizmet bedeli (+35 ₺) faturanıza yansıtılmıştır.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-6 sm:p-7 space-y-5 lg:sticky lg:top-24">
            <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-white border-b border-zinc-850 pb-4">
              SİPARİŞ ÖZETİ ({items.length} ÜRÜN)
            </h2>

            {/* Mini Items List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-zinc-900 pr-1 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-zinc-900 rounded overflow-hidden shrink-0 border border-zinc-800">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider line-clamp-1">
                        {item.product.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {item.size} • {item.color} • {item.quantity} Adet
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-zinc-200">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs font-mono text-zinc-400 pt-4 border-t border-zinc-850">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Kupon İndirimi ({appliedCoupon})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Kargo Bedeli</span>
                <span className={baseShippingFee === 0 ? "text-emerald-400" : "text-white"}>
                  {baseShippingFee === 0 ? "ÜCRETSİZ" : formatPrice(baseShippingFee)}
                </span>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>Kapıda Ödeme Hizmeti</span>
                  <span>+{formatPrice(codFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-850">
                <span>ÖDENECEK TUTAR</span>
                <span className="text-red-500">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Complete Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white text-xs font-bold py-4 rounded uppercase tracking-widest transition-all shadow-xl shadow-red-950/60"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SİPARİŞ OLUŞTURULUYOR...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>SİPARİŞİ ONAYLA VE BİTİR</span>
                </>
              )}
            </button>

            {/* Guarantees */}
            <div className="pt-2 border-t border-zinc-900 space-y-2 text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Yurtiçi Kargo ile 2-4 iş gününde kapında</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>14 gün koşulsuz ve ücretsiz kolay iade</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
