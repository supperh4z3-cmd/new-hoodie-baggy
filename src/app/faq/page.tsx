"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Truck,
  RotateCcw,
  Sparkles,
  Shirt,
  CreditCard,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "shipping" | "returns" | "care" | "fit" | "payment";
  question: string;
  answer: string | React.ReactNode;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "ship-1",
    category: "shipping",
    question: "Siparişim ne zaman kargoya verilir ve teslimat kaç gün sürer?",
    answer:
      "Hafta içi saat 16:00'a kadar verilen tüm siparişler aynı gün veya en geç 24 saat içinde Yurtiçi Kargo'ya teslim edilir. İstanbul ve çevre illere ertesi iş günü (24 saat), diğer tüm Türkiye şehirlerine ise 1-3 iş günü içerisinde adrese teslim edilir.",
  },
  {
    id: "ship-2",
    category: "shipping",
    question: "Kargo ücreti ne kadar? Ücretsiz kargo barajı var mı?",
    answer:
      "Sepet tutarınız 2.000 TL ve üzerinde olduğunda tüm Türkiye'ye kargo tamamen ÜCRETSİZDİR. 2.000 TL altındaki siparişlerinizde ise sabit 69 TL Yurtiçi Kargo ücreti yansıtılır.",
  },
  {
    id: "ship-3",
    category: "shipping",
    question: "Kargomu nereden takip edebilirim?",
    answer:
      "Siparişiniz kargoya verildiğinde SMS ve E-posta ile Yurtiçi Kargo takip kodunuz iletilir. Ayrıca sitemizdeki 'Sipariş Takibi' sayfasından sipariş kodunuzu (örn: BS-784912) girerek kargonuzun nerede olduğunu anlık görebilirsiniz.",
  },
  {
    id: "ret-1",
    category: "returns",
    question: "İade ve değişim süresi kaç gündür?",
    answer:
      "Teslimat tarihinden itibaren 14 gün içinde koşulsuz şartsız iade veya beden değişimi talep edebilirsiniz. Ürünün yıkanmamış, açık havada giyilmemiş, parfüm kokusu sinmemiş ve orijinal etiketlerinin sökülmemiş olması gerekmektedir.",
  },
  {
    id: "ret-2",
    category: "returns",
    question: "Beden değişimi nasıl yapılır? Kargo ücretli mi?",
    answer:
      "Kalıp veya beden değişimi için ilk kargo gönderimi Baggy Street tarafından karşılanır. WhatsApp destek hattımızdan (+90 532 123 45 67) veya support@baggystreet.com üzerinden talep oluşturduğunuzda tarafınıza ücretsiz Yurtiçi Kargo iade kodu tanımlanır.",
  },
  {
    id: "ret-3",
    category: "returns",
    question: "Ücret iadem ne zaman kartıma/hesabıma yansır?",
    answer:
      "İade kargonuz Kadıköy depomuza ulaşıp kalite kontrolünden geçtikten sonra aynı gün içinde iade talimatı verilir. Bankanıza bağlı olarak 2-4 iş günü içinde tutar kartınıza veya banka hesabınıza eksiksiz yansır.",
  },
  {
    id: "care-1",
    category: "care",
    question: "460 GSM Heavyweight kumaşlar nasıl yıkanmalı?",
    answer:
      "Ağır gramajlı saf pamuk kumaşlarımızın dokusunu ve renk yoğunluğunu korumak için: 1) Ürünü mutlaka ters çevirerek yıkayınız. 2) Maksimum 30°C soğuk suda, hassas/streetwear programında yıkayınız. 3) Ağartıcı veya yoğun kimyasal içeren yumuşatıcı kullanmayınız. 4) Kurutma makinesine atmayınız; doğrudan düz bir zemine sererek kurutunuz.",
  },
  {
    id: "care-2",
    category: "care",
    question: "Yıkama sonrası çekme veya tüylenme yapar mı?",
    answer:
      "Kumaşlarımız dikim öncesinde özel pres ve ön yıkama işlemlerinden (pre-shrunk) geçirildiği için önerilen 30°C yıkama talimatlarına uyulduğu sürece çekme yapmaz. %100 kompakt taranmış pamuk iplik kullanıldığı için sürtünmeden kaynaklı tüylenme yapmaz.",
  },
  {
    id: "fit-1",
    category: "fit",
    question: "Kalıplarınız nasıl? Normal bedenimi mi almalıyım?",
    answer:
      "Tüm koleksiyonumuz özel 'Amsterdam Boxy' ve 'Wide-Leg Drill' oversize kalıptır. Omuzlar hafif düşük (drop-shoulder), gövde geniş ve etek boyu modern sokak stiline uygundur. Kendi tam bedeninizi aldığınızda ideal dökümlü oversize duruşu elde edersiniz. Daha standart veya dar duruş isterseniz 1 beden küçük tercih edebilirsiniz.",
  },
  {
    id: "fit-2",
    category: "fit",
    question: "Boy ve kilo referansı nedir?",
    answer:
      "Ürün detay sayfalarında yer alan 'Beden Rehberi' modalında boy, kilo ve göğüs ölçülerine göre tavsiye edilen bedenler ayrıntılı tablolarda listelenmiştir. Ayrıca manken ölçüleri (örn: 184 cm, 76 kg - L Beden) her ürün görselinde belirtilmiştir.",
  },
  {
    id: "pay-1",
    category: "payment",
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "1) Tüm bankaların Kredi ve Banka Kartları (12 taksit imkanı, 256-Bit SSL koruması). 2) Havale / FAST ile anında ödemelerde NET %5 EK İNDİRİM. 3) Kapıda Nakit veya Kredi Kartı ile Güvenli Ödeme (+39 TL kargo hizmet bedeli).",
  },
  {
    id: "pay-2",
    category: "payment",
    question: "Kredi kartı bilgilerim kaydediliyor mu?",
    answer:
      "Hayır. Kart bilgileriniz hiçbir şekilde sunucularımızda saklanmaz. Ödeme adımı doğrudan BDDK lisanslı banka altyapısı ve 3D Secure SMS şifresi ile gerçekleşir.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "ship-1": true,
    "care-1": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === "string" &&
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "TÜMÜ" },
    { id: "shipping", label: "KARGO & TESLİMAT", icon: Truck },
    { id: "returns", label: "İADE & DEĞİŞİM", icon: RotateCcw },
    { id: "care", label: "460 GSM BAKIM", icon: Sparkles },
    { id: "fit", label: "KALIP & BEDEN", icon: Shirt },
    { id: "payment", label: "ÖDEME & GÜVENLİK", icon: CreditCard },
  ];

  return (
    <div className="bg-[#050508] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs font-mono text-zinc-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ANASAYFA</span>
          </Link>
          <span>/</span>
          <span className="text-white">SIKÇA SORULAN SORULAR</span>
        </nav>

        {/* Header */}
        <div className="border-b border-zinc-850 pb-8 mb-8">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest font-black mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>MÜŞTERİ REHBERİ // SSS & DESTEK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight uppercase">
            SIKÇA SORULAN SORULAR
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Kargo, 14 gün cayma hakkı, 460 GSM bakım talimatları ve kalıp detayları.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bir soru veya konu ara (örn: kargo, yıkama, beden, iade)..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors font-mono"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-850"
              }`}
            >
              {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-14">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-zinc-950 border border-zinc-850 rounded-xl font-mono text-xs text-zinc-400">
              Aramanızla eşleşen bir soru bulunamadı. Lütfen farklı anahtar kelimeler deneyin veya doğrudan WhatsApp destek hattımıza yazın.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="border border-zinc-850 bg-zinc-950 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold font-mono tracking-wide text-zinc-100 uppercase">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-red-500" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-900 pt-3 font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 460 GSM Heavyweight Care Box */}
        <div className="p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 rounded-2xl mb-12">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-black uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>460 GSM HEAVYWEIGHT // BAKIM TALİMATI</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold font-mono text-white uppercase mb-2">
            ÖZEL AĞIR GRAMAJ PAMUK KUMAŞINI İLK GÜNKÜ GİBİ KORU
          </h3>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            Streetwear kalıplarımız ağır gramajlı saf pamuk dokumadır. Uzun ömürlü kullanım için temel kurallar:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>30°C Sıcaklıkta Ters Çevirerek Yıka</span>
            </div>
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Kurutma Makinesine Atma, Sererek Kurut</span>
            </div>
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Baskı ve Nakışları Ters Yüzden Ütüle</span>
            </div>
          </div>
        </div>

        {/* WhatsApp & Direct Support CTA */}
        <div className="p-6 sm:p-8 bg-zinc-950 border border-red-900/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
              CANLI DESTEK // WHATSAPP
            </div>
            <h4 className="text-base font-black font-mono uppercase text-white">
              Aklına takılan başka bir detay mı var?
            </h4>
            <p className="text-xs text-zinc-400">
              Kadıköy ekibimiz haftanın 7 günü 09:00 - 22:00 arası sorularını yanıtlıyor.
            </p>
          </div>

          <a
            href="https://wa.me/905321234567?text=Merhaba,%20Baggy%20Street%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/40 uppercase whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Destek Hattı</span>
          </a>
        </div>
      </div>
    </div>
  );
}
