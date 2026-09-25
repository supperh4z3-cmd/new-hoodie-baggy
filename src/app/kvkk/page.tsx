import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "KVKK Aydınlatma Metni | BAGGY STREET",
  description: "Baggy Street Kişisel Verilerin Korunması Kanunu (KVKK) Kapsamında Aydınlatma ve Bilgilendirme Metni.",
};

export default function KvkkPage() {
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
          <span className="text-white">KVKK AYDINLATMA METNİ</span>
        </nav>

        {/* Header */}
        <div className="border-b border-zinc-850 pb-8 mb-10">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest font-black mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>YASAL BİLGİLENDİRME // 6698 SAYILI KANUN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight uppercase">
            KİŞİSEL VERİLERİN KORUNMASI
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Son Güncelleme: 25 Eylül 2026 • BAGGY STREET TEKSTİL VE SANAYİ A.Ş.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">01.</span> VERİ SORUMLUSU
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, <strong>BAGGY STREET TEKSTİL VE SANAYİ A.Ş.</strong> (“Baggy Street” veya “Şirket”) olarak, veri sorumlusu sıfatıyla kişisel verilerinizi işbu aydınlatma metninde belirtilen amaçlar ve mevzuat sınırları dâhilinde işlemekteyiz.
            </p>
            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl font-mono text-xs space-y-1 text-zinc-400">
              <div><strong>Firma Ünvanı:</strong> BAGGY STREET TEKSTİL A.Ş.</div>
              <div><strong>Adres:</strong> Caferağa Mah. Moda Cad. No: 42/3, Kadıköy / İstanbul</div>
              <div><strong>E-Posta:</strong> kvkk@baggystreet.com</div>
              <div><strong>Mersis No:</strong> 012345678900001</div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">02.</span> İŞLENEN KİŞİSEL VERİLER
            </h2>
            <p>
              Web sitemizi ziyaretiniz, üyelik oluşturmanız, bültene kaydolmanız ve sipariş vermeniz sırasında aşağıdaki kategorilerde kişisel verileriniz işlenmektedir:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-400">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad.</li>
              <li><strong>İletişim Bilgileri:</strong> Teslimat ve fatura adresi, e-posta adresi, cep telefonu numarası.</li>
              <li><strong>Müşteri İşlem Bilgileri:</strong> Sipariş geçmişi, sepet bilgileri, kupon kullanım verileri, kargo takip kodları.</li>
              <li><strong>Ödeme ve Finansal Bilgiler:</strong> Ödeme yöntemi türü (Kredi kartı numarası sistemlerimizde tutulmaz; doğrudan BDDK lisanslı 256-Bit SSL korumalı ödeme sağlayıcısı üzerinden şifrelenir).</li>
              <li><strong>İşlem Güvenliği Verileri:</strong> IP adresi, oturum çerezleri (cookies), erişim log kayıtları.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">03.</span> KİŞİSEL VERİLERİN İŞLENME AMAÇLARI
            </h2>
            <p>
              Toplanan kişisel verileriniz aşağıdaki amaçlarla mevzuata uygun olarak işlenmektedir:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-400">
              <li>Siparişlerinizin alınması, paketlenmesi, faturalandırılması ve Yurtiçi Kargo aracılığıyla adresinize teslimi,</li>
              <li>Sipariş ve kargo durumunuzun SMS / WhatsApp / E-Posta kanalıyla tarafınıza bildirilmesi,</li>
              <li>14 günlük yasal cayma ve beden değişimi süreçlerinin yürütülmesi,</li>
              <li>Mevzuattan doğan yasal yükümlülüklerin (Türk Ticaret Kanunu, Tüketicinin Korunması Hakkında Kanun vb.) yerine getirilmesi,</li>
              <li>Onay vermiş olmanız halinde yeni drop, koleksiyon ve kampanyalardan haberdar edilmeniz.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">04.</span> VERİLERİN AKTARILDIĞI TARAFLAR
            </h2>
            <p>
              Kişisel verileriniz, yalnızca yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda iş ortaklarımızla paylaşılır:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-400">
              <li>Siparişlerin teslimi için kargo ve lojistik firmaları (Yurtiçi Kargo A.Ş.),</li>
              <li>Elektronik ödeme işlemleri için lisanslı ödeme kuruluşları ve bankalar,</li>
              <li>Yasal bildirim zorunlulukları kapsamında yetkili kamu kurum ve kuruluşları.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">05.</span> VERİ SAHİBİNİN HAKLARI (KVKK MADDE 11)
            </h2>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca dilediğiniz zaman Şirketimize başvurarak kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahipsiniz. Taleplerinizi <strong>kvkk@baggystreet.com</strong> adresine iletebilirsiniz.
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-zinc-850 flex justify-between items-center text-xs font-mono">
          <Link href="/privacy" className="text-red-400 hover:text-white transition-colors underline">
            → Gizlilik & Çerez Politikasını İncele
          </Link>
          <Link href="/" className="bg-white text-black font-bold px-5 py-2.5 rounded uppercase hover:bg-zinc-200 transition-colors">
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
