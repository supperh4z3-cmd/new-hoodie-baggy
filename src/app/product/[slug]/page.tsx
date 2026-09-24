"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ruler, ShoppingBag, CheckCircle, Shield, Truck, RotateCcw, Heart, Sparkles } from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import { ProductSize } from "@/lib/types/ecommerce";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/products/ProductGallery";
import { SizeGuideModal } from "@/components/products/SizeGuideModal";
import { ProductAccordion } from "@/components/products/ProductAccordion";
import { RelatedProducts } from "@/components/products/RelatedProducts";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState<ProductSize>("L");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || "Black");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedEffect, setAddedEffect] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => (product ? state.isInWishlist(product.id) : false));
  const showToast = useToastStore((state) => state.showToast);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedEffect(true);
    showToast(`${quantity}x ${product.name} (${selectedSize}) sepete eklendi!`);
    setTimeout(() => setAddedEffect(false), 1200);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 pb-24 lg:pb-14">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-mono text-zinc-400 mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">
          ANASAYFA
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          SHOP
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-white transition-colors uppercase"
        >
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-white font-bold truncate max-w-[220px]">
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

        {/* Right Column: Elevated Clean Buy Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            {/* Header: Category, Title & Badges */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                  BAGGY STREET / {product.categoryName}
                </span>
                {product.badge && (
                  <span className="bg-red-600/90 text-white text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded uppercase font-black">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase leading-snug">
                {product.name}
              </h1>

              {/* Price & Discounts */}
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
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded">
                    -%{discountPercent} İNDİRİM
                  </span>
                )}
              </div>

              {/* Installment & Shipping Highlights */}
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>2.000 ₺ üzeri ücretsiz kargo • Peşin fiyatına 3 taksit</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2 border-t border-zinc-850">
              {product.shortDescription}
            </p>

            {/* Color Selector */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400 uppercase tracking-wider">Renk:</span>
                <span className="text-white font-bold">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedColor === color
                        ? "bg-white text-black font-black shadow-lg"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5 pt-2">
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
                    className={`py-3 rounded-lg text-xs font-mono font-black transition-all ${
                      selectedSize === size
                        ? "bg-white text-black shadow-xl ring-2 ring-white"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Buy Bar */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900 h-12 px-2.5">
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

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-black tracking-widest uppercase h-12 rounded-lg transition-all duration-200 shadow-xl shadow-red-950/60 hover:scale-[1.01]"
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

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                    isInWishlist
                      ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/50"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
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

              {/* In Stock Badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Stokta Var — 24 saat içinde Yurtiçi Kargo&apos;ya verilir</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="pt-2">
              <ProductAccordion details={product.details} />
            </div>

            {/* Trust Pills */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-850 text-[11px] font-mono text-zinc-400 text-center">
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-850 flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-red-500" />
                <span>Hızlı Kargo</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-850 flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-zinc-300" />
                <span>14 Gün İade</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-850 flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>%100 Orijinal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 p-3 z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-zinc-400">Toplam Tutar</span>
          <span className="text-base font-mono font-black text-white">
            {formatPrice(product.price * quantity)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-black py-3 px-4 rounded-lg uppercase tracking-wider"
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
  );
}
