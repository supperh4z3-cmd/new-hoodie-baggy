# BAGGY STREET --- E-Commerce Web Platform

## Amsterdam Streetwear / Drill Aesthetic

> **Proje amacı:** Baggy Street için mobil öncelikli, yüksek
> performanslı, görsel olarak güçlü, animasyonlu ve gerçek satış
> altyapısına sahip modern bir e-ticaret platformu geliştirmek.

------------------------------------------------------------------------

# 1. Marka ve Tasarım Yönü

## Marka

**BAGGY STREET**

### Marka karakteri

-   Amsterdam street culture
-   Drill / underground / urban aesthetic
-   Premium ama ulaşılabilir
-   Erkek + kadın streetwear
-   Koyu, sinematik ve editorial görünüm
-   Siyah ana zemin
-   Beyaz / off-white tipografi
-   Kontrollü kırmızı vurgu
-   Gri, washed denim ve metalik tonlar
-   Graffiti, grain, concrete ve gece Amsterdam fotoğrafçılığı
-   Büyük tipografi
-   Güçlü ürün fotoğrafları
-   Minimal ama etkileyici UI

### Ürün kategorileri

-   Hoodies
-   Baggy Sweatpants / Eşofman
-   Cardigans / Hırkalar
-   Jeans
-   Jackets
-   T-Shirts
-   Accessories
-   Erkek
-   Kadın
-   New Arrivals
-   Collections

------------------------------------------------------------------------

# 2. Teknoloji Stack'i

## Frontend

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS

## UI

-   shadcn/ui
-   Radix UI
-   Lucide Icons

## Animasyon

-   GSAP
-   Framer Motion
-   ScrollTrigger

## Backend

Başlangıçta ayrı Express/NestJS backend oluşturma.

Next.js full-stack kullanılacak:

-   Server Actions
-   Route Handlers
-   Server Components
-   API endpoints gerektiğinde Route Handlers

## Database

**Supabase PostgreSQL**

Kullanılacak alanlar:

-   Products
-   Product variants
-   Categories
-   Collections
-   Inventory
-   Orders
-   Order items
-   Users
-   Addresses
-   Coupons
-   Reviews
-   Wishlists

## Authentication

-   Supabase Auth
-   Email/password
-   Google OAuth opsiyonel
-   Admin role sistemi

## Storage

Öncelik:

**Cloudflare R2**

Alternatif:

**Supabase Storage**

Ürün görselleri ve videolar doğrudan uygulama sunucusunda
tutulmamalıdır.

## Ödeme

Türkiye için:

-   iyzico
-   PayTR

Ödeme sistemi backend üzerinden güvenli şekilde çalışmalıdır.

Kart bilgileri uygulamanın kendi database'inde tutulmamalıdır.

## Hosting

-   Vercel
-   Cloudflare

## Email

-   Resend

Sipariş: - Sipariş alındı - Ödeme başarılı - Kargoya verildi - Sipariş
tamamlandı

e-postaları için kullanılabilir.

## Analytics

-   Google Analytics 4
-   Meta Pixel
-   Meta Conversion API ileride eklenebilir

------------------------------------------------------------------------

# 3. Genel Mimari

``` text
                    BAGGY STREET
                         |
                         v
              +----------------------+
              |       Next.js        |
              | React + TypeScript   |
              +----------+-----------+
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
      UI Layer       Server Layer    Animation
     Tailwind       Server Actions   GSAP/Motion
     shadcn         Route Handlers
                         |
                         v
                +----------------+
                |    Supabase    |
                |   PostgreSQL   |
                +-------+--------+
                        |
       +----------------+----------------+
       |                |                |
       v                v                v
   Products          Orders           Users
   Inventory         Payments         Auth
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
       iyzico          Resend       Kargo API
```

------------------------------------------------------------------------

# 4. Frontend Mimarisi

Next.js App Router kullanılacak.

Önerilen yapı:

``` text
app/
├── page.tsx
├── layout.tsx
├── loading.tsx
├── not-found.tsx
│
├── shop/
│   └── page.tsx
│
├── category/
│   └── [slug]/
│       └── page.tsx
│
├── collection/
│   └── [slug]/
│       └── page.tsx
│
├── product/
│   └── [slug]/
│       └── page.tsx
│
├── cart/
│   └── page.tsx
│
├── checkout/
│   └── page.tsx
│
├── account/
│   ├── page.tsx
│   ├── orders/
│   └── profile/
│
├── wishlist/
│   └── page.tsx
│
├── search/
│   └── page.tsx
│
├── about/
│   └── page.tsx
│
├── contact/
│   └── page.tsx
│
└── admin/
    ├── page.tsx
    ├── products/
    ├── orders/
    ├── customers/
    ├── inventory/
    ├── collections/
    └── coupons/
```

------------------------------------------------------------------------

# 5. Component Yapısı

``` text
components/
│
├── layout/
│   ├── Header.tsx
│   ├── MobileMenu.tsx
│   ├── Footer.tsx
│   └── AnnouncementBar.tsx
│
├── hero/
│   ├── Hero.tsx
│   ├── HeroVideo.tsx
│   └── HeroContent.tsx
│
├── products/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductGallery.tsx
│   ├── ProductInfo.tsx
│   ├── SizeSelector.tsx
│   ├── ColorSelector.tsx
│   └── AddToCart.tsx
│
├── collection/
│   ├── CollectionHero.tsx
│   └── CollectionGrid.tsx
│
├── cart/
│   ├── CartDrawer.tsx
│   ├── CartItem.tsx
│   └── CartSummary.tsx
│
├── animation/
│   ├── Reveal.tsx
│   ├── MagneticButton.tsx
│   ├── Marquee.tsx
│   └── ParallaxImage.tsx
│
└── ui/
    └── shadcn components
```

------------------------------------------------------------------------

# 6. Ana Sayfa

Ana sayfa sıradan bir e-commerce template gibi görünmemelidir.

## Bölüm 1 --- Fullscreen Hero

Amsterdam gece görüntüsü veya sinematik streetwear video.

İçerik:

``` text
BAGGY STREET

AMSTERDAM
STREET CULTURE

SHOP COLLECTION
```

CTA:

``` text
SHOP NOW →
```

Hero özellikleri:

-   Full viewport
-   Responsive video
-   Dark overlay
-   Hafif film grain
-   Mouse parallax desktop
-   Mobilde performans dostu statik poster
-   Büyük typography
-   GSAP reveal

------------------------------------------------------------------------

# 7. Announcement Bar

Örnek:

``` text
FREE SHIPPING OVER 2000 TL
```

veya:

``` text
NEW DROP — AUTUMN / WINTER 2026
```

Marquee animasyonu kullanılabilir.

Mobilde içerik taşmamalıdır.

------------------------------------------------------------------------

# 8. Category Section

5 ana kategori:

``` text
HOODIES
SWEATPANTS
JACKETS
JEANS
ACCESSORIES
```

Her kategori:

-   Büyük görsel
-   Kısa başlık
-   SHOP NOW
-   Hover zoom
-   Dark overlay

Mobilde:

``` text
2 kolon
```

veya gerekli durumlarda tek kolon kullanılabilir.

------------------------------------------------------------------------

# 9. Brand Story

Başlık:

``` text
FROM AMSTERDAM
TO THE WORLD
```

Kısa marka hikayesi.

Görsel:

-   Amsterdam kanalları
-   Sokak
-   Bisiklet
-   Gece ışıkları
-   Modeller

Amaç klasik "About Us" bölümü değil, editorial moda dergisi hissidir.

------------------------------------------------------------------------

# 10. New Arrivals

Desktop:

``` text
5 ürün / yatay carousel
```

Mobil:

``` text
2 kolon
```

Product card:

-   Product image
-   New badge
-   Product name
-   Price
-   Color count
-   Quick add opsiyonel
-   Wishlist

------------------------------------------------------------------------

# 11. Drill Collection

Özel editorial section.

Örnek:

``` text
THE DRILL
COLLECTION

MORE THAN CLOTHES.
IT'S A LIFESTYLE.

EXPLORE →
```

Arka planda:

-   Amsterdam gece görüntüsü
-   Underground station
-   Concrete architecture
-   Streetwear modelleri

------------------------------------------------------------------------

# 12. Product Sayfası

Product URL:

``` text
/product/amsterdam-oversized-hoodie
```

İçerik:

-   Büyük ürün galerisi
-   Video
-   Ürün adı
-   Fiyat
-   Renk
-   Beden
-   Stok
-   Beden rehberi
-   Add to cart
-   Wishlist
-   Açıklama
-   Kumaş bilgisi
-   Bakım bilgisi
-   Shipping
-   Returns
-   Related products

Mobilde:

``` text
Görseller
↓
Ürün adı
↓
Fiyat
↓
Renk
↓
Beden
↓
Sepete ekle
↓
Accordion bilgiler
```

------------------------------------------------------------------------

# 13. Ürün Variant Sistemi

Her ürünün varyantları ayrı stoklanmalıdır.

Örnek:

``` text
Product:
Amsterdam Hoodie

Color:
Black

Sizes:
S
M
L
XL
XXL
```

Database:

``` text
product_variants

id
product_id
color
size
sku
price
stock
image
```

Stok kontrolü server-side yapılmalıdır.

Frontend'den gelen stok bilgisine güvenilmemelidir.

------------------------------------------------------------------------

# 14. Sepet

Sepet:

-   Add/remove
-   Quantity
-   Size
-   Color
-   Price
-   Total
-   Coupon
-   Shipping estimate

Mini cart drawer kullanılabilir.

Desktop:

``` text
Sağdan açılan Cart Drawer
```

Mobil:

``` text
Full screen Cart
```

------------------------------------------------------------------------

# 15. Checkout

Checkout mümkün olduğunca kısa olmalıdır.

Adımlar:

``` text
Contact
↓
Shipping
↓
Payment
↓
Confirmation
```

Türkiye için:

-   Ad soyad
-   Telefon
-   E-mail
-   İl
-   İlçe
-   Adres
-   Posta kodu

Ödeme provider üzerinden güvenli yapılmalıdır.

------------------------------------------------------------------------

# 16. Admin Panel

Admin paneli ayrı bir sistem gibi düşünülmeli.

Dashboard:

``` text
TOTAL SALES
ORDERS
PRODUCTS
LOW STOCK
CUSTOMERS
```

## Ürün yönetimi

Admin:

-   Ürün ekleyebilir
-   Ürün silebilir
-   Ürün düzenleyebilir
-   Görsel yükleyebilir
-   Video ekleyebilir
-   Fiyat değiştirebilir
-   Stok değiştirebilir
-   Kategori seçebilir
-   Collection seçebilir
-   SEO bilgisi girebilir

## Sipariş yönetimi

Status:

``` text
PENDING
PAID
PROCESSING
SHIPPED
DELIVERED
CANCELLED
REFUNDED
```

------------------------------------------------------------------------

# 17. Database Schema

Temel tablolar:

``` text
users
products
product_variants
categories
collections
inventory
orders
order_items
payments
addresses
coupons
coupon_usages
wishlists
wishlist_items
reviews
```

## Products

``` text
id
slug
name
description
short_description
base_price
compare_at_price
category_id
collection_id
brand
material
care
is_active
is_featured
created_at
updated_at
```

## Product Variants

``` text
id
product_id
sku
color
size
price
stock
image_url
created_at
updated_at
```

## Orders

``` text
id
user_id
order_number
status
payment_status
subtotal
shipping_cost
discount
total
shipping_address
created_at
updated_at
```

------------------------------------------------------------------------

# 18. SEO

Next.js metadata kullanılacak.

Her ürün:

``` text
Title
Description
Canonical
Open Graph
Twitter/X card
Structured data
```

Product schema:

``` text
Product
Offer
Brand
AggregateRating
```

URL'ler temiz olmalıdır:

``` text
/baggy-jeans
/drill-collection
/amsterdam-oversized-hoodie
```

Şunlardan kaçınılmalı:

``` text
/product?id=23891
/item/123
/product.php?id=45
```

------------------------------------------------------------------------

# 19. Performans

Bu proje görsel ağırlıklı olduğu için performans kritik.

Kurallar:

-   next/image kullanılacak
-   Lazy loading
-   Responsive image sizes
-   WebP / AVIF
-   Video compression
-   Mobile için ayrı düşük çözünürlüklü video
-   Hero video lazy loading stratejisi
-   Font sayısı minimum
-   Gereksiz JavaScript yüklenmeyecek
-   Client Component sadece gerektiğinde kullanılacak
-   Server Components varsayılan olacak

Hedef:

``` text
LCP < 2.5s
CLS < 0.1
INP < 200ms
```

Mümkün olduğunca iyi Core Web Vitals hedeflenmelidir.

------------------------------------------------------------------------

# 20. Mobil Öncelikli Tasarım

Önce:

``` text
375px
390px
412px
```

ekranlarda tasarlanmalıdır.

Sonra:

``` text
768px
1024px
1280px
1440px+
```

Desktop versiyona geçilmelidir.

Mobilde:

-   Touch-friendly buttons
-   Minimum 44px touch target
-   Sticky add-to-cart
-   Bottom navigation gerekirse
-   Horizontal product scroll
-   2-column product grid
-   Optimized images
-   Reduced motion desteği

------------------------------------------------------------------------

# 21. Animasyon Sistemi

Animasyonlar dekorasyon için değil, marka deneyimi için kullanılmalıdır.

## Kullanılabilecek animasyonlar

### Page transition

``` text
Black screen
→
Logo reveal
→
Page content
```

### Hero

``` text
Image scale 1.08
→
1.00
```

### Typography

``` text
clip-path reveal
```

### Product

``` text
image scale 1.02
→
1.00
```

### Scroll

``` text
parallax
fade
translate
```

### Marquee

``` text
BAGGY STREET — AMSTERDAM — DRILL — STREET CULTURE —
```

------------------------------------------------------------------------

# 22. Reduced Motion

Kullanıcının işletim sisteminde:

``` text
prefers-reduced-motion
```

aktifse ağır animasyonlar azaltılmalıdır.

Özellikle:

-   Parallax
-   Video hareketleri
-   Page transitions

azaltılmalıdır.

------------------------------------------------------------------------

# 23. Güvenlik

Kesinlikle:

-   Secret key frontend'e koyma
-   Payment secret client-side olmamalı
-   Supabase service role key browser'a gönderilmemeli
-   Admin route server-side korunmalı
-   Input validation
-   Zod validation
-   Rate limiting
-   CSRF / origin kontrolleri
-   Server-side authorization
-   SQL injection koruması
-   XSS koruması

Environment variables:

``` text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

PAYMENT_SECRET_KEY=

RESEND_API_KEY=

R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
```

Secret değerler GitHub'a kesinlikle gönderilmemelidir.

------------------------------------------------------------------------

# 24. Validation

Formlarda:

**Zod**

kullanılmalıdır.

Örneğin:

``` text
CheckoutSchema
ProductSchema
AddressSchema
CouponSchema
```

Frontend validation + server validation yapılmalıdır.

Sadece frontend validation yeterli değildir.

------------------------------------------------------------------------

# 25. State Management

Başlangıçta gereksiz global state kullanılmamalıdır.

Öneri:

-   Server state → Server Components
-   URL state → search/filter
-   Form state → React Hook Form
-   Validation → Zod
-   Cart → Zustand veya server-backed cart

Cart için uzun vadede database destekli yapı kullanılabilir.

Guest kullanıcılar için cookie/session tabanlı cart düşünülebilir.

------------------------------------------------------------------------

# 26. Search

Başlangıç:

PostgreSQL search.

Daha sonra ürün sayısı büyürse:

-   Algolia
-   Meilisearch
-   Typesense

gibi search engine kullanılabilir.

İlk sürümde Elasticsearch kurmak gereksizdir.

------------------------------------------------------------------------

# 27. Filtering

Shop sayfası:

``` text
Category
Size
Color
Price
Collection
Gender
Availability
```

Filtreler URL üzerinden tutulmalıdır.

Örneğin:

``` text
/shop?category=hoodies&color=black&size=xl
```

Bu SEO ve paylaşılabilir URL açısından daha kullanışlıdır.

------------------------------------------------------------------------

# 28. Wishlist

Üye kullanıcı:

``` text
♡
```

ile ürün kaydedebilir.

Database:

``` text
wishlists
wishlist_items
```

Guest kullanıcıda local storage kullanılabilir.

------------------------------------------------------------------------

# 29. Analytics Event Sistemi

Önemli eventler:

``` text
view_item
add_to_cart
remove_from_cart
begin_checkout
add_payment_info
purchase
search
view_collection
add_to_wishlist
```

Meta Pixel tarafında:

``` text
ViewContent
AddToCart
InitiateCheckout
Purchase
```

takip edilmelidir.

------------------------------------------------------------------------

# 30. Kargo Entegrasyonu

Kargo sistemi ileride API ile bağlanabilecek şekilde tasarlanmalıdır.

Sipariş:

``` text
PAID
↓
PROCESSING
↓
SHIPPED
↓
TRACKING NUMBER
↓
DELIVERED
```

Admin panelinde tracking number girilebilmelidir.

------------------------------------------------------------------------

# 31. Internationalization

İlk sürüm:

``` text
Türkçe
```

altyapısı hazırlanırken:

``` text
TR
EN
```

desteklenebilir.

İleride:

``` text
AR
DE
NL
```

eklenebilir.

Metinler component içine hardcode edilmemelidir.

------------------------------------------------------------------------

# 32. Accessibility

-   Semantic HTML
-   Alt text
-   Keyboard navigation
-   Focus states
-   Contrast
-   ARIA gerektiğinde
-   Screen reader desteği
-   Form label'ları
-   Button ve link ayrımı

Özellikle siyah arka plan + gri yazılarda kontrast kontrol edilmelidir.

------------------------------------------------------------------------

# 33. AI Coding Skills

Projeyi Claude Code / Antigravity / benzeri AI coding agent ile
geliştirirken aşağıdaki yetenekler/skill başlıkları kullanılmalıdır.

## 1. Next.js Expert

AI şu konularda uzmanlaşmalı:

-   App Router
-   Server Components
-   Server Actions
-   Route Handlers
-   Metadata API
-   Dynamic routes
-   Image optimization
-   Caching
-   Revalidation

## 2. React Expert

-   Component architecture
-   Hooks
-   Composition
-   Performance
-   Client/server boundary
-   State management

## 3. TypeScript Expert

-   Strict typing
-   Interfaces/types
-   Generics
-   Type-safe API
-   Database types

## 4. Tailwind CSS Expert

-   Responsive design
-   Mobile-first
-   Design tokens
-   Container system
-   Typography
-   Dark theme

## 5. GSAP / Motion Design

-   GSAP
-   ScrollTrigger
-   Timeline
-   Easing
-   Page transitions
-   Parallax
-   Reduced motion

## 6. Supabase Expert

-   PostgreSQL
-   Auth
-   Row Level Security
-   Storage
-   Database functions
-   Policies
-   Realtime gerektiğinde

## 7. E-Commerce Architecture

AI'ın:

-   Cart
-   Inventory
-   Orders
-   Payment
-   Coupons
-   Variants
-   Shipping

konularını bilmesi gerekir.

## 8. SEO Expert

-   Technical SEO
-   Metadata
-   Sitemap
-   Robots
-   Structured data
-   Product schema
-   Open Graph

## 9. Performance Expert

-   Core Web Vitals
-   Image optimization
-   Bundle optimization
-   Lazy loading
-   Server rendering
-   Caching

## 10. Security Expert

-   Authentication
-   Authorization
-   RLS
-   Input validation
-   Rate limiting
-   Secrets
-   Payment security

------------------------------------------------------------------------

# 34. AI Agent'a Verilecek Ana Talimat

AI coding agent'a şu çalışma prensibi verilmeli:

``` text
You are a senior full-stack e-commerce engineer and award-winning
digital fashion designer.

Build BAGGY STREET as a production-ready, mobile-first fashion
e-commerce platform.

Do not create a generic Shopify-style template.

The visual direction is:
Amsterdam street culture,
dark cinematic photography,
drill / underground aesthetics,
premium streetwear,
editorial fashion,
black / off-white / controlled red palette,
large typography,
high-quality product presentation.

Technology:
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
GSAP
Framer Motion
Supabase PostgreSQL
Supabase Auth
Cloudflare R2
Vercel

Architecture:
Use Next.js App Router.
Prefer Server Components.
Use Client Components only when interaction requires them.
Use Server Actions and Route Handlers for backend functionality.
Use strict TypeScript.
Use Zod for validation.

The website must be:
mobile-first,
responsive,
SEO-friendly,
accessible,
secure,
fast,
production-ready.

Never expose secret keys to the client.

Never trust client-side inventory values.

All sensitive operations must be validated server-side.

Do not create unnecessary dependencies.

Do not overuse animations.

Respect prefers-reduced-motion.

Use optimized images and videos.

Create reusable components instead of duplicating UI.

Before implementing major features, inspect the existing architecture and
reuse existing components where possible.

Do not rewrite working code unnecessarily.

Keep the code clean, modular and maintainable.
```

------------------------------------------------------------------------

# 35. AI Skill Dosyaları

Projede ayrıca bir `skills/` klasörü oluşturulabilir:

``` text
skills/
├── nextjs.md
├── react.md
├── typescript.md
├── tailwind.md
├── gsap.md
├── supabase.md
├── ecommerce.md
├── seo.md
├── performance.md
├── security.md
└── ui-ux.md
```

Her skill dosyası AI'a o alanın proje kurallarını anlatmalıdır.

Örnek:

``` text
skills/gsap.md

# GSAP Skill

Use GSAP for complex timeline and scroll-based animations.

Rules:
- Do not animate everything.
- Respect reduced motion.
- Avoid layout-triggering animations.
- Prefer transform and opacity.
- Kill ScrollTrigger instances when components unmount.
- Keep mobile animations lighter.
```

------------------------------------------------------------------------

# 36. Development Workflow

AI'a bütün projeyi tek prompt ile yaptırmak yerine aşamalı geliştirme
yapılmalıdır.

## Phase 1

Foundation:

-   Next.js
-   TypeScript
-   Tailwind
-   shadcn
-   Supabase
-   ESLint
-   Prettier

## Phase 2

Design system:

-   Colors
-   Typography
-   Spacing
-   Buttons
-   Cards
-   Header
-   Footer

## Phase 3

Homepage:

-   Hero
-   Categories
-   Story
-   New arrivals
-   Editorial sections
-   Footer

## Phase 4

Catalog:

-   Shop
-   Categories
-   Filters
-   Search
-   Pagination

## Phase 5

Product:

-   Product page
-   Variants
-   Gallery
-   Cart

## Phase 6

Authentication:

-   Register
-   Login
-   Account
-   Orders

## Phase 7

Checkout:

-   Address
-   Payment
-   Order creation
-   Confirmation

## Phase 8

Admin:

-   Dashboard
-   Product CRUD
-   Inventory
-   Orders
-   Collections

## Phase 9

Marketing:

-   SEO
-   Analytics
-   Meta Pixel
-   Sitemap
-   Structured data

## Phase 10

Optimization:

-   Mobile performance
-   Image optimization
-   Lighthouse
-   Security
-   Accessibility

------------------------------------------------------------------------

# 37. Git Workflow

Branch:

``` text
main
develop
feature/*
fix/*
```

Örnek:

``` text
feature/homepage
feature/product-page
feature/cart
feature/checkout
feature/admin
```

Commit örneği:

``` text
feat: add product variant system
feat: add mobile navigation
feat: add GSAP hero animation
fix: resolve mobile cart overflow
perf: optimize hero video loading
```

------------------------------------------------------------------------

# 38. Testing

En az:

-   Unit tests
-   Integration tests
-   E2E tests

kullanılmalı.

Öneri:

``` text
Vitest
Playwright
```

Özellikle şu akış E2E test edilmelidir:

``` text
Product
↓
Select size
↓
Add to cart
↓
Checkout
↓
Payment
↓
Order confirmation
```

------------------------------------------------------------------------

# 39. Production Checklist

Launch öncesi:

``` text
[ ] Mobile responsive
[ ] Tablet responsive
[ ] Desktop responsive
[ ] Product pages
[ ] Cart
[ ] Checkout
[ ] Payment
[ ] Order creation
[ ] Inventory
[ ] Admin
[ ] Authentication
[ ] SEO
[ ] Sitemap
[ ] Robots
[ ] Analytics
[ ] Meta Pixel
[ ] Image optimization
[ ] Video optimization
[ ] Error pages
[ ] Loading states
[ ] Empty states
[ ] Accessibility
[ ] Security
[ ] Rate limiting
[ ] Environment variables
[ ] Backup strategy
[ ] Payment test
[ ] Mobile checkout test
```

------------------------------------------------------------------------

# 40. Tasarımın Ana Prensibi

Baggy Street sitesi:

**"Bir ürün kataloğu değil, dijital bir streetwear dergisi gibi
hissettirmeli."**

Ama tasarım uğruna kullanılabilirlik kaybedilmemelidir.

Öncelik sırası:

``` text
1. Kullanılabilirlik
2. Mobil deneyim
3. Performans
4. Ürün sunumu
5. Marka kimliği
6. Animasyon
7. Görsel efekt
```

Animasyon hiçbir zaman:

-   ürünün görünmesini,
-   fiyatın okunmasını,
-   sepete eklemeyi,
-   checkout'u

zorlaştırmamalıdır.

------------------------------------------------------------------------

# 41. Final Stack

``` text
FRONTEND
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui

ANIMATION
GSAP
Framer Motion

BACKEND
Next.js Server Actions
Next.js Route Handlers

DATABASE
Supabase PostgreSQL

AUTH
Supabase Auth

STORAGE
Cloudflare R2

PAYMENT
iyzico / PayTR

EMAIL
Resend

HOSTING
Vercel

CDN / SECURITY
Cloudflare

ANALYTICS
GA4
Meta Pixel

TESTING
Vitest
Playwright

VALIDATION
Zod

STATE
Zustand when necessary

SEARCH
PostgreSQL initially
Meilisearch/Algolia later if needed
```

------------------------------------------------------------------------

# 42. En Önemli Kural

**İlk versiyonda gereksiz karmaşıklık oluşturma.**

Başlangıç mimarisi:

``` text
Next.js
    +
Supabase
    +
Cloudflare R2
    +
iyzico/PayTR
    +
Vercel
```

ile kurulmalıdır.

Trafik ve sipariş hacmi büyüdükçe:

``` text
Redis
Search Engine
Queue
Dedicated services
Advanced CDN
```

gibi sistemler eklenebilir.

Ama ilk günden mikroservis mimarisi kurmak Baggy Street için gereksiz
geliştirme maliyeti ve bakım yükü oluşturacaktır.
