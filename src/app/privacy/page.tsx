import React from "react";
import Link from "next/link";
import { Lock, Shield, Eye, ArrowLeft, Cookie } from "lucide-react";

export const metadata = {
  title: "Gizlilik ve Çerez Politikası | BAGGY STREET",
  description: "Baggy Street Gizlilik ve Çerez Politikası. 256-Bit SSL güvenliği, çerez kullanımı ve kullanıcı verilerinin korunması esasları.",
};

export default function PrivacyPage() {
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
          <span className="text-white">GİZLİLİK VE ÇEREZ POLİTİKASI</span>
        </nav>

        {/* Header */}
        <div className="border-b border-zinc-850 pb-8 mb-10">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest font-black mb-2">
            <Lock className="w-4 h-4" />
            <span>GÜVENLİK & GİZLİLİK PROTOKOLÜ // 256-BIT SSL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight uppercase">
            GİZLİLİK VE ÇEREZ POLİTİKASI
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Son Güncelleme: 25 Eylül 2026 • BAGGY STREET TEKSTİL VE SANAYİ A.Ş.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
              <Shield className="w-4 h-4" />
              <span>256-Bit SSL</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ödeme ve kişisel verileriniz uçtan uca banka standartlarında şifrelenir. Kart verileriniz asla sunucularımızda saklanmaz.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
              <Cookie className="w-4 h-4" />
              <span>Şeffaf Çerezler</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yalnızca sepet hafızası, favori ürünler ve site deneyimini iyileştiren temel çerezler kullanılır.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
              <Eye className="w-4 h-4" />
              <span>Sıfır Spam</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              İletişim bilgileriniz 3. taraf reklam şirketleriyle asla satılmaz veya paylaşılmaz. Yalnızca drop duyuruları iletilir.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">01.</span> GENEL İLKELER
            </h2>
            <p>
              BAGGY STREET TEKSTİL A.Ş. (&quot;Baggy Street&quot;), müşterilerimizin ve ziyaretçilerimizin gizliliğine mutlak saygı duyar. Web sitemizi ziyaret ederken veya alışveriş yaparken paylaştığınız tüm kişisel veriler, en yüksek güvenlik standartlarıyla korunur ve yasal mevzuata tam uyumlu olarak işlenir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">02.</span> ÖDEME GÜVENLİĞİ
            </h2>
            <p>
              Web sitemiz üzerinden yapılan tüm kredi kartı ve banka kartı ödemeleri, 256-Bit SSL (Secure Sockets Layer) sertifikası ile şifreli olarak doğrudan BDDK lisanslı ödeme geçidi sağlayıcılarına iletilir. Baggy Street çalışanları veya sunucuları kart numaranızı, son kullanma tarihinizi veya CVV güvenlik kodunuzu kesinlikle göremez ve veritabanlarında saklamaz.
            </p>
            <p>
              Tüm işlemler 3D Secure (SMS doğrulama kodu) protokolü ile ek güvenlik katmanında gerçekleştirilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">03.</span> ÇEREZ (COOKIE) KULLANIMI
            </h2>
            <p>
              Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız tarafından bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Sitemizde aşağıdaki amaçlarla çerezler kullanılmaktadır:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-lg">
                <div className="font-mono text-xs text-white font-bold mb-1">Zorunlu ve Fonksiyonel Çerezler</div>
                <div className="text-xs text-zinc-400">
                  Sepetinize eklediğiniz ürünlerin hatırlanması, oturumun sürdürülmesi ve favorilerinizin (wishlist) saklanması için gereklidir. Bu çerezler olmadan e-ticaret işlevleri çalışamaz.
                </div>
              </div>

              <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-lg">
                <div className="font-mono text-xs text-white font-bold mb-1">Performans ve Analitik Çerezleri</div>
                <div className="text-xs text-zinc-400">
                  Ziyaretçilerimizin sitede nasıl gezindiğini, en çok görüntülenen koleksiyonları ve hata veren sayfaları anonim olarak analiz etmemizi sağlar. Kimliğinizi açığa çıkarmaz.
                </div>
              </div>

              <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-lg">
                <div className="font-mono text-xs text-white font-bold mb-1">Tercih Çerezleri</div>
                <div className="text-xs text-zinc-400">
                  Hoş geldin indirim kuponunun veya duyuru bandının kapatıldıktan sonra 24 saat boyunca tekrar açılmamasını sağlamak amacıyla yerel depolama (localStorage) ile birlikte kullanılır.
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">04.</span> ÇEREZLERİN YÖNETİMİ VE ENGELENMESİ
            </h2>
            <p>
              Tarayıcınızın ayarlar menüsünden (Google Chrome, Safari, Firefox, Microsoft Edge) dilediğiniz an çerezleri temizleyebilir, engelleyebilir veya bildirim alacak şekilde yapılandırabilirsiniz. Zorunlu çerezleri engellemeniz durumunda sepet fonksiyonları düzgün çalışmayabilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 font-mono">05.</span> İLETİŞİM
            </h2>
            <p>
              Gizlilik ve çerez politikamıza ilişkin tüm soru, öneri veya veri talepleriniz için bize ulaşabilirsiniz:
            </p>
            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl font-mono text-xs space-y-1 text-zinc-400">
              <div><strong>E-Posta:</strong> privacy@baggystreet.com</div>
              <div><strong>Adres:</strong> Caferağa Mah. Moda Cad. No: 42/3, Kadıköy / İstanbul</div>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="flex gap-4">
            <Link href="/kvkk" className="text-red-400 hover:text-white transition-colors underline">
              ← KVKK Aydınlatma Metni
            </Link>
            <Link href="/terms" className="text-red-400 hover:text-white transition-colors underline">
              Mesafeli Satış Sözleşmesi →
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
