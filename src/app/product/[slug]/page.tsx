"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ruler, ShoppingBag, CheckCircle, Shield, Truck, RotateCcw } from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import { ProductSize } from "@/lib/types/ecommerce";
import { useCartStore } from "@/lib/store/useCartStore";
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

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 mb-8 flex items-center gap-2 flex-wrap">
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
        <span className="text-white truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Gallery (7 cols) */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            name={product.name}
            badge={product.badge}
          />
        </div>

        {/* Right Column: Sticky Product Info & Buy Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Header & Price */}
          <div>
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-1.5">
              BAGGY STREET / {product.categoryName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase leading-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-black font-mono text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm font-mono text-zinc-600 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="mt-1 text-[11px] font-mono text-zinc-400">
              Vade farksız 3 taksit imkanı • Kargo Bedava (2.000 TL üzeri)
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color Selector */}
          <div className="space-y-2 pt-2 border-t border-zinc-850">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase">Renk:</span>
              <span className="text-white font-bold">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                    selectedColor === color
                      ? "bg-white text-black font-bold"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase">Beden:</span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px] transition-colors"
              >
                <Ruler className="w-3 h-3" />
                <span>Beden Tablosu (Size Guide)</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded text-xs font-mono font-bold transition-all ${
                    selectedSize === size
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/60 ring-1 ring-red-500"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-zinc-800 rounded bg-zinc-950 h-12 px-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-zinc-400 hover:text-white"
                  aria-label="Azalt"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-zinc-400 hover:text-white"
                  aria-label="Artır"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Primary Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold tracking-widest uppercase h-12 rounded transition-all duration-200 shadow-xl"
              >
                {addedEffect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>SEPETE EKLENDİ!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>SEPETE EKLE • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* In Stock status */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Stokta Var — 24 saat içinde kargoya verilir</span>
            </div>
          </div>

          {/* Quick Features Row */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-zinc-850 text-center text-[10px] font-mono text-zinc-400">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-zinc-400" />
              <span>Hızlı Kargo</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-zinc-400" />
              <span>14 Gün İade</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Shield className="w-4 h-4 text-zinc-400" />
              <span>Orijinal Ürün</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <ProductAccordion details={product.details} />
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />

      {/* Related Products */}
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </div>
  );
}
