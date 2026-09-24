"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Shield, Layers, Flame, Award, MoveUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#070709] text-white overflow-hidden select-none">
      {/* 1. Asymmetrical Brutalist Hero */}
      <section className="relative min-h-[75vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-20 border-b border-zinc-850">
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-950/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Top Asymmetric Ticker / Coordinates */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-zinc-850/80">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                ISTANBUL & AMSTERDAM ARCHIVE / VOL. 2026
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-zinc-300">
                41.0082° N, 28.9784° E
              </span>
              <span>NO SEASONS. ONLY DROPS.</span>
            </div>
          </div>

          {/* Huge Asymmetric Staggered Headlines */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-4 sm:gap-8 flex-wrap">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-white font-mono leading-none">
                BEYOND
              </h1>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-red-500 border border-red-500/40 px-3 py-1 rounded-full uppercase bg-red-950/30 -rotate-2">
                EST. 2024 / REVOLUTION
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
              <div className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase font-mono leading-none text-zinc-600 hover:text-white transition-colors duration-500">
                THE SYSTEM
              </div>
              <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed sm:text-right">
                Hızlı modanın tekdüze dar kalıplarına ve dayatılan trendlerine bir tepki olarak doğduk. Bizim için bir hoodie, sokağın zırhıdır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Marquee Ticker */}
      <div className="bg-red-600 text-black py-3 overflow-hidden whitespace-nowrap font-mono font-black text-xs sm:text-sm tracking-widest uppercase flex select-none">
        <div className="animate-marquee flex gap-8 items-center">
          <span>★ 460 GSM HEAVYWEIGHT FRENCH TERRY</span>
          <span>★ RAW JAPANESE SELVEDGE DENIM</span>
          <span>★ OVERSIZED BOXY SILHOUETTES</span>
          <span>★ FROM ISTANBUL TO THE WORLD</span>
          <span>★ ZERO COMPROMISE ON QUALITY</span>
          <span>★ 460 GSM HEAVYWEIGHT FRENCH TERRY</span>
          <span>★ RAW JAPANESE SELVEDGE DENIM</span>
          <span>★ OVERSIZED BOXY SILHOUETTES</span>
          <span>★ FROM ISTANBUL TO THE WORLD</span>
          <span>★ ZERO COMPROMISE ON QUALITY</span>
        </div>
      </div>

      {/* 3. Asymmetric Split Manifesto (Overlapping Cards & Offsets) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          {/* Left Visual with Brutalist Offset Border */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl z-10 group">
              <Image
                src="/images/brand/brand-story.webp"
                alt="Baggy Street Manifesto Editorial"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase block mb-1">
                    EDITORIAL LOOKBOOK 01
                  </span>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">
                    ISTANBUL UNDERGROUND
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                  KADIKÖY / MODA
                </span>
              </div>
            </div>

            {/* Asymmetric Floating Accent Box (Underneath) */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-full h-full rounded-2xl border-2 border-red-500/20 -z-0 pointer-events-none" />
          </div>

          {/* Right Text Column with Overlapping Tag */}
          <div className="lg:col-span-5 space-y-6 lg:-ml-8 z-20">
            <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-7 sm:p-9 backdrop-blur-xl shadow-2xl space-y-5">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
                <Flame className="w-4 h-4" />
                <span>MANİFESTOMUZ</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white leading-tight">
                TAVİZSİZ KALIPLAR, AĞIR TOK DOKULAR.
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Baggy Street, Amsterdam&apos;ın yağmurlu gri sokaklarında doğan drill enerjisinin İstanbul&apos;un bitmeyen underground temposuyla harmanlandığı bağımsız bir tasarım atölyesidir.
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Kullandığımız her pamuk ipliği (460+ GSM), her sert taş yıkanmış denim kumaş (14 oz) ve her metal aksesuar, standart sokak giyiminin ötesinde bir dayanıklılık sunmak üzere özel olarak sipariş edilir.
              </p>

              <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">TASARIM & ÜRETİM:</span>
                <span className="text-white font-bold">100% İSTANBUL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Asymmetrical Bento Grid (3 Standards) */}
      <section className="bg-zinc-950/60 py-20 sm:py-28 border-y border-zinc-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-widest text-red-500 uppercase font-bold">
                MİMARİ PRENSİPLER
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white mt-2">
                BAGGY STREET STANDARTLARI
              </h2>
            </div>
            <p className="max-w-sm text-xs font-mono text-zinc-400">
              Her dikiş, her kesim ve her fermuar milimetrik mühendislik ile sokak için tasarlandı.
            </p>
          </div>

          {/* Asymmetric Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1: Extra Large Featured Card (8 cols) */}
            <div className="md:col-span-8 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-zinc-650 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black text-red-500 bg-black/60 px-3 py-1 rounded-full border border-red-950">
                  01 / FABRIC
                </span>
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                  460 GSM SAF FRENCH TERRY
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                  Piyasadaki standart ince kapüşonluların aksine, iki katmanlı sert duran kapüşon ve rüzgar geçirmeyen yoğun ilmek dokusu. Yıkandıkça formunu kaybetmez, esnemez, dik durur.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-850 text-xs font-mono">
                <span className="bg-zinc-800/80 px-3 py-1 rounded text-zinc-300">Önceden Çektirilmiş Pamuk</span>
                <span className="bg-zinc-800/80 px-3 py-1 rounded text-zinc-300">Ağır Manşetler</span>
                <span className="bg-zinc-800/80 px-3 py-1 rounded text-zinc-300">Kabartma Nakış Uyumlu</span>
              </div>
            </div>

            {/* Card 2: Tall Stat Card (4 cols) */}
            <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500">
                  02 / FIT
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black tracking-tight text-white uppercase mb-2">
                  GERÇEK BOXY & DROP-SHOULDER
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  90&apos;lar New York ve günümüz Londra/Amsterdam drill kesimlerinin mükemmel harmonisi. Omuzlar düşük, gövde bol, boy ideal.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-xs font-mono text-zinc-300 text-center">
                Sokakta Rahat Döküm Garantisi
              </div>
            </div>

            {/* Card 3: Wide Card (4 cols) */}
            <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500">
                  03 / DENIM
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black tracking-tight text-white uppercase mb-2">
                  14.5 OZ SERT TAŞ YIKAMA
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Gerçek vintage denim kumaşlar. Esneme payı olmayan saf dokuma ile ayakkabının üzerine dökülen geniş paça pantolonlar.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-xs font-mono text-emerald-400 text-center">
                Özel Eskitme & Distressed Efektler
              </div>
            </div>

            {/* Card 4: Community & Culture (8 cols) */}
            <div className="md:col-span-8 bg-gradient-to-br from-zinc-950 to-zinc-900/80 border border-zinc-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500">
                  04 / CULTURE
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-white uppercase">
                  LIMITED DROP MODELİ
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Binlerce adet seri üretim değil, sınırlı sayıda özel drop koleksiyonları. Her parçanın arkasında özgün seri numarası ve drill kültürü imzası bulunur.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-850">
                <span className="text-xs font-mono text-zinc-500">Tekrar üretilmeyen özel parçalar</span>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-red-400 transition-colors uppercase"
                >
                  <span>GÜNCEL DROPLAR</span>
                  <MoveUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Asymmetric Editorial Lookbook Filmstrip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-zinc-850">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
              LOOKBOOK ARCHIVE VOL. 01
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-white mt-1">
              SOKAK ÇEKİMLERİ & EDİTORYAL
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            <span>KOLEKSİYONU GÖR</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetrical Staggered Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* Card 1: Elevated */}
          <div className="relative h-[440px] rounded-2xl overflow-hidden border border-zinc-800 group shadow-2xl">
            <Image
              src="/images/brand/drill-editorial-1.webp"
              alt="Underground Lookbook 1"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-mono text-red-500 uppercase font-bold">FRAME 01</span>
              <h4 className="text-base font-black text-white uppercase">TUNNEL SQUAD DRILL</h4>
            </div>
          </div>

          {/* Card 2: Lower Offset */}
          <div className="relative h-[520px] rounded-2xl overflow-hidden border border-zinc-800 group shadow-2xl sm:mt-8">
            <Image
              src="/images/brand/drill-editorial-2.webp"
              alt="Underground Lookbook 2"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-mono text-red-500 uppercase font-bold">FRAME 02</span>
              <h4 className="text-base font-black text-white uppercase">NIGHT STREET HOODIE</h4>
            </div>
          </div>

          {/* Card 3: Higher Again */}
          <div className="relative h-[440px] rounded-2xl overflow-hidden border border-zinc-800 group shadow-2xl sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/categories/hoodies-cat.webp"
              alt="Underground Lookbook 3"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-mono text-red-500 uppercase font-bold">FRAME 03</span>
              <h4 className="text-base font-black text-white uppercase">BOX-CUT ARCHITECTURE</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Big Action CTA */}
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-850 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-mono tracking-widest text-red-500 uppercase font-bold">
            SEN DE ARAMIZA KATIL
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white font-mono leading-none">
            SAME CITY. <br />
            DIFFERENT MINDSET.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-lg mx-auto">
            Yeni drop çıktığında bildirim al, sınırlı üretim stokları tükenmeden ilk sen sahip ol.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs px-10 py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl shadow-red-950/60"
            >
              <span>KOLEKSİYONU KEŞFET</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
