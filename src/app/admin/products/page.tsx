'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  PlusCircle,
  RefreshCw,
  Edit2,
  Trash2,
  Layers,
  Shirt,
} from 'lucide-react';
import {
  StockEditorModal,
  AdminProduct,
} from '@/components/admin/StockEditorModal';
import { ProductFormModal } from '@/components/admin/ProductFormModal';

const CATEGORIES = [
  { id: 'ALL', name: 'TÜMÜ' },
  { id: 'hoodies', name: 'HOODIES' },
  { id: 'sweatpants', name: 'SWEATPANTS' },
  { id: 'jackets', name: 'JACKETS' },
  { id: 'jeans', name: 'JEANS' },
  { id: 'shirts', name: 'SHIRTS' },
  { id: 'tshirts', name: 'T-SHIRTS' },
  { id: 'accessories', name: 'AKSESUAR' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [search, setSearch] = useState('');

  // Modals
  const [stockProduct, setStockProduct] = useState<AdminProduct | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  const [formProduct, setFormProduct] = useState<AdminProduct | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const queryParams = new URLSearchParams();
        if (activeCategory !== 'ALL') queryParams.set('category', activeCategory);
        if (search.trim()) queryParams.set('search', search.trim());

        const res = await fetch(`/api/admin/products?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setProducts(data.products || []);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, search]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const queryParams = new URLSearchParams();
      if (activeCategory !== 'ALL') queryParams.set('category', activeCategory);
      if (search.trim()) queryParams.set('search', search.trim());

      const res = await fetch(`/api/admin/products?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleProductSaved = (saved: AdminProduct) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === saved.id);
      if (exists) {
        return prev.map((p) => (p.id === saved.id ? saved : p));
      }
      return [saved, ...prev];
    });
  };

  const handleProductDeleted = async (id: string, name: string) => {
    if (!confirm(`"${name}" ürününü katalogdan ve veritabanından kalıcı olarak silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert('Ürün silinirken bir hata oluştu.');
      }
    } catch (err) {
      console.error(err);
      alert('Ürün silinemedi.');
    }
  };

  const openStockModal = (product: AdminProduct) => {
    setStockProduct(product);
    setIsStockModalOpen(true);
  };

  const openCreateModal = () => {
    setFormProduct(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (product: AdminProduct) => {
    setFormProduct(product);
    setIsFormModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
            ÜRÜN & STOK KATALOĞU
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            Sokak koleksiyonlarını yönetin, beden bazında stokları anlık güncelleyin
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-500' : ''}`} />
            <span>Yenile</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni Drop / Ürün Ekle</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border transition-colors shrink-0 ${
                  isActive
                    ? 'bg-red-600 text-black border-red-600'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ürün adı veya kod ara..."
            className="w-full bg-[#121218] border border-zinc-800 pl-9 pr-3 py-1.5 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#121218] border border-zinc-800">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs animate-pulse">
            Ürünler ve stok envanteri yükleniyor...
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            <Shirt className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
            <span>Kriterlere uygun ürün bulunamadı.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] font-mono uppercase text-zinc-500 bg-zinc-950/40">
                  <th className="py-3 px-4">Ürün & Detay</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Fiyat</th>
                  <th className="py-3 px-4">Beden Bazında Envanter</th>
                  <th className="py-3 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs font-mono">
                {products.map((product) => {
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-zinc-900/40 transition-colors"
                    >
                      {/* Product Thumbnail + Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 relative bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white uppercase text-xs">
                                {product.name}
                              </span>
                              {product.badge && (
                                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-red-600 text-black">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zinc-500 block mt-0.5">
                              /{product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-bold uppercase">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-bold text-white">
                        <div>
                          {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                        </div>
                        {product.comparePrice && (
                          <div className="text-[10px] text-zinc-500 line-through">
                            {product.comparePrice.toLocaleString('tr-TR')} ₺
                          </div>
                        )}
                      </td>

                      {/* Size Stock Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {product.sizes.map((s) => {
                            const isCritical = s.stock <= 5;
                            const isLow = s.stock > 5 && s.stock <= 15;

                            return (
                              <span
                                key={s.size}
                                className={`px-2 py-0.5 text-[10px] border flex items-center gap-1 ${
                                  isCritical
                                    ? 'bg-red-500/10 text-red-400 border-red-500/40 font-black'
                                    : isLow
                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold'
                                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                                }`}
                              >
                                <span className="text-zinc-500">{s.size}:</span>
                                <span>{s.stock}</span>
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openStockModal(product)}
                            className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[11px] flex items-center gap-1 transition-colors"
                            title="Hızlı Stok Düzenle"
                          >
                            <Layers className="w-3.5 h-3.5 text-amber-500" />
                            <span className="hidden sm:inline">Stok</span>
                          </button>

                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                            title="Ürünü Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleProductDeleted(product.id, product.name)}
                            className="p-1.5 bg-zinc-900 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-800/40 transition-colors"
                            title="Ürünü Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stock Editor Modal */}
      {isStockModalOpen && (
        <StockEditorModal
          key={stockProduct ? stockProduct.id : 'none'}
          product={stockProduct}
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          onStockUpdated={handleProductSaved}
        />
      )}

      {/* Product Form Modal */}
      {isFormModalOpen && (
        <ProductFormModal
          key={formProduct ? formProduct.id : 'new'}
          product={formProduct}
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSaved={handleProductSaved}
        />
      )}
    </div>
  );
}
