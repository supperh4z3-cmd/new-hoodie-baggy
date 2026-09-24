import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Compass } from "lucide-react";

export const metadata = {
  title: "OUR STORY | BAGGY STREET — Amsterdam & Istanbul Streetwear",
  description: "Baggy Street hikayesi: Amsterdam özgür ruhundan ilham alan, İstanbul sokaklarında hayat bulan bağımsız drill ve oversize sokak modası.",
};

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-400">
            <Compass className="w-3.5 h-3.5 text-red-500" />
            <span>41.0082° N, 28.9784° E • ISTANBUL / TURKEY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest uppercase leading-none">
            FROM ISTANBUL <br />
            <span className="text-stroke-white text-transparent">TO THE WORLD</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-mono max-w-2xl mx-auto leading-relaxed">
            Amsterdam&apos;ın karanlık kanallarında doğan drill estetiği ile İstanbul&apos;un bitmeyen sokak ritminin birleştiği nokta: Baggy Street.
          </p>
        </div>
      </section>

      {/* Editorial Split Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-lg overflow-hidden border border-zinc-850 shadow-2xl">
            <Image
              src="/images/brand/brand-story.webp"
              alt="Baggy Street Editorial Story"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
              MANIFESTO
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-widest uppercase">
              TAVİZSİZ KALIPLAR, AĞIR GRAMAJLAR
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Biz sıradan bir e-ticaret markası değiliz. Baggy Street, hızlı modanın tekdüze kalıplarına ve dar kesimlerine karşı bir tavırdır. Bizim için bir hoodie sadece bir giysi değil; sokağın dilini ve underground kültürün duruşunu taşıyan bir zırhtır.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Ürünlerimizin tamamı İstanbul&apos;da, en kaliteli %100 ağır pamuklu Fransız havlu kumaşlar (460+ GSM) ve 14.5 oz sertifikalı Türk denimi kullanılarak sınırlı drop&apos;lar halinde üretilir.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Pillars Grid */}
      <section className="bg-zinc-950 py-16 sm:py-20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              DEĞERLERİMİZ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase mt-2">
              BAGGY STREET STANDARTLARI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-zinc-850 p-8 rounded-lg space-y-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-red-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                AĞIR VE TOK KUMAŞ
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                460 GSM&apos;ye kadar çıkan saf pamuk örgüler. Asla formunu kaybetmeyen çift katmanlı kapüşonlar ve tok manşetler.
              </p>
            </div>

            <div className="bg-black border border-zinc-850 p-8 rounded-lg space-y-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                GERÇEK BOXY & BAGGY
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Düşük omuzlar, geniş göğüs ve paçalar. 90&apos;lar hip-hop ve günümüz drill estetiğinin harmanlandığı kusursuz döküm.
              </p>
            </div>

            <div className="bg-black border border-zinc-850 p-8 rounded-lg space-y-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                SINIRLI DROP (LIMITED)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seri üretim değil, sınırlı sayıda özel drop&apos;lar. Her parçanın arkasında özgün graffiti ve drill detayları.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              LOOKBOOK VOL. 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest uppercase">
              SOKAK ÇEKİMLERİ
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
          >
            <span>TÜM ÜRÜNLER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-[360px] sm:h-[450px] rounded-lg overflow-hidden border border-zinc-850">
            <Image
              src="/images/brand/drill-editorial-1.webp"
              alt="Underground Tunnel Lookbook"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-[360px] sm:h-[450px] rounded-lg overflow-hidden border border-zinc-850">
            <Image
              src="/images/brand/drill-editorial-2.webp"
              alt="City Night Streetwear Lookbook"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-16">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded text-xs font-mono font-bold tracking-widest uppercase transition-colors shadow-2xl"
          >
            <span>KOLEKSİYONU ŞİMDİ KEŞFET</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
