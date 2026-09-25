"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  MapPin,
  Camera,
  MoveUpRight,
  X,
  Maximize2,
  ShoppingBag,
} from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store/useCartStore";

interface EditorialLook {
  id: string;
  frameNo: string;
  title: string;
  category: "all" | "hoodies" | "bottoms" | "night" | "video";
  subtitle: string;
  location: string;
  cameraInfo: string;
  modelSpecs: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  aspect: string;
  tilt: string;
  offset: string;
  tags: string[];
  featuredProductSlug: string;
  quote?: string;
}

const EDITORIAL_LOOKS: EditorialLook[] = [
  {
    id: "look-1",
    frameNo: "FRAME [01/07]",
    title: "UNDERGROUND TUNNEL DRILL",
    category: "hoodies",
    subtitle: "Ağır 460 GSM French Terry pamuklu ve çift katmanlı dik duran kapüşon silüeti.",
    location: "41.0082° N, 28.9784° E / İSTANBUL",
    cameraInfo: "Leica M6 // Kodak Tri-X 400 B&W // 35mm f/1.4",
    modelSpecs: "Boy: 1.88 m • Kilo: 78 kg • Beden: L / Oversize",
    mediaType: "image",
    mediaSrc: "/images/brand/drill-editorial-1.webp",
    aspect: "aspect-[3/4]",
    tilt: "-rotate-2",
    offset: "lg:translate-y-0",
    tags: ["460 GSM", "PITCH BLACK", "HEAVY HOODIE"],
    featuredProductSlug: "drill-logo-hoodie",
    quote: "Göz alıcı değil, tehditkar ve tavizsiz bir duruş.",
  },
  {
    id: "look-2",
    frameNo: "FRAME [02/07]",
    title: "AMSTERDAM CANAL NIGHT",
    category: "bottoms",
    subtitle: "Dökümlü geniş paça eşofman ve teknik fermuarlı ceket uyumu.",
    location: "52.3676° N, 4.9041° E / AMSTERDAM",
    cameraInfo: "Contax T2 // Fujifilm Superia 800 // 38mm f/2.8",
    modelSpecs: "Boy: 1.84 m • Kilo: 74 kg • Beden: M / Baggy Döküm",
    mediaType: "image",
    mediaSrc: "/images/brand/drill-editorial-2.webp",
    aspect: "aspect-[4/5]",
    tilt: "rotate-2",
    offset: "lg:translate-y-16",
    tags: ["WIDE LEG", "DWR COATING", "TACTICAL"],
    featuredProductSlug: "heavy-baggy-sweatpants",
    quote: "Sokakların geceye teslim olduğu saatler.",
  },
  {
    id: "look-3",
    frameNo: "FRAME [03/07] - CANLI REEL",
    title: "NIGHT RUNNER STREET REEL",
    category: "video",
    subtitle: "Karanlık sokak lambaları altında hareket halindeki oversize silüetler.",
    location: "KADIKÖY RIHTIM & BOĞAZ HATTI",
    cameraInfo: "Arri Alexa Mini LF // 28mm Cinema Prime // ISO 3200",
    modelSpecs: "Canlı Hareket Testi // 1080p 60FPS Video",
    mediaType: "video",
    mediaSrc: "/videos/hero-traffic-night.webm",
    aspect: "aspect-[4/5]",
    tilt: "-rotate-1",
    offset: "lg:-translate-y-6",
    tags: ["CANLI VİDEO", "GECE HAREKETİ", "DRILL REEL"],
    featuredProductSlug: "drill-logo-hoodie",
    quote: "Kıyafet dururken değil, sokakta adımlarken kendini gösterir.",
  },
  {
    id: "look-4",
    frameNo: "FRAME [04/07]",
    title: "RAW JAPANESE SELVEDGE DENIM",
    category: "bottoms",
    subtitle: "14.5 oz sert Japon ham kumaşı üzerine vintage taş yıkama ve özel eskitme.",
    location: "KADIKÖY SOKAKLARI / MODA",
    cameraInfo: "Hasselblad 503CW // Ilford HP5 400 // 80mm Planar",
    modelSpecs: "Boy: 1.86 m • Kilo: 77 kg • Beden: 32 / Baggy Wide",
    mediaType: "image",
    mediaSrc: "/images/categories/jeans-cat.webp",
    aspect: "aspect-square",
    tilt: "rotate-3",
    offset: "lg:translate-y-12",
    tags: ["14.5 OZ", "RIGID DENIM", "VINTAGE WASH"],
    featuredProductSlug: "vintage-washed-jeans",
    quote: "Formunu kaybetmeyen, zamanla sana uyum sağlayan zırh.",
  },
  {
    id: "look-5",
    frameNo: "FRAME [05/07]",
    title: "BOX-CUT ARCHITECTURE",
    category: "hoodies",
    subtitle: "Düşük omuzlar, geniş gövde dökümü ve bilekleri kavrayan tok ribanalar.",
    location: "GALATA KULESİ / GECE ÇEKİMİ",
    cameraInfo: "Canon EOS 1V // Kodak Portra 800 // 50mm f/1.2",
    modelSpecs: "Boy: 1.82 m • Kilo: 72 kg • Beden: M / Boxy Kesim",
    mediaType: "image",
    mediaSrc: "/images/categories/hoodies-cat.webp",
    aspect: "aspect-[3/4]",
    tilt: "-rotate-2",
    offset: "lg:translate-y-24",
    tags: ["BOXY FIT", "DROP SHOULDER", "HEAVY RIB"],
    featuredProductSlug: "drill-logo-hoodie",
    quote: "Kalıplarımız standart ölçü tablolarına uymaz; sokağa uyar.",
  },
  {
    id: "look-6",
    frameNo: "FRAME [06/07]",
    title: "TACTICAL NIGHT COAT",
    category: "night",
    subtitle: "Gizli cepler, rüzgar geçirmez membran ve mat siyah YKK fermuarlar.",
    location: "KARAKÖY LİMAN / YAĞMURLU GECE",
    cameraInfo: "Mamiya 7II // 65mm f/4 // Cinestill 800T",
    modelSpecs: "Boy: 1.89 m • Kilo: 80 kg • Beden: L / Katmanlı Giyim",
    mediaType: "image",
    mediaSrc: "/images/categories/jackets-cat.webp",
    aspect: "aspect-[4/5]",
    tilt: "rotate-1",
    offset: "lg:translate-y-4",
    tags: ["WATERPROOF", "MATTE BLACK", "YKK ZIPPERS"],
    featuredProductSlug: "tactical-zip-jacket",
    quote: "Şehrin sert havasına karşı tam koruma.",
  },
  {
    id: "look-7",
    frameNo: "FRAME [07/07]",
    title: "BAGGY DRAPE MOTION",
    category: "bottoms",
    subtitle: "Sneaker'ların üzerine tam oturan geniş paça dökümü.",
    location: "BEŞİKTAŞ / İSKELE MEYDANI",
    cameraInfo: "Nikon F3 // 50mm f/1.4 // Fuji Neopan Acros 100",
    modelSpecs: "Boy: 1.85 m • Kilo: 76 kg • Beden: L / Geniş Paça",
    mediaType: "image",
    mediaSrc: "/images/categories/sweatpants-cat.webp",
    aspect: "aspect-square",
    tilt: "-rotate-3",
    offset: "lg:translate-y-16",
    tags: ["FRENCH TERRY", "EXTRA POCKETS", "CHUNKY DRAWSTRING"],
    featuredProductSlug: "heavy-baggy-sweatpants",
    quote: "Hareket özgürlüğü ve tavizsiz salaşlık.",
  },
];

export default function EditorialPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxLook, setLightboxLook] = useState<EditorialLook | null>(null);
  const [layoutMode, setLayoutMode] = useState<"asymmetric" | "grid">("asymmetric");

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Lock body scroll and handle ESC when lightbox is active
  useEffect(() => {
    if (!lightboxLook) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxLook(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxLook]);

  const [looks, setLooks] = useState<EditorialLook[]>(EDITORIAL_LOOKS);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.settings?.editorial_looks && Array.isArray(data.settings.editorial_looks) && data.settings.editorial_looks.length > 0) {
          setLooks(data.settings.editorial_looks);
        }
      })
      .catch((err) => console.warn("Editorial page content fetch fallback:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredLooks = looks.filter((look) => {
    if (selectedCategory === "all") return true;
    return look.category === selectedCategory;
  });

  return (
    <div className="bg-[#050507] text-white min-h-screen overflow-hidden select-none">
      {/* 1. ASİMETRİK EDİTORYAL BAŞLIK ALANI */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          {/* Üst Metadata Satırı */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono text-zinc-500 border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-zinc-300 font-bold uppercase tracking-wider">
                EDİTORYAL LOOKBOOK // 35MM SOKAK ARŞİVİ
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">ANALOG FİLM: KODAK TRI-X 400</span>
              <span className="bg-red-950/70 text-red-400 border border-red-900/60 px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider">
                ★ SEZON 2026 ÇEKİMLERİ
              </span>
            </div>
          </div>

          {/* Dev Tipografi: EDİTORYAL LOOKBOOK */}
          <div className="relative">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black font-mono tracking-tighter uppercase leading-none">
              <span className="block text-white">EDİTORYAL</span>
              <span className="block text-stroke-white text-transparent sm:pl-32">
                LOOKBOOK
              </span>
            </h1>

            {/* Asimetrik Yüzen Pul / Etiket */}
            <div className="absolute top-2 right-0 sm:right-12 bg-red-600 text-black font-mono font-black text-xs sm:text-sm px-4 py-2 rounded-xl rotate-6 shadow-2xl uppercase tracking-wider hidden sm:block border border-black/40">
              ★ TAVİZSİZ SOKAK KÜLTÜRÜ
            </div>
          </div>

          <p className="mt-8 text-xs sm:text-sm font-mono text-zinc-400 max-w-xl leading-relaxed">
            Amsterdam&apos;ın karanlık underground kulüplerinden İstanbul&apos;un tarihi sokaklarına uzanan, sınırlı sayıda üretilmiş parçaların analog kamera arkası çekimleri ve editoryal silüetleri.
          </p>

          {/* Filtre ve Düzen Çubuğu (Türkçe) */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-900">
            {/* Kategori Filtre Butonları */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "TÜM KOMBİNLER" },
                { id: "hoodies", label: "HOODIE & ÜST" },
                { id: "bottoms", label: "BAGGY EŞOFMAN & DENİM" },
                { id: "video", label: "CANLI VİDEO REEL" },
                { id: "night", label: "GECE ÇEKİMLERİ" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedCategory(btn.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                    selectedCategory === btn.id
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/80"
                      : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Düzen Modu Değiştirici */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-500 uppercase">Görünüm:</span>
              <button
                type="button"
                onClick={() => setLayoutMode("asymmetric")}
                className={`px-3 py-1 rounded border text-[11px] uppercase font-bold transition-all ${
                  layoutMode === "asymmetric"
                    ? "bg-zinc-800 text-white border-zinc-700"
                    : "text-zinc-500 border-zinc-900 hover:text-white"
                }`}
              >
                Asimetrik
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                className={`px-3 py-1 rounded border text-[11px] uppercase font-bold transition-all ${
                  layoutMode === "grid"
                    ? "bg-zinc-800 text-white border-zinc-700"
                    : "text-zinc-500 border-zinc-900 hover:text-white"
                }`}
              >
                Hizalı Izgara
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BEYAZ TİCKER MARQUEE */}
      <div className="bg-white text-black py-2.5 overflow-hidden whitespace-nowrap font-mono font-black text-xs tracking-widest uppercase flex select-none">
        <div className="animate-marquee flex gap-8 items-center">
          <span>★ EDİTORYAL SERİ VOL. 01</span>
          <span>★ 460 GSM SAF FRANSIZ PAMUK</span>
          <span>★ SOKAK ÇEKİMLERİ İSTANBUL & AMSTERDAM</span>
          <span>★ AYNI ŞEHİR FARKLI BAKIŞ AÇISI</span>
          <span>★ TAVİZSİZ BAGGY VE BOXY KESİMLER</span>
          <span>★ EDİTORYAL SERİ VOL. 01</span>
          <span>★ 460 GSM SAF FRANSIZ PAMUK</span>
          <span>★ SOKAK ÇEKİMLERİ İSTANBUL & AMSTERDAM</span>
          <span>★ AYNI ŞEHİR FARKLI BAKIŞ AÇISI</span>
          <span>★ TAVİZSİZ BAGGY VE BOXY KESİMLER</span>
        </div>
      </div>

      {/* 3. ASİMETRİK / POLAROID FİLM ŞERİDİ DÜZENİ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div
          className={`grid gap-10 sm:gap-14 items-start ${
            layoutMode === "asymmetric"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredLooks.map((look) => {
            const product = PRODUCTS.find((p) => p.slug === look.featuredProductSlug);

            return (
              <div
                key={look.id}
                className={`relative flex flex-col justify-between group transition-all duration-500 ${
                  layoutMode === "asymmetric" ? (look.offset || "") : ""
                }`}
              >
                {/* Polaroid Çerçevesi */}
                <div
                  className={`relative ${look.aspect || "aspect-[3/4]"} w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] ${
                    layoutMode === "asymmetric" ? (look.tilt || "") : ""
                  } group-hover:rotate-0 group-hover:border-zinc-700 cursor-pointer`}
                  onClick={() => setLightboxLook(look)}
                >
                  {/* Fotoğraf veya Canlı Video */}
                  {look.mediaType === "video" ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter contrast-120 group-hover:scale-105 transition-transform duration-700"
                    >
                      <source src={look.mediaSrc} type="video/webm" />
                    </video>
                  ) : (
                    <Image
                      src={look.mediaSrc}
                      alt={look.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center filter contrast-115 group-hover:scale-110 transition-transform duration-700"
                      unoptimized={look.mediaSrc.startsWith('/uploads/') || look.mediaSrc.startsWith('http')}
                    />
                  )}

                  {/* Gradyan ve Vinyet Katmanı */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Üst Etiketler */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 uppercase">
                      {look.frameNo}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" />
                      <span>{(look.location || "").split("/")[0] || look.location || "İSTANBUL"}</span>
                    </span>
                  </div>

                  {/* Büyüt / Detay İkonu (Hover'da Ortada Çıkar) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    <span className="bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs px-4 py-2 rounded-full flex items-center gap-2 uppercase tracking-wider shadow-2xl">
                      <Maximize2 className="w-3.5 h-3.5 text-red-500" />
                      <span>FİLM DETAYINI İNCELE</span>
                    </span>
                  </div>

                  {/* Alt Bilgi */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {(look.tags || []).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono font-black text-red-400 bg-red-950/80 border border-red-900/60 px-2 py-0.5 rounded uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight font-mono">
                      {look.title}
                    </h3>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-2">
                      {look.subtitle}
                    </p>

                    {look.quote && (
                      <p className="text-[11px] font-serif italic text-zinc-400 pt-1 border-t border-zinc-800">
                        &ldquo;{look.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Bağlantılı Ürün Satın Alma Çubuğu */}
                {product && (
                  <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-between gap-3 shadow-lg">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                        KOMBİNDEKİ PARÇA:
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-xs font-bold text-white hover:text-red-400 transition-colors uppercase truncate block"
                      >
                        {product.name}
                      </Link>
                      <span className="text-[11px] font-mono font-bold text-red-400">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          addItem(product, product.sizes[0] || "L", product.colors[0] || "Siyah");
                          openCart();
                        }}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg transition-colors"
                        title="Hızlı Sepete Ekle"
                        aria-label="Sepete Ekle"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center gap-1 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black px-3 py-2 rounded-lg uppercase tracking-wider transition-colors"
                      >
                        <span>İNCELE</span>
                        <MoveUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ANALOG FİLM LIGHTBOX MODAL (BÜYÜK DETAY EKRANI) */}
      {lightboxLook && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-hidden w-full max-w-full pointer-events-auto"
          style={{ touchAction: "none" }}
        >
          <div
            className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overscroll-contain box-border"
            style={{ touchAction: "pan-y" }}
          >
            {/* Kapat Butonu */}
            <button
              type="button"
              onClick={() => setLightboxLook(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sol: Medya Alanı */}
            <div className="md:w-1/2 relative min-h-[350px] md:min-h-[500px] bg-black">
              {lightboxLook.mediaType === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src={lightboxLook.mediaSrc} type="video/webm" />
                </video>
              ) : (
                <Image
                  src={lightboxLook.mediaSrc}
                  alt={lightboxLook.title}
                  fill
                  className="object-cover"
                  unoptimized={lightboxLook.mediaSrc.startsWith('/uploads/') || lightboxLook.mediaSrc.startsWith('http')}
                />
              )}
            </div>

            {/* Sağ: Editoryal Bilgiler ve Doğrudan Satın Alma */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-3 border-b border-zinc-850">
                  <span className="text-red-500 font-bold">{lightboxLook.frameNo}</span>
                  <span>{lightboxLook.location}</span>
                </div>

                <h3 className="text-2xl font-black uppercase text-white font-mono leading-tight">
                  {lightboxLook.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {lightboxLook.subtitle}
                </p>

                {/* Çekim ve Model Bilgileri Kartı */}
                <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-2 text-xs font-mono">
                  <div className="flex items-start gap-2 text-zinc-400">
                    <Camera className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{lightboxLook.cameraInfo}</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-300 pt-1 border-t border-zinc-800">
                    <span className="text-red-500 font-bold shrink-0">MODEL:</span>
                    <span>{lightboxLook.modelSpecs}</span>
                  </div>
                </div>

                {lightboxLook.quote && (
                  <div className="p-3 bg-red-950/20 border-l-2 border-red-600 rounded-r-lg text-xs font-serif italic text-zinc-300">
                    &ldquo;{lightboxLook.quote}&rdquo;
                  </div>
                )}
              </div>

              {/* Kombin Satın Alma */}
              {(() => {
                const prod = PRODUCTS.find((p) => p.slug === lightboxLook.featuredProductSlug);
                if (!prod) return null;
                return (
                  <div className="pt-4 border-t border-zinc-850 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                          KOMBİNDEKİ PARÇA
                        </span>
                        <h4 className="text-sm font-bold text-white uppercase">{prod.name}</h4>
                      </div>
                      <span className="text-base font-mono font-black text-red-500">
                        {formatPrice(prod.price)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          addItem(prod, prod.sizes[0] || "L", prod.colors[0] || "Siyah");
                          setLightboxLook(null);
                          openCart();
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>SEPETE EKLE ({prod.sizes[0] || "L"})</span>
                      </button>

                      <Link
                        href={`/product/${prod.slug}`}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs px-4 py-3 rounded-xl uppercase tracking-wider transition-colors flex items-center justify-center"
                      >
                        <span>DETAY</span>
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 5. DEVASA SOKAK MANİFESTOSU ÇAĞRISI */}
      <section className="bg-zinc-950 py-24 sm:py-32 border-t border-zinc-900 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-900/60 px-4 py-1.5 rounded-full text-xs font-mono text-red-400 uppercase">
            <Flame className="w-4 h-4" />
            <span>SOKAK KÜLTÜRÜ MANİFESTOSU</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight uppercase leading-tight">
            &ldquo;BİZ MODA SEZONLARINI TAKİP ETMİYORUZ. <br className="hidden sm:inline" />
            BİZ SOKAĞIN İHTİYACINA GÖRE DROP YAPIYORUZ.&rdquo;
          </h2>

          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Her parça, sokakta yaşayan insanların tavizsiz duruşunu temsil etmek üzere tasarlandı. Seri üretim yok, kural yok; yalnızca saf kalite ve özgün kalıplar var.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs px-10 py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl shadow-red-950/60"
            >
              <span>TÜM DROPLARI İNCELE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-xs px-8 py-4 rounded-xl uppercase tracking-widest transition-colors"
            >
              <span>HİKAYEMİZİ OKU</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
