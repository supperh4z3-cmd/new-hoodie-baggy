# BAGGY STREET Backend & Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete relational backend (Prisma ORM + SQLite) and brutalist Admin Panel (`/admin`) for BAGGY STREET, featuring KPI analytics, order/shipping management, product catalog/stock control, coupon engine, and secure JWT session auth.

**Architecture:** Next.js 16 App Router Route Handlers connected via a singleton Prisma Client to a local SQLite database, guarded by HTTP-Only JWT Cookie sessions via Next.js Middleware. A dedicated `/admin` layout renders a brutalist dark theme dashboard with real-time stat cards, order drawers, and stock editors.

**Architecture Diagram:**

```mermaid
graph TD
    subgraph "Client Storefront & Admin"
        A[Storefront: /checkout, /order-tracking]
        B[Admin Panel: /admin, /admin/orders, /admin/products, /admin/coupons]
    end

    subgraph "Security Layer"
        M[Next.js Middleware: src/middleware.ts]
        AUTH[Jose JWT + HTTP-Only Cookie]
        B --> M --> AUTH
    end

    subgraph "API Layer (Route Handlers)"
        API_PUB[/api/orders, /api/coupons]
        API_ADM[/api/admin/analytics, /api/admin/orders, /api/admin/products, /api/admin/coupons]
        A --> API_PUB
        AUTH --> API_ADM
    end

    subgraph "Database Layer (Prisma ORM)"
        PC[src/lib/prisma.ts - PrismaClient Singleton]
        DB[(prisma/dev.db - SQLite)]
        API_PUB --> PC
        API_ADM --> PC
        PC --> DB
    end
```

**Tech Stack:** Next.js 16.3.6 (Turbopack, App Router), React 19, Prisma ORM (`@prisma/client`, `prisma`), SQLite, `jose` (JWT), `bcryptjs`, Lucide Icons, Zustand, TailwindCSS v4.

**Spec:** [docs/superpowers/specs/2026-09-25-backend-admin-design.md](file:///Users/gorhanmfatih/Desktop/new-hoodie-baggy/docs/superpowers/specs/2026-09-25-backend-admin-design.md)

---

## Global Constraints

- Do not alter public storefront URLs (`/`, `/shop`, `/product/[slug]`, `/cart`, `/checkout`, `/account`, `/order-tracking`).
- Preserve dark brutalist streetwear aesthetics in the `/admin` area (black `#09090c`, panel `#121218`, neon red `#ef4444`, monospace labels).
- All `/admin/*` routes (except `/admin/login`) must be protected by HTTP-Only JWT Cookie verification.
- Passwords must be hashed using `bcryptjs` with at least 10 salt rounds.
- All database operations must go through `src/lib/prisma.ts`.

---

### Task 1: Dependencies, Environment & Prisma Setup

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`
- Modify: `.env.local`
- Modify: `package.json`

**Interfaces:**
- Produces: `prisma` (exported singleton from `src/lib/prisma.ts`)

- [ ] **Step 1: Install required packages**
  Run: `npm install @prisma/client jose bcryptjs && npm install -D prisma @types/bcryptjs tsx`

- [ ] **Step 2: Configure Environment Variables**
  Ensure `.env.local` has:
  ```env
  DATABASE_URL="file:./dev.db"
  ADMIN_JWT_SECRET="baggy-street-secret-jwt-key-2026-drill-culture"
  ADMIN_DEFAULT_EMAIL="admin@baggystreet.com"
  ADMIN_DEFAULT_PASSWORD="baggystreet2026!"
  ```

- [ ] **Step 3: Create Prisma Schema file**
  Create `prisma/schema.prisma` with `AdminUser`, `Product`, `ProductDetails`, `ProductSizeStock`, `Order`, `OrderItem`, and `Coupon` models.

- [ ] **Step 4: Generate Prisma Client & Push DB**
  Run: `npx prisma db push && npx prisma generate`
  Expected: `dev.db` created in `prisma/` and `@prisma/client` types generated.

- [ ] **Step 5: Create Prisma Singleton Client**
  Create `src/lib/prisma.ts` with global caching to prevent multiple instances during hot-reloads.

- [ ] **Step 6: Commit**
  ```bash
  git add prisma/schema.prisma src/lib/prisma.ts package.json package-lock.json .env.local
  git commit -m "feat(db): initialize Prisma ORM with SQLite schema and singleton client"
  ```

---

### Task 2: Database Seeding Script

**Files:**
- Create: `prisma/seed.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `PRODUCTS` from `src/lib/data/products.ts`, `prisma` from `src/lib/prisma.ts`
- Produces: Populated SQLite DB with 10 products, size inventories, admin user, and coupons.

- [ ] **Step 1: Write `prisma/seed.ts`**
  Write seed script that:
  1. Creates default admin user (`admin@baggystreet.com` / `baggystreet2026!`).
  2. Seeds default coupons (`BAGGY10` %10, `DRILL20` %20).
  3. Iterates over `PRODUCTS` and seeds `Product`, `ProductDetails`, and `ProductSizeStock` for each size (S: 15, M: 25, L: 40, XL: 20, XXL: 10).

- [ ] **Step 2: Add prisma seed config to `package.json`**
  ```json
  "prisma": {
    "seed": "npx tsx prisma/seed.ts"
  }
  ```

- [ ] **Step 3: Run Database Seed**
  Run: `npx prisma db seed`
  Expected: `10 products, default coupons and admin user seeded successfully.`

- [ ] **Step 4: Commit**
  ```bash
  git add prisma/seed.ts package.json
  git commit -m "feat(db): add comprehensive database seed script"
  ```

---

### Task 3: Authentication & Security Subsystem

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/app/api/auth/login/route.ts`
- Create: `src/app/api/auth/logout/route.ts`
- Create: `src/app/api/auth/me/route.ts`
- Create: `src/middleware.ts`

**Interfaces:**
- Produces: `signAdminToken`, `verifyAdminToken`, `hashPassword`, `comparePassword` in `src/lib/auth.ts`

- [ ] **Step 1: Write `src/lib/auth.ts`**
  Implement JWT signing and verification with `jose` and password hashing with `bcryptjs`.

- [ ] **Step 2: Create Auth Route Handlers**
  - `POST /api/auth/login`: checks email/password against `AdminUser` in database, sets HTTP-Only `baggy_admin_token` cookie.
  - `POST /api/auth/logout`: removes `baggy_admin_token` cookie.
  - `GET /api/auth/me`: verifies token from cookies and returns admin profile.

- [ ] **Step 3: Implement `src/middleware.ts`**
  Protect all `/admin/*` routes (except `/admin/login`) by verifying `baggy_admin_token`. Redirect unauthorized requests to `/admin/login`.

- [ ] **Step 4: Commit**
  ```bash
  git add src/lib/auth.ts src/app/api/auth/ src/middleware.ts
  git commit -m "feat(auth): add JWT session authentication and admin route protection middleware"
  ```

---

### Task 4: Admin Login Page & Layout Shell

**Files:**
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/layout.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/components/admin/AdminHeader.tsx`

**Interfaces:**
- Consumes: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`

- [ ] **Step 1: Build Admin Login Page (`/admin/login`)**
  Design high-contrast brutalist login card with brand logo, email/password inputs, error toast/alerts, and automatic redirect on success.

- [ ] **Step 2: Build `AdminSidebar.tsx` & `AdminHeader.tsx`**
  Sidebar links: Dashboard (`/admin`), Siparişler (`/admin/orders`), Ürünler & Stok (`/admin/products`), Kuponlar (`/admin/coupons`), Vitrine Dön (`/`), Çıkış Yap.
  Header: breadcrumb, live Istanbul clock, active admin name badge.

- [ ] **Step 3: Assemble `src/app/admin/layout.tsx`**
  Wrap child views with sidebar, header, and toast container.

- [ ] **Step 4: Commit**
  ```bash
  git add src/app/admin/login/page.tsx src/app/admin/layout.tsx src/components/admin/
  git commit -m "feat(admin): build brutalist admin layout and login screen"
  ```

---

### Task 5: Dashboard Overview & Analytics Module

**Files:**
- Create: `src/app/api/admin/analytics/route.ts`
- Create: `src/app/admin/page.tsx`
- Create: `src/components/admin/MetricCard.tsx`

**Interfaces:**
- Consumes: `GET /api/admin/analytics`

- [ ] **Step 1: Build Analytics Route Handler**
  `GET /api/admin/analytics` queries Prisma for:
  - Total revenue (sum of `finalTotal` where status != CANCELLED)
  - Total orders count
  - Pending orders count (`status === "PENDING" || status === "PREPARING"`)
  - Average order value (AOV)
  - Low stock items list (`stock < 5`)
  - Latest 8 orders

- [ ] **Step 2: Build `src/app/admin/page.tsx`**
  Render 4 metric cards, low-stock warning banners, and recent orders data table with direct links to `/admin/orders`.

- [ ] **Step 3: Commit**
  ```bash
  git add src/app/api/admin/analytics/route.ts src/app/admin/page.tsx src/components/admin/MetricCard.tsx
  git commit -m "feat(admin): implement KPI analytics and dashboard overview"
  ```

---

### Task 6: Order & Shipping Management Module

**Files:**
- Create: `src/app/api/admin/orders/route.ts`
- Create: `src/app/api/admin/orders/[id]/route.ts`
- Create: `src/app/admin/orders/page.tsx`
- Create: `src/components/admin/OrderDetailDrawer.tsx`

**Interfaces:**
- Consumes: `GET /api/admin/orders`, `PATCH /api/admin/orders/[id]`, `InvoiceModal`

- [ ] **Step 1: Build Orders Route Handlers**
  - `GET /api/admin/orders`: search by code/customer, filter by status, sort by date desc.
  - `PATCH /api/admin/orders/[id]`: update `status` and `trackingNumber`.

- [ ] **Step 2: Build `src/app/admin/orders/page.tsx`**
  Interactive status filter pills (Tümü, Bekleyen, Kargoya Verilen, Teslim Edilen, İptal), search bar, order items summary, customer details, and detail drawer.

- [ ] **Step 3: Build `OrderDetailDrawer.tsx`**
  Drawer allows:
  - Changing status via dropdown.
  - Entering Yurtiçi Kargo tracking number.
  - Clicking "E-Fatura Yazdır" to open the existing `InvoiceModal`.

- [ ] **Step 4: Commit**
  ```bash
  git add src/app/api/admin/orders/ src/app/admin/orders/ src/components/admin/OrderDetailDrawer.tsx
  git commit -m "feat(admin): build comprehensive order and shipping management module"
  ```

---

### Task 7: Product Catalog & Stock Inventory Module

**Files:**
- Create: `src/app/api/admin/products/route.ts`
- Create: `src/app/api/admin/products/[id]/route.ts`
- Create: `src/app/admin/products/page.tsx`
- Create: `src/components/admin/ProductFormModal.tsx`

**Interfaces:**
- Consumes: `GET /api/admin/products`, `POST /api/admin/products`, `PATCH /api/admin/products/[id]`, `DELETE /api/admin/products/[id]`

- [ ] **Step 1: Build Products Route Handlers**
  - `GET /api/admin/products`: includes `details` and `stocks`.
  - `POST /api/admin/products`: creates product, details, and initial size stocks.
  - `PATCH /api/admin/products/[id]`: updates prices, stock levels per size, and badges.
  - `DELETE /api/admin/products/[id]`: deletes or archives product.

- [ ] **Step 2: Build `src/app/admin/products/page.tsx`**
  Data table with image thumbnails, price/compareAtPrice, category, badges, size stock pills (S, M, L, XL, XXL) with quick inline adjustment, and "Yeni Drop Ekle" button.

- [ ] **Step 3: Build `ProductFormModal.tsx`**
  Modal form to add a new drop with name, slug, price, compareAtPrice, category, description, image URLs, and per-size stock count inputs.

- [ ] **Step 4: Commit**
  ```bash
  git add src/app/api/admin/products/ src/app/admin/products/ src/components/admin/ProductFormModal.tsx
  git commit -m "feat(admin): build product catalog and size stock inventory module"
  ```

---

### Task 8: Coupon Management Module

**Files:**
- Create: `src/app/api/admin/coupons/route.ts`
- Create: `src/app/api/admin/coupons/[id]/route.ts`
- Create: `src/app/admin/coupons/page.tsx`

**Interfaces:**
- Consumes: `GET /api/admin/coupons`, `POST /api/admin/coupons`, `DELETE /api/admin/coupons/[id]`

- [ ] **Step 1: Build Coupon Route Handlers**
  - `GET /api/admin/coupons`: lists all coupons and stats.
  - `POST /api/admin/coupons`: creates coupon with code, percentage, minSubtotal, maxUses.
  - `DELETE /api/admin/coupons/[id]`: removes or deactivates coupon.

- [ ] **Step 2: Build `src/app/admin/coupons/page.tsx`**
  Coupons list table, active status toggle, used count indicator, and inline "Yeni Kupon Tanımla" card.

- [ ] **Step 3: Commit**
  ```bash
  git add src/app/api/admin/coupons/ src/app/admin/coupons/
  git commit -m "feat(admin): implement coupon and campaign management module"
  ```

---

### Task 9: Storefront Live DB Integration & Verification

**Files:**
- Create: `src/app/api/orders/route.ts`
- Create: `src/app/api/orders/[code]/route.ts`
- Modify: `src/app/checkout/page.tsx`
- Modify: `src/app/order-tracking/page.tsx`

**Interfaces:**
- Consumes: `POST /api/orders`, `GET /api/orders/[code]`

- [ ] **Step 1: Build Public Storefront Order API**
  - `POST /api/orders`: creates real order and line items in Prisma SQLite, decrements size stock accordingly.
  - `GET /api/orders/[code]`: retrieves order status, tracking number, and items from database.

- [ ] **Step 2: Connect `/checkout` to `/api/orders`**
  Update checkout completion logic to POST order data to `/api/orders` before redirecting to `/order-tracking`.

- [ ] **Step 3: Connect `/order-tracking` to `/api/orders/[code]`**
  Fetch order status directly from `/api/orders/[code]`, falling back to localStorage if offline.

- [ ] **Step 4: End-to-End Test and Verification**
  Run:
  - `npm run lint` (0 errors)
  - `npm test` (All tests pass)
  - `npm run build` (Turbopack production build succeeds)

- [ ] **Step 5: Commit & Push**
  ```bash
  git add .
  git commit -m "feat: complete end-to-end backend and admin panel implementation"
  git push origin main
  ```
