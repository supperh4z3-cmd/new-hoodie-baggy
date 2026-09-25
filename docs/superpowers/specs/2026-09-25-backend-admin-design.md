# BAGGY STREET — Backend & Admin Paneli Mimari Şartnamesi (Spec)

**Tarih:** 25 Eylül 2026  
**Durum:** Onaylandı (Yaklaşım 1)  
**Teknoloji Yığını:** Next.js 16 (App Router, Turbopack), React 19, Prisma ORM, SQLite, Jose JWT, TailwindCSS v4, Lucide Icons, Zustand  

---

## 1. Genel Bakış ve Amaç
Bu şartname, BAGGY STREET e-ticaret platformuna tam teşekküllü, tip güvenli (type-safe) ve modüler bir backend veritabanı altyapısı ile karanlık brutalist drill tasarımına sahip bir **Admin Yönetim Paneli (`/admin`)** kazandırma mimarisini tanımlar.

Platformun vitrin (storefront) tarafında mevcut olan yüksek görsel kalite, hızlı arama, sepet ve ödeme akışı korunurken; siparişlerin, kargo süreçlerinin, ürün kataloglarının ve kuponların gerçek bir ilişkisel veritabanında saklanması ve yönetici paneli üzerinden anlık kontrol edilmesi sağlanır.

---

## 2. Mimari Yapı (Approach 1)

```
[Müşteri Vitrini (Storefront)]              [Admin Yönetim Paneli (/admin)]
   /shop, /checkout, /account                     /admin/orders, /admin/products, /admin/coupons
           │                                                │
           ▼                                                ▼
   [Public API Handlers]                        [Protected Admin API Handlers]
   POST /api/orders                                GET/PATCH /api/admin/orders
   GET /api/orders/[code]                          GET/POST/PATCH /api/admin/products
   POST /api/coupons/validate                      GET/POST/DELETE /api/admin/coupons
           │                                                │
           └───────────────────────┬────────────────────────┘
                                   │
                                   ▼
                         [Prisma ORM Client]
                         (src/lib/prisma.ts)
                                   │
                                   ▼
                         [SQLite Veritabanı]
                         (prisma/dev.db)
```

### Temel Prensipler:
1. **Sıfır Dış Servis Bağımlılığı (Zero-Config):** SQLite kullanılarak yerel ortamda ek bir sunucuya/docker'a ihtiyaç duyulmadan derhal çalışır.
2. **Kolay Taşınabilirlik (Cloud Ready):** `prisma/schema.prisma` dosyasındaki provider `postgresql` olarak değiştirildiğinde veritabanı kesintisiz Supabase, Neon veya Railway'e aktarılabilir.
3. **Güvenlik Odaklı Oturum:** Admin oturumları HTTP-Only, Secure, SameSite korumalı imzalı JWT çerezleri ile saklanır. Next.js `middleware.ts` ile yetkisiz `/admin` erişimleri engellenir.

---

## 3. Veritabanı Şeması (Prisma Schema)

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model AdminUser {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  role         String    @default("SUPER_ADMIN")
  lastLoginAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model Product {
  id               String             @id @default(cuid())
  slug             String             @unique
  name             String
  price            Float
  compareAtPrice   Float?
  category         String
  categoryName     String
  description      String
  shortDescription String
  badge            String?
  isFeatured       Boolean            @default(false)
  images           String             // JSON string: string[]
  colors           String             // JSON string: string[]
  details          ProductDetails?
  stocks           ProductSizeStock[]
  orderItems       OrderItem[]
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt
}

model ProductDetails {
  id        String   @id @default(cuid())
  productId String   @unique
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  material  String
  fit       String
  care      String
  origin    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ProductSizeStock {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  size      String   // "S", "M", "L", "XL", "XXL"
  stock     Int      @default(10)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([productId, size])
}

model Order {
  id             String      @id @default(cuid())
  code           String      @unique // "BS-XXXXXX"
  customerName   String
  email          String
  phone          String
  city           String
  district       String
  address        String
  zipCode        String?
  orderNotes     String?
  paymentMethod  String      // "credit-card", "eft", "cod"
  status         String      @default("PENDING") // PENDING, PREPARING, SHIPPED, DELIVERED, CANCELLED
  trackingNumber String?     // Yurtiçi Kargo takip no
  carrier        String      @default("Yurtiçi Kargo")
  subtotal       Float
  discountAmount Float       @default(0)
  shippingFee    Float       @default(0)
  codFee         Float       @default(0)
  finalTotal     Float
  items          OrderItem[]
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String?
  product   Product? @relation(fields: [productId], references: [id], onDelete: SetNull)
  name      String
  size      String
  color     String
  quantity  Int
  price     Float
  image     String
  createdAt DateTime @default(now())
}

model Coupon {
  id              String    @id @default(cuid())
  code            String    @unique // "BAGGY10", "DRILL20"
  discountPercent Float
  minSubtotal     Float     @default(0)
  maxUses         Int?
  usedCount       Int       @default(0)
  isActive        Boolean   @default(true)
  expiresAt       DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

---

## 4. Kimlik Doğrulama & Güvenlik Mimarisi

* **Giriş Rotası:** `/admin/login`
* **JWT İmzası:** `jose` kütüphanesi kullanılarak `.env` dosyasındaki `ADMIN_JWT_SECRET` ile HS256 standardında imzalanır.
* **Oturum Çerezi (Cookie):**
  * Adı: `baggy_admin_token`
  * `httpOnly: true` (JavaScript tarafından okunamaz, XSS bağışık)
  * `secure: process.env.NODE_ENV === "production"`
  * `sameSite: "lax"`
  * `maxAge: 60 * 60 * 24 * 7` (7 gün geçerlilik)
* **Next.js Middleware (`src/middleware.ts`):**
  * `/admin/*` yollarını yakalar (hariç: `/admin/login`, `/api/auth/login`).
  * Token geçerli değilse veya yoksa kullanıcıyı anında `/admin/login` sayfasına yönlendirir.

---

## 5. API Uç Noktaları (Route Handlers)

### Kimlik Doğrulama
* `POST /api/auth/login`: Admin e-posta ve şifre kontrolü yapar, JWT cookie tanımlar.
* `POST /api/auth/logout`: Çerezi temizler.
* `GET /api/auth/me`: Oturum durumunu döner.

### Genel Bakış & Analitik
* `GET /api/admin/analytics`:
  * Toplam Ciro (₺), Toplam Sipariş Adedi, Ortalama Sepet Tutarı (AOV).
  * Bekleyen ve Kargolanan sipariş sayıları.
  * Kritik stok listesi (stoku 5'ten az olan bedenler).
  * Son 10 sipariş.

### Sipariş Yönetimi
* `GET /api/admin/orders`: Sayfalanmış ve filtrelenebilir (durum, arama) sipariş listesi.
* `GET /api/admin/orders/[id]`: Tekil sipariş detayları ve ürün dökümü.
* `PATCH /api/admin/orders/[id]`: Sipariş durumunu güncelleme (`status`), kargo takip no girme (`trackingNumber`).

### Ürün & Stok Yönetimi
* `GET /api/admin/products`: Tüm ürünler ve beden stokları.
* `POST /api/admin/products`: Yeni ürün oluşturma + beden stoklarını kaydetme.
* `PATCH /api/admin/products/[id]`: Fiyat, indirimli fiyat, rozet veya beden stoklarını güncelleme.
* `DELETE /api/admin/products/[id]`: Ürünü arşivleme / silme.

### Kupon Yönetimi
* `GET /api/admin/coupons`: Tanımlı kuponlar ve kullanım istatistikleri.
* `POST /api/admin/coupons`: Yeni kupon kodu oluşturma.
* `DELETE /api/admin/coupons/[id]`: Kupon silme / pasife alma.

### Vitrin Entegrasyon Uç Noktaları
* `POST /api/orders`: `/checkout` adımı tamamlandığında siparişi veritabanına yazar.
* `GET /api/orders/[code]`: `/order-tracking` ve `/account` sayfalarının doğrudan veritabanından güncel veriyi çekmesini sağlar.

---

## 6. Admin Panel UI / UX Tasarımı

* **Görsel Kimlik:** Baggy Street Brutalist Streetwear
  * Arka Plan: Derin siyah (`#09090c`) ve füme paneller (`#121218`).
  * Vurgu Renkleri: Crimson Kırmızı (`#ef4444`), Zümrüt Yeşili (Onay/Teslimat), Kehribar (Bekleyen).
  * Tipografi: Monospaced sayaçlar (`font-mono`), kalın sans-serif başlıklar.
* **Layout Mimarisi (`src/app/admin/layout.tsx`):**
  * Sol Menü (Sidebar): Marka Logosu, Dashboard, Siparişler (badge ile bekleyen sayısı), Ürünler & Stok, Kuponlar, Vitrine Git, Çıkış Yap.
  * Üst Bar: Aktif Sayfa Başlığı, Sistem Saati (İstanbul), Giriş Yapan Admin Rozeti.
  * Mobil Uyum: Mobilde tam uyumlu alt çekmece / hamburger navigasyon.

---

## 7. Tohumlama (Seed) & Geçiş Stratejisi
* Mevcut 10 parça (Drill Logo Hoodie, Heavy Baggy Sweats, Vintage Cargo Jeans, Flannel Shirt vb.) `prisma/seed.ts` scripti ile veritabanına otomatik aktarılır.
* Beden stokları varsayılan olarak (S: 15, M: 25, L: 40, XL: 20, XXL: 10) initialize edilir.
* Varsayılan admin kullanıcısı oluşturulur (`admin@baggystreet.com`).
