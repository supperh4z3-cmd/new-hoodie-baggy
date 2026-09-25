# BAGGY STREET - CMS & Multi-Image Media Upload Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a local multi-image file upload subsystem for product galleries and a comprehensive Site Content Management System (CMS) in `/admin/content` allowing dynamic control of Hero slider videos/texts, announcement bar tickers, editorial lookbook cards, and brand story.

**Architecture:** Next.js Route Handler multipart upload (`POST /api/admin/upload`) saving to `public/uploads/` on the local disk. Prisma `SiteSetting` model with JSON value storage and public `/api/content` endpoint. Interactive `MultiImageUploader` component in `ProductFormModal`, and a 4-tab Brutalist CMS console at `/admin/content`.

**Architecture Diagram:**

```mermaid
graph TD
    subgraph "Admin Media & Product Workflow"
        UPL[MultiImageUploader.tsx] -->|Multipart Upload| API_UPL[/api/admin/upload]
        API_UPL -->|Write File| DISK[(public/uploads/products/)]
        UPL -->|image + gallery JSON| PFM[ProductFormModal.tsx]
        PFM -->|Save Product| DB_PROD[(Product & Details & Sizes)]
    end

    subgraph "Admin CMS Deck"
        ADM_CMS[/admin/content] -->|GET / PUT| API_CMS[/api/admin/content]
        API_CMS -->|Store JSON Config| DB_SETT[(SiteSetting: hero, ticker, editorial, story)]
    end

    subgraph "Storefront Dynamic Consumption"
        PUB_API[/api/content] -->|Read DB with Fallback| DB_SETT
        PUB_API --> HERO[HeroSection.tsx]
        PUB_API --> ANNOUNCE[AnnouncementBar.tsx]
        PUB_API --> EDITORIAL[DrillEditorial.tsx & /editorial]
        PUB_API --> STORY[BrandStory.tsx]
    end
```

**Tech Stack:** Next.js 16.3.6 (Turbopack, App Router), React 19, Prisma ORM, SQLite, Node.js `fs/promises`, Lucide Icons, TailwindCSS.

**Spec:** [docs/superpowers/specs/2026-09-25-cms-media-upload-design.md](file:///Users/gorhanmfatih/Desktop/new-hoodie-baggy/docs/superpowers/specs/2026-09-25-cms-media-upload-design.md)

---

## Global Constraints

- Preserve existing storefront URLs and UX design aesthetics (`#09090c`, crimson red `#ef4444`, monospace font).
- Uploaded media must be stored locally in `public/uploads/products/` and `public/uploads/site/`.
- All uploads and CMS write endpoints must be authenticated via `ADMIN_COOKIE_NAME` JWT token.
- Storefront must always have seamless fallback to defaults if database settings are not yet populated.

---

### Task 1: Prisma Schema Update & Seeding for SiteSetting

**Files:**
- Modify: `prisma/schema.prisma`
- Modify: `prisma/seed.ts`

**Interfaces:**
- Produces: `prisma.siteSetting` model

- [ ] **Step 1: Update `prisma/schema.prisma`**
  Add the `SiteSetting` model:
  ```prisma
  model SiteSetting {
    key       String   @id // hero_slides, announcement_bar, editorial_looks, brand_story
    value     String   // JSON text
    updatedAt DateTime @updatedAt
  }
  ```

- [ ] **Step 2: Push database schema and regenerate client**
  Run: `npx prisma db push && npx prisma generate`
  Expected: Database synced with new `SiteSetting` table.

- [ ] **Step 3: Update `prisma/seed.ts` with initial CMS content**
  Add upserts for:
  - `hero_slides` (initial 3 video/image slides from `HeroSection.tsx`)
  - `announcement_bar` (free shipping text & drill drop link)
  - `editorial_looks` (initial lookbook cards from `src/app/editorial/page.tsx`)
  - `brand_story` (Amsterdam & Istanbul drill culture manifesto)

- [ ] **Step 4: Execute Seed Command**
  Run: `npx prisma db seed`
  Expected: "Seeded site settings for CMS".

- [ ] **Step 5: Commit**
  ```bash
  git add prisma/schema.prisma prisma/seed.ts
  git commit -m "feat(cms): add SiteSetting model and seed initial CMS default content"
  ```

---

### Task 2: Local Media Upload Engine (`POST /api/admin/upload`)

**Files:**
- Create: `src/app/api/admin/upload/route.ts`
- Test: `src/app/api/admin/upload/__tests__/upload.test.ts`

**Interfaces:**
- Produces: `POST /api/admin/upload` (returns `{ success: true, url: string, filename: string, size: number }`)

- [ ] **Step 1: Write file upload route handler**
  In `src/app/api/admin/upload/route.ts`:
  - Verify admin JWT cookie via `verifyAdminToken`.
  - Read `formData = await request.formData()`.
  - Get `file = formData.get('file') as File` and `folder = formData.get('folder') || 'products'`.
  - Validate MIME types (JPEG, PNG, WebP, AVIF, MP4, WebM). Max size 50MB.
  - Sanitize filename and prepend timestamp.
  - Ensure directory `public/uploads/${folder}` exists via `mkdir(..., { recursive: true })`.
  - Convert file to `Buffer` via `Buffer.from(await file.arrayBuffer())` and write to disk with `writeFile`.
  - Return `{ success: true, url: `/uploads/${folder}/${filename}`, filename, size: file.size }`.

- [ ] **Step 2: Test upload route via curl**
  Send test multipart request to `/api/admin/upload` and verify file is written to `public/uploads/products/`.

- [ ] **Step 3: Commit**
  ```bash
  git add src/app/api/admin/upload/
  git commit -m "feat(upload): implement local media file upload engine with mime validation and disk persistence"
  ```

---

### Task 3: Multi-Image Uploader Component & Product Form Integration

**Files:**
- Create: `src/components/admin/MultiImageUploader.tsx`
- Modify: `src/components/admin/ProductFormModal.tsx`
- Modify: `src/components/admin/StockEditorModal.tsx` (interface update)

**Interfaces:**
- Produces: `<MultiImageUploader value={images} onChange={(newImages, coverImage) => ...} />`

- [ ] **Step 1: Create `MultiImageUploader.tsx`**
  - Dropzone for drag-and-drop or file browsing.
  - Supports multiple file selection.
  - Sends each selected file to `POST /api/admin/upload` with `folder: 'products'`.
  - Displays thumbnail grid of uploaded images.
  - Visual badge: "KAPAK" on the primary cover image.
  - Action buttons per image: "Kapak Yap", "Sil", "Öne Al / Geri Al".
  - Manual URL entry fallback option.

- [ ] **Step 2: Integrate into `ProductFormModal.tsx`**
  - Replace the single image text input with `<MultiImageUploader>`.
  - When opening an existing product, parse `product.gallery` (or fallback to `[product.image]`).
  - Track `images` list and `coverImage`.
  - On submit, send `image: coverImage` and `gallery: images`.

- [ ] **Step 3: Test Product Form Multi-Image Flow**
  - Verify editing an existing product shows all gallery images.
  - Verify adding/uploading images updates gallery and cover image correctly in database.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/admin/MultiImageUploader.tsx src/components/admin/ProductFormModal.tsx
  git commit -m "feat(admin): build MultiImageUploader with local file upload, cover selection, and product gallery support"
  ```

---

### Task 4: Public & Admin Content API Handlers

**Files:**
- Create: `src/app/api/content/route.ts`
- Create: `src/app/api/admin/content/route.ts`

**Interfaces:**
- Produces:
  - `GET /api/content` (Public: `{ heroSlides, announcementBar, editorialLooks, brandStory }`)
  - `GET /api/admin/content` (Admin: full settings list)
  - `PUT /api/admin/content` (Admin: saves `{ key, value }`)

- [ ] **Step 1: Write `src/app/api/content/route.ts`**
  - Fetches all `SiteSetting` rows from Prisma.
  - Parses JSON values.
  - If a setting is missing, uses default fallback constants.
  - Returns `{ success: true, settings: { heroSlides, announcementBar, editorialLooks, brandStory } }`.

- [ ] **Step 2: Write `src/app/api/admin/content/route.ts`**
  - Guards with admin authentication.
  - `GET`: Returns current site settings.
  - `PUT`: Accepts `{ key, value }`, upserts into `prisma.siteSetting`.

- [ ] **Step 3: Verify content APIs via curl**
  - Verify GET returns initialized default settings.
  - Verify PUT updates setting.

- [ ] **Step 4: Commit**
  ```bash
  git add src/app/api/content/route.ts src/app/api/admin/content/route.ts
  git commit -m "feat(cms): create public and admin content API route handlers with fallback safety"
  ```

---

### Task 5: Admin CMS UI Deck (`/admin/content`)

**Files:**
- Create: `src/app/admin/content/page.tsx`
- Modify: `src/components/admin/AdminSidebar.tsx`
- Modify: `src/app/admin/layout.tsx`

**Interfaces:**
- Produces: `/admin/content` page with 4 tabs

- [ ] **Step 1: Add CMS Link to `AdminSidebar.tsx`**
  - Add `{ name: 'Site İçerikleri (CMS)', href: '/admin/content', icon: SlidersHorizontal }`.
  - Update `AdminLayout.tsx` header title to show "SİTE İÇERİK YÖNETİMİ (CMS)" on `/admin/content`.

- [ ] **Step 2: Build `src/app/admin/content/page.tsx`**
  - Tab 1: **Hero & Slider**
    - List of slides with video/image preview, file upload button (`folder: 'site'`), city, headline, badge, and CTA link inputs.
    - Add new slide / Delete slide buttons.
  - Tab 2: **Kayan Yazı & Duyuru**
    - Top bar text, subtext, link text/URL, active toggle.
  - Tab 3: **Editöryal & Lookbook**
    - Cards editor: Title, location, camera specs, media upload (image/video), quote, featured product slug select dropdown.
  - Tab 4: **Marka Hikayesi & Manifesto**
    - Manifesto title, subtitle, paragraphs, stat counters, and brand image upload.
  - "Değişiklikleri Kaydet" button per tab calling `PUT /api/admin/content`.

- [ ] **Step 3: Commit**
  ```bash
  git add src/app/admin/content/page.tsx src/components/admin/AdminSidebar.tsx src/app/admin/layout.tsx
  git commit -m "feat(admin): build 4-tab Site Content Management System (CMS) console"
  ```

---

### Task 6: Storefront Dynamic CMS Integration & Verification

**Files:**
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/layout/AnnouncementBar.tsx`
- Modify: `src/components/home/DrillEditorial.tsx`
- Modify: `src/components/home/BrandStory.tsx`
- Modify: `src/app/editorial/page.tsx`

**Interfaces:**
- Storefront components dynamically consume `/api/content` data.

- [ ] **Step 1: Connect `HeroSection.tsx`**
  - Fetch `/api/content` on mount, set dynamic `slides` (fallback to `HERO_SLIDES`).
- [ ] **Step 2: Connect `AnnouncementBar.tsx`**
  - Fetch `/api/content` on mount, render dynamic announcement text and link.
- [ ] **Step 3: Connect `DrillEditorial.tsx` & `src/app/editorial/page.tsx`**
  - Fetch `/api/content` on mount, render dynamic lookbook cards and video clips.
- [ ] **Step 4: Connect `BrandStory.tsx`**
  - Fetch `/api/content` on mount, render dynamic manifesto text.

- [ ] **Step 5: Run Full Verification Suite**
  - Run `npm test` -> all 10 tests pass.
  - Run `npm run lint` -> 0 errors.
  - Run `npm run build` -> compiles all static and dynamic pages.

- [ ] **Step 6: Commit & Push**
  ```bash
  git add src/components/home/ src/components/layout/AnnouncementBar.tsx src/app/editorial/page.tsx
  git commit -m "feat(storefront): dynamically connect Hero, Announcement, Editorial, and Brand Story to CMS"
  git push origin main
  ```
