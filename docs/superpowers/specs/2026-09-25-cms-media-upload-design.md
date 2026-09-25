# BAGGY STREET - CMS & Multi-Image Media Upload Design Spec

**Date:** 2026-09-25  
**Status:** In Review  
**Architecture Type:** Architectural (Media Upload Subsystem + Dynamic Site CMS)

---

## 1. Overview & Business Objectives

BAGGY STREET e-ticaret platformunda iki temel operasyonel yetkinlik sağlanacaktır:

1. **Ürünlerde Çoklu Görsel & Yerel Dosya Yükleme (Local Media Storage):**
   - Ürün eklerken ve düzenlerken sadece tek bir URL girmek yerine, kullanıcının bilgisayarından doğrudan sürükle-bırak veya dosya seçici ile **birden fazla görsel (1 ila 8 adet)** yükleyebilmesi.
   - Yüklenen dosyaların harici bir servise bağımlı kalmaksızın doğrudan proje bünyesinde (`public/uploads/products/`) saklanması.
   - Görseller arasında **"Kapak Görseli Yap"**, silme ve sıralama yönetimi.

2. **Tam Kapsamlı Site İçerik Yönetim Sistemi (CMS - `/admin/content`):**
   - Yönetim panelinden sitenin vitrinindeki tüm statik metin ve medya bloklarının dinamik olarak değiştirilebilmesi:
     - **Hero Slider:** Video/görsel dosyası yükleme veya URL girme, başlıklar, şehir ve koordinat rozetleri, alt sloganlar, CTA buton metin ve linkleri.
     - **Kayan Yazılar & Duyuru Çubuğu:** Üst bar duyurusu, indirim kuponu hatırlatmaları, kargo duyuruları ve linkler.
     - **Editöryal & Lookbook Sayfası:** Look kartları, video klip yükleme / reels linkleri, kamera/lokasyon künyeleri, manken bilgileri ve öne çıkan ürün eşleşmeleri.
     - **Marka Hikayesi:** Amsterdam ve İstanbul sokak manifestosu, başlıklar, istatistik rakamları ve görsel.

---

## 2. Mimari Tasarım & Veri Modeli

### 2.1. Prisma Schema Değişiklikleri (`prisma/schema.prisma`)

```prisma
model SiteSetting {
  key       String   @id // e.g. "hero_slides", "announcement_bar", "editorial_looks", "brand_story"
  value     String   // JSON stringified configuration data
  updatedAt DateTime @updatedAt
}
```

### 2.2. JSON Veri Yapıları (TypeScript Tipleri)

```typescript
// 1. Hero Slides
export interface HeroSlideCMS {
  id: string;
  type: "video" | "image";
  src: string;          // e.g. "/uploads/site/hero-night-1.webm" or URL
  poster?: string;
  coordinates: string;  // e.g. "41.0082° N, 28.9784° E"
  city: string;         // e.g. "İSTANBUL"
  badge: string;        // e.g. "2026 DRILL KOLEKSİYONU"
  headline: string;     // e.g. "SOKAKLARDAN DÜNYAYA"
  tagline: string;      // e.g. "Sıradan Kıyafetlerin Ötesinde Bir Yaşam Tarzı"
  ctaText: string;      // e.g. "YENİ DROP'U İNCELE"
  ctaLink: string;      // e.g. "/shop"
}

// 2. Announcement Bar & Ticker
export interface AnnouncementBarCMS {
  enabled: boolean;
  text: string;         // e.g. "2.000 TL ÜZERİ TÜM TÜRKİYE'YE ÜCRETSİZ KARGO"
  subText: string;      // e.g. "YENİ DROP: ISTANBUL DRILL 2026"
  linkText: string;     // e.g. "ŞİMDİ KEŞFET →"
  linkUrl: string;      // e.g. "/shop"
}

// 3. Editorial Look
export interface EditorialLookCMS {
  id: string;
  frameNo: string;      // e.g. "FRAME [01/07]"
  title: string;        // e.g. "UNDERGROUND TUNNEL DRILL"
  category: string;     // e.g. "hoodies" | "bottoms" | "night" | "video"
  subtitle: string;
  location: string;
  cameraInfo: string;
  modelSpecs: string;
  mediaType: "image" | "video";
  mediaSrc: string;     // e.g. "/uploads/site/look-1.webp" or video URL
  featuredProductSlug: string;
  quote?: string;
}

// 4. Brand Story
export interface BrandStoryCMS {
  title: string;
  subtitle: string;
  badge: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
}
```

---

## 3. Medya Yükleme Motoru (`/api/admin/upload`)

- **Protokol:** `POST /api/admin/upload` (Multipart/form-data)
- **Güvenlik:** Sadece admin oturumuna sahip kullanıcılar tarafından çağrılabilir (Admin JWT çerezi kontrol edilir).
- **Hedef Klasörler:**
  - `public/uploads/products/`
  - `public/uploads/site/`
- **Desteklenen Dosya Tipleri:**
  - Görseller: `image/jpeg`, `image/png`, `image/webp`, `image/avif`
  - Videolar: `video/mp4`, `video/webm`
- **İşlem Adımları:**
  1. Gelen `FormData` dosyasını `request.formData()` ile alır.
  2. Dosya uzantısını ve MIME tipini kontrol eder (güvenlik doğrulama).
  3. Benzersiz dosya adı oluşturur: `${Date.now()}-${safeName}.${ext}`.
  4. Node.js `fs/promises` ile hedef klasöre kaydeder (klasör yoksa `mkdir recursive` ile otomatik açılır).
  5. İstemciye erişilebilir web URL'sini döner:
     `{ success: true, url: "/uploads/products/1727281928-drill-hoodie.webp" }`.

---

## 4. Kullanıcı Arayüzü & Admin Bileşenleri

### 4.1. Çoklu Görsel Yükleyici (`MultiImageUploader.tsx`)
- Sürükle-bırak alanı veya *"Dosya Seç"* butonu.
- Çoklu dosya seçimi (`multiple`).
- Yüklenen görselleri önizleme kartları olarak sıralar.
- Her kartta:
  - **"KAPAK" Rozeti** (hangi görselin vitrinde ana kapak olduğunu belirtir).
  - **"Kapak Yap" butonu** (tek tıkla ana görseli değiştirir).
  - **"Sil" butonu** (görseli galeriden çıkarır).
- `ProductFormModal` ile doğrudan entegre olur.

### 4.2. Admin CMS Yönetim Paneli (`/admin/content`)
Sol sidebar menüsüne **"Site İçerikleri (CMS)"** bağlantısı eklenir (`Sliders` ikonu).
Sayfada 4 tab yer alır:
1. **Hero & Slider:**
   - Slayt kartları listesi (Yeni slayt ekleme / silme).
   - Video/Görsel yükleyici ve canlı önizleme.
   - Başlık, şehir, koordinat, buton metinleri düzenleme.
2. **Kayan Yazı & Duyuru:**
   - Üst duyuru barı metni, linki ve aktiflik toggle'ı.
3. **Editöryal & Lookbook:**
   - Lookbook kartları, video/resim yükleme, kamera bilgisi, manken ölçüleri ve ilişkili ürün slug'ı seçimi.
4. **Marka Hikayesi:**
   - Hikaye metinleri, başlıklar ve görsel yönetimi.
- Her sekmenin altında *"Değişiklikleri Kaydet"* butonu yer alır.

---

## 5. Vitrin Entegrasyonu (Storefront Integration)

- `GET /api/content`:
  - Vitrin sayfaları için genel ve optimize içerik API'si.
  - Veritabanındaki `SiteSetting` kayıtlarını çeker. Eğer veritabanında herhangi bir ayar henüz kaydedilmemişse, otomatik olarak varsayılan sabit değerlere (fallback) döner; bu sayede site hiçbir zaman boş görünmez veya çökmez.
- `HeroSection.tsx`, `AnnouncementBar.tsx`, `DrillEditorial.tsx`, `BrandStory.tsx` ve `src/app/editorial/page.tsx` bu API'den beslenir.

---

## 6. Doğrulama & Test Planı

1. **Medya Yükleme Testi:**
   - 1-5 adet ürün görseli yükleme ve dosyanın `public/uploads/products/` altında oluştuğunu doğrulama.
2. **Ürün Çoklu Görsel Testi:**
   - Yeni ürün oluştururken 3 görsel ekleyip birini kapak seçme; ürün detay sayfasında galerinin 3 görseli de gösterdiğini doğrulama.
3. **Hero Slider CMS Testi:**
   - Slider başlığını ve videosunu admin panelinden değiştirip anasayfada anında güncellendiğini doğrulama.
4. **Duyuru Barı & Editöryal CMS Testi:**
   - Duyuru barı metnini güncelleyip vitrinde doğrulama.
5. **Test & Build:**
   - `npm test`, `npm run lint` ve `npm run build` ile derleme doğrulaması.
