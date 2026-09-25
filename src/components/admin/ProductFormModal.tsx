'use client';

import React, { useState } from 'react';
import { X, Save, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { AdminProduct } from './StockEditorModal';
import { MultiImageUploader } from './MultiImageUploader';

interface ProductFormModalProps {
  product: AdminProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (product: AdminProduct) => void;
}

const CATEGORIES = [
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'sweatpants', name: 'Sweatpants' },
  { id: 'jackets', name: 'Jackets' },
  { id: 'jeans', name: 'Jeans' },
  { id: 'shirts', name: 'Shirts' },
  { id: 'tshirts', name: 'T-Shirts' },
  { id: 'accessories', name: 'Accessories' },
];

export function ProductFormModal({
  product,
  isOpen,
  onClose,
  onSaved,
}: ProductFormModalProps) {
  const isEditing = Boolean(product);

  // Parse initial gallery images
  const initialImages: string[] = (() => {
    if (!product) return [];
    if (product.gallery) {
      try {
        const parsed = JSON.parse(product.gallery);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return product.image ? [product.image] : [];
  })();

  const [name, setName] = useState(product?.name || '');
  const [slug, setSlug] = useState(product?.slug || '');
  const [category, setCategory] = useState(product?.category || 'hoodies');
  const [price, setPrice] = useState(product?.price?.toString() || '2499');
  const [comparePrice, setComparePrice] = useState(product?.comparePrice?.toString() || '');
  const [badge, setBadge] = useState(product?.badge || 'NEW');
  const [images, setImages] = useState<string[]>(initialImages);
  const [coverImage, setCoverImage] = useState<string>(product?.image || initialImages[0] || '');
  const [description, setDescription] = useState(product?.description || '');
  const [fabric, setFabric] = useState(product?.details?.fabric || '%100 Ağır Pamuklu Kumaş');
  const [fit, setFit] = useState(product?.details?.fit || 'Boxy / Heavy Oversize');
  const [gsm, setGsm] = useState(product?.details?.gsm?.toString() || '460');
  const [origin, setOrigin] = useState(product?.details?.origin || 'İstanbul, Türkiye');

  // Initial stock map for creation
  const [stocks, setStocks] = useState<Record<string, number>>({
    S: 15,
    M: 25,
    L: 35,
    XL: 20,
    XXL: 10,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (images.length === 0) {
        throw new Error('Lütfen ürün için en az bir görsel yükleyin veya ekleyin.');
      }

      const finalCover = coverImage && images.includes(coverImage) ? coverImage : images[0];

      const payload: Record<string, unknown> = {
        name,
        slug: slug.trim() || undefined,
        category,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        badge: badge.trim() || null,
        image: finalCover,
        gallery: images,
        description,
        fabric,
        fit,
        gsm: parseInt(gsm, 10) || 420,
        origin,
      };

      if (!isEditing) {
        payload.sizes = Object.entries(stocks).map(([size, stock]) => ({
          size,
          stock,
        }));
      }

      const url = isEditing
        ? `/api/admin/products/${product!.id}`
        : '/api/admin/products';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'İşlem başarısız oldu.');
      }

      const data = await res.json();
      onSaved(data.product);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ürün kaydedilirken hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#121218] border border-zinc-800 p-6 shadow-2xl my-8 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-base font-mono font-bold text-white uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>{isEditing ? 'Ürünü Düzenle' : 'Yeni Sokak Dropu / Ürün Ekle'}</span>
            </h3>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              BAGGY STREET katalog ve teknik detay kartı
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                Ürün Adı *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: DRILL LOGO HOODIE"
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                URL / Slug (Opsiyonel)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="drill-logo-hoodie"
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                Fiyat (TL) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                İndirimsiz Liste Fiyatı
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                placeholder="Örn: 2899"
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                Rozet (Badge)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="NEW / HOT / LIMITED"
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800">
            <MultiImageUploader
              images={images}
              coverImage={coverImage}
              onChange={(newImages, newCover) => {
                setImages(newImages);
                setCoverImage(newCover);
              }}
              folder="products"
              maxImages={8}
            />
          </div>

          <div>
            <label className="block text-zinc-400 uppercase text-[11px] mb-1">
              Ürün Açıklaması
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Amsterdam ve İstanbul sokaklarının ham ruhunu yansıtan ağır gramajlı sokak silüeti..."
              className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="pt-2 border-t border-zinc-800/80">
            <h4 className="text-[11px] font-bold uppercase text-red-400 mb-2">
              Teknik Özellikler & Kumaş
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                  Kumaş / Materyal
                </label>
                <input
                  type="text"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                  Kalıp (Fit)
                </label>
                <input
                  type="text"
                  value={fit}
                  onChange={(e) => setFit(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                  Gramaj (GSM)
                </label>
                <input
                  type="number"
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                  Üretim Yeri (Menşei)
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {!isEditing && (
            <div className="pt-2 border-t border-zinc-800/80">
              <h4 className="text-[11px] font-bold uppercase text-red-400 mb-2">
                Başlangıç Beden Stokları
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {Object.keys(stocks).map((sizeKey) => (
                  <div key={sizeKey} className="text-center">
                    <span className="block text-[10px] text-zinc-400 mb-1">{sizeKey}</span>
                    <input
                      type="number"
                      min="0"
                      value={stocks[sizeKey]}
                      onChange={(e) =>
                        setStocks((prev) => ({
                          ...prev,
                          [sizeKey]: parseInt(e.target.value, 10) || 0,
                        }))
                      }
                      className="w-full bg-[#0a0a0e] border border-zinc-800 text-center py-1.5 text-xs text-white font-bold focus:outline-none focus:border-red-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 uppercase"
            >
              Vazgeç
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-black font-bold uppercase flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>KAYDEDİLİYOR...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'DEĞİŞİKLİKLERİ KAYDET' : 'ÜRÜNÜ YAYINLA'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
