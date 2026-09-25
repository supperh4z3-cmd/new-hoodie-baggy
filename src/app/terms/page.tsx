import React from "react";
import Link from "next/link";
import { FileCheck, Scale, Truck, RotateCcw, ArrowLeft, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Mesafeli Satış Sözleşmesi ve Kullanım Koşulları | BAGGY STREET",
  description: "Baggy Street Mesafeli Satış Sözleşmesi, 14 gün yasal cayma hakkı, teslimat ve garanti koşulları.",
};

export default function TermsPage() {
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
          <span className="text-white">MESAFELİ SATIŞ SÖZLEŞMESİ</span>
        </nav>

        {/* Header */}
        <div className="border-b border-zinc-850 pb-8 mb-10">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest font-black mb-2">
            <Scale className="w-4 h-4" />
            <span>TÜKETİCİ HAKLARI // 6502 SAYILI KANUN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight uppercase">
            MESAFELİ SATIŞ SÖZLEŞMESİ
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Son Güncelleme: 25 Eylül 2026 • BAGGY STREET TEKSTİL VE SANAYİ A.Ş.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
              <RotateCcw className="w-4 h-4" />
              <span>14 Gün İade</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Teslim tarihinden itibaren 14 gün içinde hiçbir gerekçe göstermeksizin koşulsuz iade hakkı.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
              <Truck className="w-4 h-4" />
              <span>Hızlı Teslimat</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yurtiçi Kargo güvencesiyle İstanbul içi 24 saat, Türkiye geneli 1-3 iş gününde adrese teslim.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
              <FileCheck className="w-4 h-4" />
              <span>E-Fatura</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tüm siparişler maliye onaylı resmi e-arşiv fatura ile e-posta adresinize anında gönderilir.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>Ücretsiz Değişim</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Kalıp veya beden uyuşmazlığında ilk kargo değişimi Baggy Street tarafından karşılanır.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">MADDE 1.</span> TARAFLAR
            </h2>
            <div className="space-y-4">
              <div>
                <strong className="text-white font-mono block mb-1">1.1. SATICI:</strong>
                <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl font-mono text-xs space-y-1 text-zinc-400">
                  <div><strong>Ünvan:</strong> BAGGY STREET TEKSTİL VE SANAYİ A.Ş.</div>
                  <div><strong>Adres:</strong> Caferağa Mah. Moda Cad. No: 42/3, Kadıköy / İstanbul</div>
                  <div><strong>Telefon / WhatsApp:</strong> +90 (532) 123 45 67</div>
                  <div><strong>E-Posta:</strong> support@baggystreet.com</div>
                  <div><strong>Mersis:</strong> 012345678900001</div>
                </div>
              </div>

              <div>
                <strong className="text-white font-mono block mb-1">1.2. ALICI (TÜKETİCİ):</strong>
                <p className="text-zinc-400">
                  Web sitemizden alışveriş yapan ve sipariş formunda iletişim ve teslimat bilgileri yer alan gerçek veya tüzel kişidir.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">MADDE 2.</span> SÖZLEŞMENİN KONUSU
            </h2>
            <p>
              İşbu sözleşmenin konusu, ALICI&apos;nın SATICI&apos;ya ait www.baggystreet.com internet sitesinden elektronik ortamda siparişini yaptığı, sözleşmede bahsi geçen nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">MADDE 3.</span> TESLİMAT ESASLARI VE ÜCRETLERİ
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2 text-zinc-400">
              <li>
                Sipariş edilen ürünler, ALICI&apos;nın belirttiği adrese anlaşmalı kargo şirketi (Yurtiçi Kargo) aracılığıyla güvenli ambalajında teslim edilir.
              </li>
              <li>
                2.000 TL ve üzeri siparişlerde kargo ücreti SATICI tarafından karşılanır. 2.000 TL altı siparişlerde standart 69 TL kargo ücreti sepet toplamına eklenir.
              </li>
              <li>
                Siparişler, ödeme onayını takiben ortalama 24-48 saat içinde kargoya verilir ve takip numarası ALICI&apos;ya SMS / E-Posta / WhatsApp yoluyla iletilir.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">MADDE 4.</span> 14 GÜN CAYMA HAKKI
            </h2>
            <p>
              ALICI, hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren <strong>14 (on dört) gün</strong> içinde sözleşmeden cayma hakkına sahiptir.
            </p>
            <p>
              Cayma hakkının kullanılabilmesi için bu süre içinde SATICI&apos;ya e-posta veya web sitesi iade formu üzerinden bildirimde bulunulması ve ürünün <strong>kullanılmamış, yıkanmamış, etiketi koparılmamış ve orijinal ambalajı zarar görmemiş</strong> olması şarttır.
            </p>
            <p>
              İade kargosu, anlaşmalı kargo kodumuz ile gönderildiğinde kargo bedeli SATICI&apos;ya aittir. İade ürün SATICI&apos;ya ulaştıktan sonra 3 iş günü içinde incelenir ve bedel iadesi ALICI&apos;nın ödeme yaptığı kart veya banka hesabına eksiksiz aktarılır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">MADDE 5.</span> BEDEN DEĞİŞİMİ PROSEDÜRÜ
            </h2>
            <p>
              Streetwear oversize ve boxy fit kalıplarımızda beden uyumsuzluğu yaşamanız durumunda, siparişinizi teslim aldıktan sonra 14 gün içinde dilediğiniz farklı bir bedenle <strong>ücretsiz kargo avantajıyla</strong> değiştirebilirsiniz. Stok durumuna göre değişim ürününüz aynı gün kargoya hazırlanır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">MADDE 6.</span> UYUŞMAZLIKLARIN ÇÖZÜMÜ
            </h2>
            <p>
              İşbu sözleşmenin uygulanmasında doğabilecek uyuşmazlıklarda, Ticaret Bakanlığı&apos;nca ilan edilen değere kadar ALICI&apos;nın yerleşim yerindeki <strong>İl veya İlçe Tüketici Hakem Heyetleri</strong>, bu değeri aşan durumlarda ise <strong>İstanbul Tüketici Mahkemeleri</strong> yetkilidir.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="flex gap-4">
            <Link href="/privacy" className="text-red-400 hover:text-white transition-colors underline">
              ← Gizlilik & Çerez Politikası
            </Link>
            <Link href="/faq" className="text-red-400 hover:text-white transition-colors underline">
              Sıkça Sorulan Sorular →
            </Link>
          </div>
          <Link href="/" className="bg-white text-black font-bold px-5 py-2.5 rounded uppercase hover:bg-zinc-200 transition-colors">
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
