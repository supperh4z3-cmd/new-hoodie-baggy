"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Shield,
  Layers,
  Flame,
  Award,
  MoveUpRight,
  Volume2,
  VolumeX,
  Camera,
  Film,
} from "lucide-react";

export default function AboutPage() {
  // Video / Image switch for the manifesto media viewer
  const [activeMediaTab, setActiveMediaTab] = useState<"video" | "image">("video");
  const [isPlayingAudioSim, setIsPlayingAudioSim] = useState(true);

  // Kumaş Gramajı İnteraktif Karşılaştırma Durumu
  const [selectedGsm, setSelectedGsm] = useState<460 | 280>(460);

  return (
    <div className="bg-[#050508] text-white overflow-hidden select-none min-h-screen">
      {/* 1. ÜST ASİMETRİK BAŞLIK VE AMBİYANS IŞIĞI */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-20 border-b border-zinc-850">
        {/* Neon Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-red-950/25 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-zinc-800/20 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Top Asymmetric Ticker & Audio Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-5 border-b border-zinc-800/80">
            {/* Status Live Dot */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
              </span>
              <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase font-bold">
                İSTANBUL & AMSTERDAM ARCHIVE // VOL. 2026
              </span>
            </div>

            {/* Audio Vibe Equalizer Widget */}
            <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-mono">
              <button
                type="button"
                onClick={() => setIsPlayingAudioSim(!isPlayingAudioSim)}
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                title="Ses Efekti Simülatörü"
              >
                {isPlayingAudioSim ? (
                  <Volume2 className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                )}
                <span className="text-[10px] tracking-wider text-zinc-400">
                  {isPlayingAudioSim ? "140 BPM DRILL FREQ" : "SES SESSİZDE"}
                </span>
              </button>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-3.5 w-8">
                <span
                  className={`w-1 bg-red-500 rounded-t transition-all duration-300 ${
                    isPlayingAudioSim ? "h-3 animate-pulse" : "h-1"
                  }`}
                />
                <span
                  className={`w-1 bg-red-500 rounded-t transition-all duration-500 ${
                    isPlayingAudioSim ? "h-2 animate-bounce" : "h-1"
                  }`}
                />
                <span
                  className={`w-1 bg-red-500 rounded-t transition-all duration-200 ${
                    isPlayingAudioSim ? "h-3.5 animate-pulse" : "h-1"
                  }`}
                />
                <span
                  className={`w-1 bg-red-500 rounded-t transition-all duration-700 ${
                    isPlayingAudioSim ? "h-1.5 animate-bounce" : "h-1"
                  }`}
                />
              </div>
            </div>

            {/* Coordinate Pill */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="bg-zinc-900/80 px-3 py-1 rounded border border-zinc-800 text-white font-bold">
                41.0082° N, 28.9784° E
              </span>
              <span>KADIKÖY ATÖLYE</span>
            </div>
          </div>

          {/* Dev Asimetrik Başlıklar & Staggered Typography */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-4 sm:gap-8 flex-wrap">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-white font-mono leading-none">
                OUR STORY
              </h1>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-red-500 border border-red-500/40 px-4 py-1.5 rounded-full uppercase bg-red-950/30 -rotate-3 shadow-lg">
                ★ HAKKIMIZDA & MANİFESTO
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
              <div className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase font-mono leading-none text-zinc-650 hover:text-white transition-colors duration-500">
                NO RULES. ONLY STREETS.
              </div>

              <div className="max-w-md bg-zinc-950/80 border border-zinc-850 p-5 rounded-xl space-y-2 backdrop-blur-md">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block font-bold">
                  Sıradanlığa Karşı Bir İsyan
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                  Hızlı modanın tekdüze dar kalıplarına ve dayatılan geçici trendlerine bir tepki olarak doğduk. Bizim için bir hoodie sadece bir giysi değil, sokağın zırhıdır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KIRMIZI HAREKETLİ TİCKER MARQUEE */}
      <div className="bg-red-600 text-black py-3 overflow-hidden whitespace-nowrap font-mono font-black text-xs sm:text-sm tracking-widest uppercase flex select-none shadow-2xl">
        <div className="animate-marquee flex gap-8 items-center">
          <span>★ 460 GSM SAF FRANSIZ HAVLU PAMUK</span>
          <span>★ 14.5 OZ JAPON SELVEDGE HAM DENİM</span>
          <span>★ DÜŞÜK OMUZLU TOK BOXY KALIPLAR</span>
          <span>★ İSTANBUL SOKAKLARINDAN DÜNYAYA</span>
          <span>★ SIFIR TAVİZ, SINIRSIZ SOKAK ENERJİSİ</span>
          <span>★ 460 GSM SAF FRANSIZ HAVLU PAMUK</span>
          <span>★ 14.5 OZ JAPON SELVEDGE HAM DENİM</span>
          <span>★ DÜŞÜK OMUZLU TOK BOXY KALIPLAR</span>
          <span>★ İSTANBUL SOKAKLARINDAN DÜNYAYA</span>
          <span>★ SIFIR TAVİZ, SINIRSIZ SOKAK ENERJİSİ</span>
        </div>
      </div>

      {/* 3. ASİMETRİK İNTERAKTİF MEDYA & MANİFESTO BÖLÜMÜ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          {/* Sol Kolon: İnteraktif Video / Fotoğraf Ekranı (7 Kolon) */}
          <div className="lg:col-span-7 relative">
            {/* Medya Değiştirici Butonlar */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveMediaTab("video")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  activeMediaTab === "video"
                    ? "bg-red-600 text-white shadow-lg shadow-red-950/80"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>CANLI SOKAK KAMERASI [VİDEO]</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab("image")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  activeMediaTab === "image"
                    ? "bg-white text-black shadow-lg"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>EDİTORYAL FOTOĞRAF</span>
              </button>
            </div>

            {/* Medya Çerçevesi (Asimetrik Gölge ve Kenarlıklar) */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl z-10 group">
              {activeMediaTab === "video" ? (
                <div className="relative w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  >
                    <source src="/videos/hero-night-city.webm" type="video/webm" />
                  </video>

                  {/* Kamera HUD Arayüzü Efekti */}
                  <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between z-20">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-red-500">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        <span className="font-bold">REC 00:28:14</span>
                      </div>
                      <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-zinc-400">
                        4K 60FPS // ISO 3200
                      </span>
                    </div>

                    {/* Merkez Hedef Noktası */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                    </div>

                    <div className="flex items-end justify-between text-[11px] font-mono">
                      <div className="bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/10 space-y-0.5">
                        <div className="text-white font-bold uppercase">KADIKÖY RIHTIM // TUNNEL</div>
                        <div className="text-zinc-400">DRILL NIGHT RUNNER EDITORIAL</div>
                      </div>
                      <span className="bg-red-600 text-black px-2.5 py-1 rounded font-black uppercase text-[10px]">
                        CANLI KAYIT
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
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
                        EDİTORYAL LOOKBOOK 01
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
              )}
            </div>

            {/* Asimetrik Arka Plan Vurgu Kutusu */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-full h-full rounded-2xl border-2 border-red-500/20 -z-0 pointer-events-none" />
          </div>

          {/* Sağ Kolon: Manifestomuz (5 Kolon) */}
          <div className="lg:col-span-5 space-y-6 lg:-ml-8 z-20">
            <div className="bg-zinc-950/95 border border-zinc-800 rounded-2xl p-7 sm:p-9 backdrop-blur-xl shadow-2xl space-y-5">
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
                <Flame className="w-4 h-4" />
                <span>SOKAK MANİFESTOMUZ</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white leading-tight">
                TAVİZSİZ KALIPLAR, AĞIR TOK DOKULAR.
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                Baggy Street; Amsterdam&apos;ın yağmurlu gri sokaklarında doğan drill enerjisinin, İstanbul&apos;un bitmeyen underground temposu ve zengin tekstil mirasıyla harmanlandığı bağımsız bir tasarım kolektifidir.
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Kullandığımız her pamuk ipliği (460+ GSM), her sert taş yıkanmış ham denim kumaş (14.5 oz) ve her metal fermuar aksesuarı, standart sokak giyiminin ötesinde bir ağırlık ve dik duruş sunmak üzere özel olarak sipariş edilir.
              </p>

              <div className="pt-4 border-t border-zinc-850 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">TASARIM & ÜRETİM:</span>
                <span className="text-white font-bold bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                  100% İSTANBUL ATÖLYE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. İNTERAKTİF KUMAŞ VE GRAMAJ KARŞILAŞTIRMASI */}
      <section className="bg-zinc-950/90 py-20 border-y border-zinc-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              KUMAŞ MİMARİSİ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              NEDEN 460 GSM SAF FRANSIZ HAVLU?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Standart hızlı moda kapüşonluları ile Baggy Street ağır gramaj kumaş farkını yakından inceleyin.
            </p>

            {/* Toggle Butonları */}
            <div className="inline-flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 mt-4">
              <button
                type="button"
                onClick={() => setSelectedGsm(460)}
                className={`px-5 py-2 rounded-lg text-xs font-mono font-black uppercase transition-all ${
                  selectedGsm === 460
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ★ BAGGY STREET (460 GSM)
              </button>
              <button
                type="button"
                onClick={() => setSelectedGsm(280)}
                className={`px-5 py-2 rounded-lg text-xs font-mono font-black uppercase transition-all ${
                  selectedGsm === 280
                    ? "bg-zinc-800 text-zinc-300 shadow-lg"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                STANDART HIZLI MODA (280 GSM)
              </button>
            </div>
          </div>

          {/* Karşılaştırma Göstergeleri */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>TOK DURUŞ & KALIP FORMU</span>
                <span className="font-bold text-white">
                  {selectedGsm === 460 ? "100% KUSURSUZ" : "35% SARKAN"}
                </span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    selectedGsm === 460 ? "w-full bg-red-600" : "w-1/3 bg-zinc-600"
                  }`}
                />
              </div>
              <p className="text-xs text-zinc-400">
                {selectedGsm === 460
                  ? "Çift katmanlı dik duran kapüşon başı sarar, omuzlar düşmez ve yıkandıktan sonra bile şeklini korur."
                  : "İnce kumaş omuzlardan sarkar, kapüşon arkaya yığılır ve birkaç yıkamada formunu kaybeder."}
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>RÜZGAR DİRENCİ & ISI YALITIMI</span>
                <span className="font-bold text-white">
                  {selectedGsm === 460 ? "98% TAVİZSİZ" : "45% GEÇİRGEN"}
                </span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    selectedGsm === 460 ? "w-[98%] bg-red-600" : "w-[45%] bg-zinc-600"
                  }`}
                />
              </div>
              <p className="text-xs text-zinc-400">
                {selectedGsm === 460
                  ? "Ağır ilmekli Fransız havlu örgüsü, gece soğuklarında ve rüzgarda üstün bir termal koruma sağlar."
                  : "Sentetik karışımlı ince polar doku çabuk terletir fakat sokak rüzgarına karşı koruma sağlamaz."}
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>KULLANIM ÖMRÜ VE DAYANIKLILIK</span>
                <span className="font-bold text-white">
                  {selectedGsm === 460 ? "10+ YIL SOKAKTA" : "1 SEZONLUK"}
                </span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    selectedGsm === 460 ? "w-full bg-red-600" : "w-[25%] bg-zinc-600"
                  }`}
                />
              </div>
              <p className="text-xs text-zinc-400">
                {selectedGsm === 460
                  ? "Önceden çektirilmiş saf pamuk; tüylenme yapmaz, dikişler çift iğneyle kilitlenmiştir."
                  : "Düşük gramajlı polyester kumaş çabuk tüylenir, baskılar sarkar ve çatlamaya başlar."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ASİMETRİK BENTO GRİD (STANDARTLARIMIZ) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest text-red-500 uppercase font-bold">
              MİMARİ PRENSİPLER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white mt-2 font-mono">
              BAGGY STREET STANDARTLARI
            </h2>
          </div>
          <p className="max-w-sm text-xs font-mono text-zinc-400">
            Her dikiş, her kesim ve her fermuar milimetrik mühendislik ile sokak için tasarlandı.
          </p>
        </div>

        {/* Asymmetric Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 460 GSM Heavyweight (8 cols) */}
          <div className="md:col-span-8 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-black text-red-500 bg-black/60 px-3 py-1 rounded-full border border-red-950">
                01 // KUMAŞ MİMARİSİ
              </span>
            </div>

            <div className="space-y-3 relative z-10">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-mono">
                460 GSM SAF FRENCH TERRY HAVLU
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl font-sans">
                Piyasadaki standart ince kapüşonluların aksine; iki katmanlı dik duran kapüşon ve rüzgar geçirmeyen yoğun ilmek dokusu. Yıkandıkça formunu kaybetmez, esnemez, dik durur.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-850 text-xs font-mono">
              <span className="bg-zinc-800/80 px-3 py-1 rounded text-zinc-300">Önceden Çektirilmiş Pamuk</span>
              <span className="bg-zinc-800/80 px-3 py-1 rounded text-zinc-300">Ağır Manşetler</span>
              <span className="bg-zinc-800/80 px-3 py-1 rounded text-zinc-300">Kabartma Nakış Uyumlu</span>
            </div>
          </div>

          {/* Card 2: Boxy Fit (4 cols) */}
          <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-500">
                02 // KALIP
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black tracking-tight text-white uppercase mb-2 font-mono">
                GERÇEK BOXY & DROP-SHOULDER
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                90&apos;lar New York ve günümüz Londra/Amsterdam drill kesimlerinin kusursuz sentezi. Omuzlar düşük, gövde bol, boy ideal.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-xs font-mono text-zinc-300 text-center">
              Sokakta Rahat Döküm Garantisi
            </div>
          </div>

          {/* Card 3: 14.5 OZ Denim (4 cols) */}
          <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-500">
                03 // DENİM
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black tracking-tight text-white uppercase mb-2 font-mono">
                14.5 OZ SERT TAŞ YIKAMA
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Gerçek vintage denim kumaşlar. Esneme payı olmayan saf dokuma ile ayakkabının üzerine dökülen geniş paça pantolonlar.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-xs font-mono text-emerald-400 text-center">
              Özel Eskitme & Distressed Efektler
            </div>
          </div>

          {/* Card 4: Sınırlı Drop Modeli (8 cols) */}
          <div className="md:col-span-8 bg-gradient-to-br from-zinc-950 to-zinc-900/80 border border-zinc-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-500">
                04 // KÜLTÜR
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight text-white uppercase font-mono">
                LIMITED DROP & NUMARALI PARÇALAR
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Binlerce adet sıradan seri üretim değil, sınırlı sayıda özel drop koleksiyonları. Her parçanın arkasında özgün seri numarası ve drill kültürü imzası bulunur.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-850">
              <span className="text-xs font-mono text-zinc-500">Tekrar üretilmeyen özel arşiv</span>
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
      </section>

      {/* 6. ZAMAN ÇİZELGESİ & SOKAK KRONOLOJİSİ (ASİMETRİK ZİGZAG) */}
      <section className="bg-zinc-950 py-20 sm:py-28 border-t border-zinc-850">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest font-bold">
              KÖKLERİMİZ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-mono">
              AMSTERDAM&apos;DAN İSTANBUL SOKAKLARINA
            </h2>
          </div>

          <div className="space-y-10 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-zinc-800">
            {/* 2024 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="sm:w-1/2 sm:text-right sm:pr-8 pl-10 sm:pl-0 space-y-1">
                <span className="text-xs font-mono text-red-400 font-bold">2024 // İLK KIVILCIM</span>
                <h4 className="text-xl font-black text-white uppercase font-mono">
                  AMSTERDAM CANAL NIGHTS
                </h4>
                <p className="text-xs text-zinc-400">
                  Underground drill müziğinin sert basları eşliğinde ilk ağır kumaş hoodie taslağı çizildi. 100 parçalık ilk gizli drop saatler içinde tükendi.
                </p>
              </div>
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-4 border-black z-10" />
              <div className="sm:w-1/2 sm:pl-8 pl-10 sm:pl-0 text-xs font-mono text-zinc-500">
                52.3676° N, 4.9041° E
              </div>
            </div>

            {/* 2025 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="sm:w-1/2 sm:text-right sm:pr-8 pl-10 sm:pl-0 text-xs font-mono text-zinc-500 order-2 sm:order-1">
                41.0082° N, 28.9784° E
              </div>
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-black z-10" />
              <div className="sm:w-1/2 sm:pl-8 pl-10 sm:pl-0 space-y-1 order-1 sm:order-2">
                <span className="text-xs font-mono text-zinc-400 font-bold">2025 // İSTANBUL ATÖLYESİ</span>
                <h4 className="text-xl font-black text-white uppercase font-mono">
                  KADIKÖY MERKEZLİ ÜRETİM
                </h4>
                <p className="text-xs text-zinc-400">
                  İstanbul&apos;un tarihi kumaş ustalarıyla anlaşılarak 460 GSM özel iplik dokuma tezgahları devreye alındı. İlk 14.5 oz geniş paça denim pantolonlar satışa sunuldu.
                </p>
              </div>
            </div>

            {/* 2026 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="sm:w-1/2 sm:text-right sm:pr-8 pl-10 sm:pl-0 space-y-1">
                <span className="text-xs font-mono text-red-500 font-bold">2026 // BUGÜN</span>
                <h4 className="text-xl font-black text-white uppercase font-mono">
                  GLOBAL DRILL CULTURE
                </h4>
                <p className="text-xs text-zinc-400">
                  Avrupa ve Türkiye genelinde binlerce sokak kültürü takipçisine ulaşan bağımsız bir marka. Sektör normlarına meydan okuyan yeni drop sistemi.
                </p>
              </div>
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-4 border-black z-10 animate-ping" />
              <div className="sm:w-1/2 sm:pl-8 pl-10 sm:pl-0 text-xs font-mono text-zinc-500">
                NO SEASONS. ONLY DROPS.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ASİMETRİK EDİTORYAL LOOKBOOK ÇAĞRISI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest font-bold flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>35MM SOKAK ÇEKİMLERİMİZ</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white font-mono leading-tight">
              EDİTORYAL LOOKBOOK SAYFAMIZI GÖRDÜNÜZ MÜ?
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
              Kadıköy sokaklarından Galata köprüsüne, Amsterdam rıhtımlarından gece tünellerine uzanan analog ve dijital editoryal lookbook fotoğraflarını inceleyin.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/editorial"
                className="inline-flex items-center gap-3 bg-white hover:bg-zinc-200 text-black font-mono font-black text-xs px-8 py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl"
              >
                <span>EDİTORYAL LOOKBOOK&apos;U AÇ</span>
                <MoveUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs px-8 py-4 rounded-xl uppercase tracking-widest border border-zinc-800 transition-colors"
              >
                <span>ÜRÜNLERİ SATIN AL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
