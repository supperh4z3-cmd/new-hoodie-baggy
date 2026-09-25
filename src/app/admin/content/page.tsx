'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  SlidersHorizontal,
  Video,
  Megaphone,
  BookOpen,
  Compass,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  UploadCloud,
  Sparkles,
} from 'lucide-react';
import {
  HeroSlide,
  AnnouncementBarContent,
  EditorialLook,
  BrandStoryContent,
  DEFAULT_HERO_SLIDES,
  DEFAULT_ANNOUNCEMENT_BAR,
  DEFAULT_EDITORIAL_LOOKS,
  DEFAULT_BRAND_STORY,
} from '@/lib/contentDefaults';

type CmsTab = 'hero' | 'announcement' | 'editorial' | 'story';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<CmsTab>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // CMS States
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [announcement, setAnnouncement] = useState<AnnouncementBarContent>(DEFAULT_ANNOUNCEMENT_BAR);
  const [editorialLooks, setEditorialLooks] = useState<EditorialLook[]>(DEFAULT_EDITORIAL_LOOKS);
  const [brandStory, setBrandStory] = useState<BrandStoryContent>(DEFAULT_BRAND_STORY);

  // Uploading state tracking for individual inputs
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content');
        if (!res.ok) {
          throw new Error('Ayarlar sunucudan alınamadı.');
        }
        const data = await res.json();
        if (data.settings && isMounted) {
          if (data.settings.hero_slides) setHeroSlides(data.settings.hero_slides);
          if (data.settings.announcement_bar) setAnnouncement(data.settings.announcement_bar);
          if (data.settings.editorial_looks) setEditorialLooks(data.settings.editorial_looks);
          if (data.settings.brand_story) setBrandStory(data.settings.brand_story);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Yüklenirken hata oluştu.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileUpload = async (
    file: File,
    onSuccess: (url: string) => void,
    targetKey: string
  ) => {
    try {
      setUploadingTarget(targetKey);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'site');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Dosya yüklenemedi.');
      }

      const data = await res.json();
      onSuccess(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Dosya yüklenirken hata oluştu.');
    } finally {
      setUploadingTarget(null);
    }
  };

  const handleSaveTab = async (tabToSave: CmsTab) => {
    setSaving(true);
    setError(null);
    setSaveSuccess(null);

    let key = '';
    let value: unknown = null;

    if (tabToSave === 'hero') {
      key = 'hero_slides';
      value = heroSlides;
    } else if (tabToSave === 'announcement') {
      key = 'announcement_bar';
      value = announcement;
    } else if (tabToSave === 'editorial') {
      key = 'editorial_looks';
      value = editorialLooks;
    } else if (tabToSave === 'story') {
      key = 'brand_story';
      value = brandStory;
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Kaydetme işlemi başarısız.');
      }

      setSaveSuccess(`${getTabTitle(tabToSave)} ayarları başarıyla kaydedildi ve yayına alındı.`);
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Kaydedilirken hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const getTabTitle = (tab: CmsTab) => {
    switch (tab) {
      case 'hero':
        return 'Hero & Slider';
      case 'announcement':
        return 'Kayan Yazı & Duyuru';
      case 'editorial':
        return 'Editöryal & Lookbook';
      case 'story':
        return 'Marka Hikayesi & Manifesto';
    }
  };

  // Slide helpers
  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      type: 'video',
      src: '/videos/hero-traffic-night.webm',
      coordinates: '41.0082° N, 28.9784° E',
      city: 'YENİ ŞEHİR',
      badge: 'YENİ SOKAK DROPU',
      headline: 'DRILL SEASON',
      tagline: 'Sokağın Ham ve Tavizsiz Silüetleri',
      ctaText: 'HEMEN KEŞFET',
      ctaLink: '/shop',
    };
    setHeroSlides([...heroSlides, newSlide]);
  };

  const handleRemoveSlide = (idx: number) => {
    if (heroSlides.length <= 1) {
      alert('En az 1 adet hero slide bulunmalıdır.');
      return;
    }
    setHeroSlides(heroSlides.filter((_, i) => i !== idx));
  };

  // Editorial look helpers
  const handleAddEditorialLook = () => {
    const newLook: EditorialLook = {
      id: `look-${Date.now()}`,
      frameNo: `FRAME [0${editorialLooks.length + 1}/07]`,
      title: 'YENİ SOKAK ÇEKİMİ',
      category: 'hoodies',
      subtitle: 'Ağır gramajlı kumaşlar ve boxy dökümlü sokak tarzı.',
      location: 'İSTANBUL // GECE',
      cameraInfo: 'Leica M6 // Kodak Tri-X 400',
      modelSpecs: 'Boy: 1.85 m • Beden: L',
      mediaType: 'image',
      mediaSrc: '/images/brand/drill-editorial-1.webp',
      featuredProductSlug: 'drill-logo-hoodie',
      quote: 'Karanlık sokakların fırtınasında tavizsiz duruş.',
      tags: ['DRILL', '460 GSM'],
      aspect: 'aspect-[3/4]',
      tilt: '',
      offset: '',
    };
    setEditorialLooks([...editorialLooks, newLook]);
  };

  const handleRemoveEditorialLook = (idx: number) => {
    if (editorialLooks.length <= 1) {
      alert('En az 1 adet editöryal kart bulunmalıdır.');
      return;
    }
    setEditorialLooks(editorialLooks.filter((_, i) => i !== idx));
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        <p className="text-xs font-mono text-zinc-400">İçerik ayarları yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-mono font-black text-white uppercase tracking-wider">
              SİTE İÇERİK YÖNETİMİ (CMS)
            </h1>
          </div>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            Slider videoları, duyuru bantları, lookbook kartları ve manifesto metinlerini canlı yönetin
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            <span>Siteyi Gör</span>
          </a>

          <button
            onClick={() => handleSaveTab(activeTab)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-lg shadow-red-900/20"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Değişiklikleri Kaydet</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'hero'
              ? 'border-red-500 text-red-400 bg-red-950/10'
              : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>1. Hero & Slider</span>
          <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 ml-1">
            {heroSlides.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('announcement')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'announcement'
              ? 'border-red-500 text-red-400 bg-red-950/10'
              : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>2. Kayan Yazı & Duyuru</span>
          {announcement.enabled && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('editorial')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'editorial'
              ? 'border-red-500 text-red-400 bg-red-950/10'
              : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>3. Editöryal & Lookbook</span>
          <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 ml-1">
            {editorialLooks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('story')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'story'
              ? 'border-red-500 text-red-400 bg-red-950/10'
              : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>4. Marka Hikayesi</span>
        </button>
      </div>

      {/* TAB 1: HERO & SLIDER */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-zinc-400">
              Anasayfanın en üstündeki video veya görsel slaytlarını düzenleyin, yeni slayt ekleyin.
            </p>
            <button
              type="button"
              onClick={handleAddSlide}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-red-500" />
              <span>Yeni Slayt Ekle</span>
            </button>
          </div>

          <div className="space-y-6">
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="bg-[#121218] border border-zinc-800 p-5 rounded-lg space-y-4 font-mono text-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-950 border border-red-800 text-red-400 font-bold px-2 py-0.5 text-[11px] rounded">
                      SLAYT #{idx + 1}
                    </span>
                    <span className="text-zinc-400 font-semibold">{slide.city || 'İSTANBUL'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSlide(idx)}
                    className="p-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 hover:text-white rounded transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Slaytı Sil</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Media Preview & Upload (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <label className="block text-zinc-400 uppercase text-[11px] font-bold">
                      Medya Önizleme & Yükleme
                    </label>

                    <div className="relative aspect-video bg-zinc-950 border border-zinc-800 rounded overflow-hidden flex items-center justify-center">
                      {slide.type === 'video' ? (
                        <video
                          src={slide.src}
                          poster={slide.poster}
                          controls
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={slide.src}
                          alt="Hero slide"
                          fill
                          sizes="400px"
                          className="object-cover"
                          unoptimized={slide.src.startsWith('/uploads/') || slide.src.startsWith('http')}
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={slide.type}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].type = e.target.value as 'video' | 'image';
                          setHeroSlides(updated);
                        }}
                        className="bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:outline-none focus:border-red-500 text-xs"
                      >
                        <option value="video">Video (MP4/WebM)</option>
                        <option value="image">Görsel (WebP/JPG)</option>
                      </select>

                      <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 py-2 px-3 text-zinc-300 hover:text-white transition-colors">
                        <UploadCloud className="w-4 h-4 text-red-500" />
                        <span>
                          {uploadingTarget === `hero-${idx}`
                            ? 'Yükleniyor...'
                            : 'Bilgisayardan Yükle'}
                        </span>
                        <input
                          type="file"
                          accept={slide.type === 'video' ? 'video/mp4,video/webm' : 'image/*'}
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(
                                e.target.files[0],
                                (newUrl) => {
                                  const updated = [...heroSlides];
                                  updated[idx].src = newUrl;
                                  setHeroSlides(updated);
                                },
                                `hero-${idx}`
                              );
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <span className="text-[10px] text-zinc-500">Doğrudan Medya Yolu:</span>
                      <input
                        type="text"
                        value={slide.src}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].src = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="/videos/hero-night-city.webm"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-300 focus:outline-none focus:border-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* Texts & Config (7 cols) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                        Şehir / Başlık Konumu
                      </label>
                      <input
                        type="text"
                        value={slide.city}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].city = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="İSTANBUL"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                        GPS Koordinatı
                      </label>
                      <input
                        type="text"
                        value={slide.coordinates}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].coordinates = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="41.0082° N, 28.9784° E"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:border-red-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                        Üst Rozet (Badge) Metni
                      </label>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].badge = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="SOKAK MODASI YENİDEN TANIMLANDI"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:border-red-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                        Ana Başlık (Headline)
                      </label>
                      <input
                        type="text"
                        value={slide.headline || ''}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].headline = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="BAGGY STREET (Boş bırakılırsa ana logo gösterilir)"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:border-red-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                        Alt Slogan (Tagline)
                      </label>
                      <input
                        type="text"
                        value={slide.tagline}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].tagline = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="Aynı Şehir, Farklı Bakış Açısı"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                        Buton Metni (CTA)
                      </label>
                      <input
                        type="text"
                        value={slide.ctaText}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].ctaText = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="HEMEN KEŞFET"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:border-red-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                        Buton Hedef Linki
                      </label>
                      <input
                        type="text"
                        value={slide.ctaLink}
                        onChange={(e) => {
                          const updated = [...heroSlides];
                          updated[idx].ctaLink = e.target.value;
                          setHeroSlides(updated);
                        }}
                        placeholder="/shop"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSaveTab('hero')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Hero Slider Değişikliklerini Kaydet</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENT BAR */}
      {activeTab === 'announcement' && (
        <div className="bg-[#121218] border border-zinc-800 p-6 rounded-lg space-y-6 font-mono text-xs max-w-3xl">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase">
                Üst Duyuru & Kayan Yazı Çubuğu
              </h3>
              <p className="text-zinc-500 text-[11px] mt-0.5">
                Header üstünde yer alan duyuru barı metinleri ve kampanya linki
              </p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={announcement.enabled}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, enabled: e.target.checked })
                }
                className="w-4 h-4 accent-red-600 rounded"
              />
              <span className="text-zinc-300 font-bold uppercase text-[11px]">
                {announcement.enabled ? 'Aktif (Göster)' : 'Pasif (Gizle)'}
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                Ana Duyuru Metni (Kargo / Kampanya)
              </label>
              <input
                type="text"
                value={announcement.text}
                onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
                placeholder="2.000 TL ÜZERİ TÜM TÜRKİYE'YE ÜCRETSİZ KARGO"
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                İkincil Drop / Sezon Bilgisi
              </label>
              <input
                type="text"
                value={announcement.subtext}
                onChange={(e) => setAnnouncement({ ...announcement, subtext: e.target.value })}
                placeholder="YENİ DROP: ISTANBUL DRILL 2026"
                className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                  Yönlendirme Link Metni
                </label>
                <input
                  type="text"
                  value={announcement.linkText}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, linkText: e.target.value })
                  }
                  placeholder="ŞİMDİ KEŞFET →"
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                  Yönlendirme URL
                </label>
                <input
                  type="text"
                  value={announcement.linkUrl}
                  onChange={(e) => setAnnouncement({ ...announcement, linkUrl: e.target.value })}
                  placeholder="/shop"
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 focus:outline-none focus:border-red-500 text-xs"
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="pt-4 border-t border-zinc-800">
              <label className="block text-zinc-500 uppercase text-[10px] mb-2">
                Canlı Önizleme:
              </label>
              <div className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs py-2 px-4 flex items-center justify-center gap-3 text-center">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>{announcement.text}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{announcement.subtext}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-white underline ml-1 font-bold">
                  {announcement.linkText}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSaveTab('announcement')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Duyuru Ayarlarını Kaydet</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: EDITORIAL LOOKBOOK */}
      {activeTab === 'editorial' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-zinc-400">
              Editöryal sayfasındaki ve anasayfa çekimlerindeki fotoğraf/video kartlarını yönetin.
            </p>
            <button
              type="button"
              onClick={handleAddEditorialLook}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-red-500" />
              <span>Yeni Editöryal Kart Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {editorialLooks.map((look, idx) => (
              <div
                key={look.id || idx}
                className="bg-[#121218] border border-zinc-800 p-5 rounded-lg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                    <span className="bg-red-950 border border-red-800 text-red-400 font-bold px-2 py-0.5 text-[11px] rounded">
                      {look.frameNo || `FRAME [0${idx + 1}/07]`}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEditorialLook(idx)}
                      className="p-1 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Media & Upload */}
                  <div className="space-y-2">
                    <div className="relative aspect-[4/3] bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
                      {look.mediaType === 'video' ? (
                        <video
                          src={look.mediaSrc}
                          controls
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={look.mediaSrc}
                          alt={look.title}
                          fill
                          sizes="350px"
                          className="object-cover"
                          unoptimized={look.mediaSrc.startsWith('/uploads/') || look.mediaSrc.startsWith('http')}
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 py-1.5 px-2 text-zinc-300 text-[11px]">
                        <UploadCloud className="w-3.5 h-3.5 text-red-500" />
                        <span>
                          {uploadingTarget === `look-${idx}`
                            ? 'Yükleniyor...'
                            : 'Görsel/Video Yükle'}
                        </span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(
                                e.target.files[0],
                                (newUrl) => {
                                  const updated = [...editorialLooks];
                                  updated[idx].mediaSrc = newUrl;
                                  if (newUrl.endsWith('.mp4') || newUrl.endsWith('.webm')) {
                                    updated[idx].mediaType = 'video';
                                  } else {
                                    updated[idx].mediaType = 'image';
                                  }
                                  setEditorialLooks(updated);
                                },
                                `look-${idx}`
                              );
                            }
                          }}
                        />
                      </label>

                      <input
                        type="text"
                        value={look.mediaSrc}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].mediaSrc = e.target.value;
                          setEditorialLooks(updated);
                        }}
                        placeholder="/images/brand/...webp"
                        className="flex-1 bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Kategori Filtresi
                      </label>
                      <select
                        value={look.category || 'all'}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].category = e.target.value as EditorialLook['category'];
                          setEditorialLooks(updated);
                        }}
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px] rounded"
                      >
                        <option value="all">Tüm Kombinler (all)</option>
                        <option value="hoodies">Hoodie & Üst Giyim (hoodies)</option>
                        <option value="bottoms">Eşofman & Denim (bottoms)</option>
                        <option value="night">Gece Çekimleri (night)</option>
                        <option value="video">Canlı Video / Reel (video)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Görsel Oranı (Aspect)
                      </label>
                      <select
                        value={look.aspect || 'aspect-[3/4]'}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].aspect = e.target.value;
                          setEditorialLooks(updated);
                        }}
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px] rounded"
                      >
                        <option value="aspect-[3/4]">Dikey Portre (3/4)</option>
                        <option value="aspect-[4/5]">Standart Moda (4/5)</option>
                        <option value="aspect-square">Kare (1/1)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={look.title}
                      onChange={(e) => {
                        const updated = [...editorialLooks];
                        updated[idx].title = e.target.value;
                        setEditorialLooks(updated);
                      }}
                      className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                      Açıklama / Alt Başlık
                    </label>
                    <textarea
                      rows={2}
                      value={look.subtitle}
                      onChange={(e) => {
                        const updated = [...editorialLooks];
                        updated[idx].subtitle = e.target.value;
                        setEditorialLooks(updated);
                      }}
                      className="w-full bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Konum / Şehir
                      </label>
                      <input
                        type="text"
                        value={look.location}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].location = e.target.value;
                          setEditorialLooks(updated);
                        }}
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Kamera Bilgisi
                      </label>
                      <input
                        type="text"
                        value={look.cameraInfo}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].cameraInfo = e.target.value;
                          setEditorialLooks(updated);
                        }}
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Model Ölçüleri
                      </label>
                      <input
                        type="text"
                        value={look.modelSpecs || ''}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].modelSpecs = e.target.value;
                          setEditorialLooks(updated);
                        }}
                        placeholder="Boy: 1.85 m • Beden: L"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Slogan / Alıntı
                      </label>
                      <input
                        type="text"
                        value={look.quote || ''}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].quote = e.target.value;
                          setEditorialLooks(updated);
                        }}
                        placeholder="Karanlık sokakların tavizsiz duruşu."
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Etiketler (Virgülle ayırın)
                      </label>
                      <input
                        type="text"
                        value={(look.tags || []).join(', ')}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].tags = e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean);
                          setEditorialLooks(updated);
                        }}
                        placeholder="DRILL, 460 GSM, HEAVY"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 uppercase text-[10px] mb-1">
                        Öne Çıkan Ürün Slug (Link)
                      </label>
                      <input
                        type="text"
                        value={look.featuredProductSlug}
                        onChange={(e) => {
                          const updated = [...editorialLooks];
                          updated[idx].featuredProductSlug = e.target.value;
                          setEditorialLooks(updated);
                        }}
                        placeholder="drill-logo-hoodie"
                        className="w-full bg-[#0a0a0e] border border-zinc-800 p-1.5 text-zinc-300 text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleSaveTab('editorial')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Editöryal Değişiklikleri Kaydet</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: BRAND STORY & MANIFESTO */}
      {activeTab === 'story' && (
        <div className="bg-[#121218] border border-zinc-800 p-6 rounded-lg space-y-6 font-mono text-xs max-w-4xl">
          <div className="pb-4 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase">
              Sokak Manifestosu & Marka Hikayesi
            </h3>
            <p className="text-zinc-500 text-[11px] mt-0.5">
              Anasayfa alt kısmındaki ve Hakkımızda sayfasındaki marka felsefesi metinleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                  Üst Rozet Metni
                </label>
                <input
                  type="text"
                  value={brandStory.badge}
                  onChange={(e) => setBrandStory({ ...brandStory, badge: e.target.value })}
                  placeholder="KURALLARI YIKAN SOKAK MODASI"
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                    Başlık Satır 1
                  </label>
                  <input
                    type="text"
                    value={brandStory.titleLine1}
                    onChange={(e) =>
                      setBrandStory({ ...brandStory, titleLine1: e.target.value })
                    }
                    placeholder="FROM ISTANBUL"
                    className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                    Başlık Satır 2
                  </label>
                  <input
                    type="text"
                    value={brandStory.titleLine2}
                    onChange={(e) =>
                      setBrandStory({ ...brandStory, titleLine2: e.target.value })
                    }
                    placeholder="TO THE WORLD"
                    className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                  1. Paragraf (Ana Felsefe)
                </label>
                <textarea
                  rows={4}
                  value={brandStory.paragraph1}
                  onChange={(e) =>
                    setBrandStory({ ...brandStory, paragraph1: e.target.value })
                  }
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                  2. Paragraf (Kumaş & Duruş)
                </label>
                <textarea
                  rows={4}
                  value={brandStory.paragraph2}
                  onChange={(e) =>
                    setBrandStory({ ...brandStory, paragraph2: e.target.value })
                  }
                  className="w-full bg-[#0a0a0e] border border-zinc-800 p-2.5 text-zinc-200 text-xs leading-relaxed"
                />
              </div>
            </div>

            {/* Right: Image & Specs */}
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase text-[11px] mb-1">
                  Hikaye Görseli
                </label>
                <div className="relative aspect-[4/3] bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
                  <Image
                    src={brandStory.image}
                    alt="Brand story"
                    fill
                    sizes="400px"
                    className="object-cover"
                    unoptimized={brandStory.image.startsWith('/uploads/') || brandStory.image.startsWith('http')}
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 py-2 px-3 text-zinc-300 text-xs">
                    <UploadCloud className="w-4 h-4 text-red-500" />
                    <span>
                      {uploadingTarget === 'story-img' ? 'Yükleniyor...' : 'Görsel Seç'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(
                            e.target.files[0],
                            (newUrl) => {
                              setBrandStory({ ...brandStory, image: newUrl });
                            },
                            'story-img'
                          );
                        }
                      }}
                    />
                  </label>

                  <input
                    type="text"
                    value={brandStory.image}
                    onChange={(e) => setBrandStory({ ...brandStory, image: e.target.value })}
                    className="flex-1 bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase text-[11px] mb-2">
                  Kumaş & Özellik Rozetleri
                </label>
                <div className="space-y-2">
                  {brandStory.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-zinc-500 text-[10px]">#{idx + 1}</span>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...brandStory.stats];
                          updated[idx].label = e.target.value;
                          setBrandStory({ ...brandStory, stats: updated });
                        }}
                        className="flex-1 bg-[#0a0a0e] border border-zinc-800 p-2 text-zinc-200 text-xs font-bold"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              onClick={() => handleSaveTab('story')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Marka Hikayesini Kaydet</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
