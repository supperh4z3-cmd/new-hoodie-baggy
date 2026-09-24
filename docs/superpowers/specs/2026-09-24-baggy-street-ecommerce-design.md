# Design Spec: BAGGY STREET Multi-Page E-Commerce Web Platform

- **Date:** 2026-09-24
- **Project:** BAGGY STREET (Amsterdam & Istanbul Streetwear / Drill Aesthetic)
- **Status:** Draft / Ready for Review

---

## 1. Executive Summary & Vision

BAGGY STREET is a production-grade, mobile-first, high-fashion streetwear e-commerce platform blending Amsterdam street culture with Istanbul urban life. Unlike standard e-commerce templates, it functions as an editorial digital fashion magazine with a dark, cinematic, drill-inspired aesthetic.

Key brand and design anchors confirmed with the user:
- **Logo Style:** Authentic raw graffiti lettering ("BAGGY STREET") inspired by street culture and the reference image. No four-pointed star amblem.
- **Geographic & Cultural Context:** Turkey / Istanbul coordinates (`41.0082° N, 28.9784° E ISTANBUL`), TL currency (`₺`), and local logistics (e.g. Free shipping above 2.000 TL).
- **Scope:** Multi-page architecture including Homepage (`/`), Catalog/Shop (`/shop`, `/category/[slug]`), Product Detail (`/product/[slug]`), Interactive Cart Drawer + Full Cart Page (`/cart`), and Brand Story (`/about`).

---

## 2. Technology Stack & Architecture

- **Framework:** Next.js (App Router, Server Components + selective Client Components)
- **Language:** TypeScript (Strict typing)
- **Styling:** Tailwind CSS + custom design tokens (dark monochrome, film grain overlay, glassmorphism)
- **Icons:** Lucide React
- **Animations & Micro-interactions:** Framer Motion (page transitions, image scale reveals, drawer slide-in, cart badges)
- **State Management:** Zustand with `localStorage` persistence for Cart and Wishlist
- **Data Layer:** Modular mock data provider (`lib/data/products.ts`) prepared for seamless Supabase PostgreSQL migration

---

## 3. Information Architecture & Multi-Page Routes

### 3.1. Homepage (`/`)
Built with reference to `home-page-referance.jpeg`:
1. **Announcement Bar:** Marquee ticker: *"2.000 TL ÜZERİ TÜM TÜRKİYE'YE ÜCRETSİZ KARGO — YENİ DROP: ISTANBUL DRILL 2026"*.
2. **Sticky Header:**
   - Left: Mobile hamburger menu, links: SHOP, COLLECTIONS, ABOUT
   - Center: Graffiti "BAGGY STREET" logo
   - Right: Search modal trigger, Wishlist, Cart Drawer trigger with live item count badge
3. **Hero Section:**
   - Cinematic night city visual with dark street models wearing baggy drill cuts
   - Overlays: `41.0082° N, 28.9784° E ISTANBUL`, *"STREETWEAR REDEFINED"*, *"Same City Different Mindset"*
   - Center graffiti "BAGGY STREET" typography
   - Breadcrumb categories: `HOODIES / SWEATPANTS / JACKETS / JEANS / ACCESSORIES`
   - Primary CTA: *"SHOP NOW →"* leading to `/shop`
4. **Category Grid (5 Columns on Desktop, 2 on Mobile):**
   - HOODIES ("SHOP NOW →")
   - SWEATPANTS ("SHOP NOW →")
   - JACKETS ("SHOP NOW →")
   - JEANS ("SHOP NOW →")
   - ACCESSORIES ("SHOP NOW →")
   - Hover zoom and dark vignette effects
5. **Brand Story Editorial ("FROM ISTANBUL TO THE WORLD"):**
   - Two-column layout: Left contains editorial manifesto and *"OUR STORY →"* button linking to `/about`.
   - Right contains atmospheric lookbook photography.
6. **Latest Drops / New Arrivals:**
   - Section title: "NEW ARRIVALS / LATEST DROPS" with "TÜM ÜRÜNLER →" link
   - Horizontal responsive product carousel featuring 5 flagship drops with "NEW" badges, prices in TL, and instant add-to-cart or quick view.
7. **The Drill Collection Split Editorial:**
   - Left: "THE DRILL COLLECTION — MORE THAN CLOTHES IT'S A LIFESTYLE. EXPLORE →"
   - Right: Grid of urban night underground photography and "ISTANBUL COLLECTION — SHOP NOW →".
8. **Footer:**
   - Brand manifesto, newsletter sign-up with email validation, quick links (Shop, Collections, About, Contact), social links (Instagram, TikTok, YouTube, Spotify), legal notices, and back-to-top button.

### 3.2. Shop / Catalog Page (`/shop` & `/category/[slug]`)
- Dynamic category filter tabs (All, Hoodies, Sweatpants, Jackets, Jeans, Accessories).
- Side/top filter bar: Size (S, M, L, XL, XXL), Color (Black, Washed Grey, Denim, Olive), Price range, Sort (Newest, Price: Low to High, Price: High to Low).
- URL-synchronized filters (`/shop?category=hoodies&size=XL&sort=newest`).
- Responsive 2-column (mobile) to 4-column (desktop) product grid.

### 3.3. Product Detail Page (`/product/[slug]`)
- Left: Multi-image thumbnail gallery with high-res active zoom view.
- Right: Sticky product info panel:
  - Product name, price in TL, installment options info
  - Color selector dots with tooltip names
  - Size selector pills (S, M, L, XL, XXL) with stock availability indicators
  - Size Guide modal trigger with centimeter measurements for oversized streetwear cuts
  - Quantity counter + "SEPETE EKLE" (Add to Cart) primary button
  - Accordion sections:
    - Kumaş & Materyal (%100 Ağır French Terry Pamuk, 460 GSM)
    - Kalıp & Beden Bilgisi (Boxy / Oversized fit)
    - Yıkama & Bakım (30°C Ters Çevirerek Yıkayınız)
    - Kargo & İade (Yurtiçi Kargo 2-4 gün, 14 gün ücretsiz iade)
  - Related Drops ("Bunu Alanlar Şunları da İnceledi") recommendation carousel.

### 3.4. Slide-out Cart Drawer & Full Cart (`/cart`)
- Accessible anywhere in the application via header cart button.
- Slide-over backdrop with smooth spring animation.
- Dynamic free shipping progress bar ("Ücretsiz kargo için 450 TL daha ekleyin" / "Tebrikler! Kargonuz Ücretsiz").
- Cart item listing: image, title, selected size/color, quantity adjuster, remove action.
- Coupon code input field with discount calculation.
- Subtotal, shipping fee, total calculation, and "Siparişi Tamamla" checkout button.

### 3.5. Brand Story Page (`/about`)
- Editorial lookbook tracing the fusion of Amsterdam underground music & street culture with Istanbul's vibrant urban underground.
- High-res photography, design philosophy, quality standards.

---

## 4. Component Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── shop/
│   │   └── page.tsx
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── BrandStory.tsx
│   │   ├── LatestDrops.tsx
│   │   └── DrillEditorial.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── SizeGuideModal.tsx
│   │   └── RelatedProducts.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItemRow.tsx
│   │   └── FreeShippingBar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── Accordion.tsx
├── lib/
│   ├── data/
│   │   ├── products.ts
│   │   └── categories.ts
│   ├── store/
│   │   └── useCartStore.ts
│   └── types/
│       └── ecommerce.ts
```

---

## 5. Visual Asset Plan

Custom, ultra-high-resolution dark drill streetwear photography will be generated and placed in `public/images/`:
1. `hero-bg.webp`: High-impact cinematic night street/urban scene with drill models wearing baggy clothes.
2. `hoodies-cat.webp`, `sweatpants-cat.webp`, `jackets-cat.webp`, `jeans-cat.webp`, `accessories-cat.webp`: Category visual cards matching the 5 cards from `home-page-referance.jpeg`.
3. `brand-story.webp`: Editorial couple in urban streets.
4. Product packshots:
   - `drill-logo-hoodie.webp`
   - `baggy-sweatpants.webp`
   - `zip-hoodie-jacket.webp`
   - `wide-leg-jeans.webp`
   - `knit-cardigan.webp`
5. `drill-collection-1.webp`, `drill-collection-2.webp`: Underground tunnel and night lifestyle imagery.

---

## 6. Verification & Quality Gates

1. **Multi-Page Navigation Test:** Verify all links (`/`, `/shop`, `/category/hoodies`, `/product/[slug]`, `/cart`, `/about`) load without 404s.
2. **Cart Interactivity Test:** Add product from home carousel and PDP -> ensure Cart Drawer opens, item shows with correct size/color, quantity changes recalculate total and free shipping bar, state survives page reloads.
3. **Filter Sync Test:** Verify URL params update when switching categories or sizes on `/shop`.
4. **Responsive Verification:** Test at 375px (mobile), 768px (tablet), and 1440px (desktop) using Chrome DevTools/browser subagent.
5. **Aesthetics & Spec Compliance:** Contrast ratios, dark mode hierarchy, smooth transitions, authentic graffiti branding without four-pointed star.
