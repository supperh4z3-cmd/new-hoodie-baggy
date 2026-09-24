"use client";

import React, { useState } from "react";
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

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
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
    <div className="bg-[#0b0b10] text-white min-h-screen">
      {/* Subtle Ambient Top Glow for airy depth */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[300px] bg-red-950/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 lg:pb-16 relative z-10">
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
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-[#121218] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
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
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400 uppercase tracking-wider">Renk Seçimi:</span>
                  <span className="text-white font-bold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                        selectedColor === color
                          ? "bg-white text-black font-black shadow-lg scale-[1.02]"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Size Selector */}
              <div className="space-y-2 pt-1">
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
                <div className="flex items-center gap-3">
                  {/* Quantity Spinner */}
                  <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 h-13 px-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
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
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
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
                    className={`w-13 h-13 flex items-center justify-center rounded-xl border transition-all duration-200 ${
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
                <div className="flex border-b border-zinc-800 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveTab("fabric")}
                    className={`pb-2.5 px-3 uppercase font-bold transition-all relative ${
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
                    className={`pb-2.5 px-3 uppercase font-bold transition-all relative ${
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
                    className={`pb-2.5 px-3 uppercase font-bold transition-all relative ${
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

        {/* Sticky Mobile Add To Cart Bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#121218]/95 backdrop-blur-xl border-t border-zinc-800 p-3 z-40 flex items-center justify-between gap-3 shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-zinc-400">Toplam Tutar</span>
            <span className="text-base font-mono font-black text-white">
              {formatPrice(product.price * quantity)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-black py-3 px-4 rounded-xl uppercase tracking-wider shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>SEPETE EKLE ({selectedSize})</span>
          </button>
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
    </div>
  );
}
