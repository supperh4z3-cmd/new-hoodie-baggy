"use client";

import React, { useState, use } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Ruler,
  CheckCircle,
  Truck,
  RotateCcw,
  Shield,
  Sparkles,
} from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import { ProductSize } from "@/lib/types/ecommerce";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/products/ProductGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { SizeGuideModal } from "@/components/products/SizeGuideModal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage(props: PageProps) {
  const resolvedParams = use(props.params);
  const clientParams = useParams();
  const slug = resolvedParams?.slug || (clientParams?.slug as string);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[0] || "L"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0] || "Siyah"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedEffect, setAddedEffect] = useState(false);
  const [activeTab, setActiveTab] = useState<"fabric" | "fit" | "shipping">("fabric");

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const showToast = useToastStore((state) => state.showToast);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedEffect(true);
    showToast(`${product.name} (${selectedSize} - ${selectedColor}) sepete eklendi!`);
    setTimeout(() => {
      setAddedEffect(false);
      openCart();
    }, 400);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    if (added) {
      showToast(`${product.name} favorilere eklendi!`);
    } else {
      showToast(`${product.name} favorilerden çıkarıldı.`, "info");
    }
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <div className="bg-[#0b0b10] text-white min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Subtle Ambient Top Glow for airy depth */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[300px] bg-red-950/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32 lg:pb-16 relative z-10 w-full max-w-full overflow-x-hidden box-border">
        {/* Clean Breadcrumb Navigation */}
        <nav className="text-xs font-mono text-zinc-400 mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            ANASAYFA
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/shop" className="hover:text-white transition-colors">
            KOLEKSİYON
          </Link>
          <span className="text-zinc-600">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-white transition-colors uppercase text-zinc-300"
          >
            {product.categoryName}
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white font-bold truncate max-w-[240px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Premium Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              name={product.name}
              badge={product.badge}
            />
          </div>

          {/* Right Column: Clean, Decluttered, High-Contrast Luxury Buy Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 w-full max-w-full min-w-0">
            <div className="bg-[#121218] border border-zinc-800/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl space-y-6 w-full max-w-full overflow-hidden box-border">
              {/* 1. Header: Category Badge & Product Title */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest text-red-500 uppercase font-black">
                    BAGGY STREET // {product.categoryName}
                  </span>
                  {product.badge && (
                    <span className="bg-red-600 text-white text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full uppercase font-black shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-mono leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl font-black font-mono text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base font-mono text-zinc-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-950/70 border border-red-900/60 px-2 py-0.5 rounded-md">
                      -%{discountPercent} İNDİRİM
                    </span>
                  )}
                </div>

                {/* Free Shipping Highlight */}
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-0.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>2.000 ₺ üzeri ücretsiz kargo • Peşin fiyatına 3 taksit</span>
                </div>
              </div>

              {/* 2. Short Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-3 border-t border-zinc-800">
                {product.shortDescription}
              </p>

              {/* 3. Color Selector */}
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400 uppercase tracking-wider">Renk Seçimi:</span>
                  <span className="text-white font-bold bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-md">
                    {selectedColor}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color;
                    const lower = color.toLowerCase();
                    const swatchBg =
                      lower.includes("siyah") || lower.includes("black")
                        ? "bg-black border-zinc-700"
                        : lower.includes("antrasit") || lower.includes("kömür")
                        ? "bg-zinc-800 border-zinc-600"
                        : lower.includes("gri") || lower.includes("grey")
                        ? "bg-zinc-500 border-zinc-400"
                        : lower.includes("beyaz") || lower.includes("white")
                        ? "bg-zinc-100 border-zinc-300"
                        : lower.includes("kırmızı") || lower.includes("red")
                        ? "bg-red-800 border-red-600"
                        : lower.includes("indigo") || lower.includes("denim")
                        ? "bg-blue-950 border-blue-800"
                        : lower.includes("olive") || lower.includes("haki")
                        ? "bg-emerald-950 border-emerald-800"
                        : "bg-zinc-700 border-zinc-600";

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 text-left min-w-0 ${
                          isSelected
                            ? "bg-white text-black font-black shadow-lg ring-2 ring-white/80"
                            : "bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full border shrink-0 ${swatchBg}`} />
                        <span className="truncate">{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Size Selector */}
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400 uppercase tracking-wider">Beden:</span>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1.5 text-xs transition-colors underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Beden Tablosu</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl text-xs font-mono font-black transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-white text-black shadow-xl ring-2 ring-white scale-[1.02]"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Primary Action: Add To Cart & Wishlist */}
              <div className="space-y-3 pt-3">
                {/* Mobile Screen (< sm): Two Clean, Full-Width Ergonomic Rows */}
                <div className="sm:hidden space-y-2.5">
                  <div className="flex items-center gap-2">
                    {/* Mobile Quantity Spinner */}
                    <div className="flex items-center justify-between border border-zinc-800 rounded-xl bg-zinc-900 h-12 px-3 w-32 shrink-0">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1.5 text-zinc-400 hover:text-white transition-colors text-base font-bold"
                        aria-label="Azalt"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-black text-white">
                        {quantity} ADET
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1.5 text-zinc-400 hover:text-white transition-colors text-base font-bold"
                        aria-label="Artır"
                      >
                        +
                      </button>
                    </div>

                    {/* Mobile Wishlist Button */}
                    <button
                      type="button"
                      onClick={handleToggleWishlist}
                      className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                        isInWishlist
                          ? "bg-red-950/80 border-red-600 text-red-400"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
                      />
                      <span>{isInWishlist ? "FAVORİLERDE" : "FAVORİYE EKLE"}</span>
                    </button>
                  </div>

                  {/* Mobile High-Impact Add To Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-between px-5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white h-14 rounded-xl transition-all duration-200 shadow-xl shadow-red-950/70"
                  >
                    {addedEffect ? (
                      <div className="w-full flex items-center justify-center gap-2 font-mono font-black text-xs tracking-wider">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>SEPETE EKLENDİ!</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2.5 font-mono font-black text-xs tracking-widest uppercase">
                          <ShoppingBag className="w-4 h-4 shrink-0" />
                          <span>SEPETE EKLE</span>
                        </div>
                        <span className="font-mono font-black text-xs text-white/90 bg-black/25 px-2.5 py-1 rounded-md">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Tablet / Desktop Screen (>= sm): Horizontal Row */}
                <div className="hidden sm:flex items-center gap-3">
                  {/* Quantity Spinner */}
                  <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 h-13 px-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors text-sm font-bold"
                      aria-label="Azalt"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-black text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors text-sm font-bold"
                      aria-label="Artır"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add To Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-black tracking-widest uppercase h-13 rounded-xl transition-all duration-200 shadow-xl shadow-red-950/70 hover:scale-[1.01]"
                  >
                    {addedEffect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>SEPETE EKLENDİ!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>SEPETE EKLE • {formatPrice(product.price * quantity)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Heart */}
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={`w-13 h-13 shrink-0 flex items-center justify-center rounded-xl border transition-all duration-200 ${
                      isInWishlist
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/50"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                    aria-label={isInWishlist ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                    title={isInWishlist ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        isInWishlist ? "fill-white text-white" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Stokta Var — 24 saat içinde kargoya teslim edilir</span>
                </div>
              </div>

              {/* 6. Streamlined Specs Tab Widget (Replaces cluttered vertical accordions) */}
              <div className="pt-3 border-t border-zinc-850 space-y-3">
                <div className="flex border-b border-zinc-800 text-xs font-mono overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setActiveTab("fabric")}
                    className={`pb-2.5 px-3 uppercase font-bold transition-all relative shrink-0 ${
                      activeTab === "fabric"
                        ? "text-white border-b-2 border-red-600"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Kumaş & Doku
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("fit")}
                    className={`pb-2.5 px-3 uppercase font-bold transition-all relative shrink-0 ${
                      activeTab === "fit"
                        ? "text-white border-b-2 border-red-600"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Kalıp & Beden
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("shipping")}
                    className={`pb-2.5 px-3 uppercase font-bold transition-all relative shrink-0 ${
                      activeTab === "shipping"
                        ? "text-white border-b-2 border-red-600"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Kargo & Bakım
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="text-xs font-sans text-zinc-300 leading-relaxed p-1">
                  {activeTab === "fabric" && (
                    <div className="space-y-1.5 font-mono">
                      <p>
                        <strong className="text-white">Materyal:</strong> {product.details.material}
                      </p>
                      <p>
                        <strong className="text-white">Menşei:</strong> {product.details.origin}
                      </p>
                      <p className="text-zinc-400 font-sans text-xs pt-1">
                        Yoğun ilmek dokuma teknolojisi ile rüzgar geçirmez, esnemez, dik ve tok duruş sağlar.
                      </p>
                    </div>
                  )}

                  {activeTab === "fit" && (
                    <div className="space-y-1.5 font-mono">
                      <p>
                        <strong className="text-white">Kalıp:</strong> {product.details.fit}
                      </p>
                      <p className="text-zinc-400 font-sans text-xs pt-1">
                        Düşük omuzlu rahat döküm için tasarlanmıştır. Standart bedeninizi seçtiğinizde oversize salaş duracaktır.
                      </p>
                    </div>
                  )}

                  {activeTab === "shipping" && (
                    <div className="space-y-1.5 font-mono">
                      <p>
                        <strong className="text-white">Bakım:</strong> {product.details.care}
                      </p>
                      <p className="text-zinc-400 font-sans text-xs pt-1">
                        Yurtiçi Kargo güvencesiyle 1-3 iş gününde kapınızda. 14 gün ücretsiz kolay değişim.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 7. Reassurance Pills */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 text-center">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-red-500" />
                  <span>Hızlı Kargo</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-zinc-300" />
                  <span>14 Gün İade</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>%100 Orijinal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Drops */}
        <div className="mt-20">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>

        {/* Size Guide Modal */}
        <SizeGuideModal
          isOpen={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          category={product.category}
        />
      </div>

      {/* Sticky Mobile Add To Cart Bar - Placed at ROOT LEVEL for perfect viewport pinning */}
      <div
        id="mobile-sticky-buy-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          zIndex: 9999,
        }}
        className="lg:hidden bg-[#0c0c12]/98 backdrop-blur-2xl border-t border-zinc-800 px-3.5 pt-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.9)]"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            width: "100%",
            maxWidth: "480px",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {/* Price Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              minWidth: "75px",
            }}
          >
            <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase font-semibold">
              TOPLAM
            </span>
            <span className="text-sm sm:text-base font-mono font-black text-white whitespace-nowrap">
              {formatPrice(product.price * quantity)}
            </span>
          </div>

          {/* Direct Flex Add-To-Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              flex: "1 1 0%",
              minWidth: 0,
              height: "46px",
              paddingLeft: "12px",
              paddingRight: "12px",
              boxSizing: "border-box",
            }}
            className="bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white rounded-xl uppercase font-mono font-black text-xs tracking-wider shadow-lg shadow-red-950/80 transition-all cursor-pointer"
          >
            {addedEffect ? (
              <>
                <CheckCircle className="w-4 h-4 shrink-0 text-white" />
                <span className="truncate">EKLENDİ!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span className="truncate min-w-0">SEPETE EKLE</span>
                <span className="shrink-0 text-[10px] opacity-75 font-normal">
                  ({selectedSize})
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
