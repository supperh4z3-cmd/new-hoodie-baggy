import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PRODUCTS } from '../src/lib/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting BAGGY STREET database seeding...');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@baggystreet.com';
  const rawPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'baggystreet2026!';
  const hashedPassword = bcrypt.hashSync(rawPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: 'Baggy Street HQ',
      role: 'superadmin',
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Baggy Street HQ',
      role: 'superadmin',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Coupons
  const coupons = [
    { code: 'BAGGY10', discount: 10, type: 'PERCENTAGE', isActive: true },
    { code: 'DRILL20', discount: 20, type: 'PERCENTAGE', isActive: true },
    { code: 'WELCOME15', discount: 15, type: 'PERCENTAGE', isActive: true },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: { discount: c.discount, type: c.type, isActive: c.isActive },
      create: { code: c.code, discount: c.discount, type: c.type, isActive: c.isActive },
    });
  }
  console.log(`✅ Seeded ${coupons.length} discount coupons`);

  // 3. Seed Products & Stock
  for (const prod of PRODUCTS) {
    // Extract GSM number if present in details or description, default 420
    const gsmMatch = (prod.details?.material || prod.description).match(/(\d{3})\s*GSM/i);
    const gsmValue = gsmMatch ? parseInt(gsmMatch[1], 10) : 420;

    const upsertedProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        category: prod.category,
        price: prod.price,
        comparePrice: prod.compareAtPrice || null,
        badge: prod.badge || null,
        image: prod.images[0] || '/images/products/placeholder.webp',
        gallery: JSON.stringify(prod.images || []),
        description: prod.description || prod.shortDescription,
        inStock: true,
      },
      create: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        category: prod.category,
        price: prod.price,
        comparePrice: prod.compareAtPrice || null,
        badge: prod.badge || null,
        image: prod.images[0] || '/images/products/placeholder.webp',
        gallery: JSON.stringify(prod.images || []),
        description: prod.description || prod.shortDescription,
        inStock: true,
      },
    });

    // Seed Details
    await prisma.productDetails.upsert({
      where: { productId: upsertedProduct.id },
      update: {
        fabric: prod.details?.material || '%100 Ağır Pamuk',
        fit: prod.details?.fit || 'Boxy / Heavy Oversize',
        gsm: gsmValue,
        origin: prod.details?.origin || 'İstanbul, Türkiye',
        care: JSON.stringify([prod.details?.care || "30°C'de tersten yıkayınız"]),
      },
      create: {
        productId: upsertedProduct.id,
        fabric: prod.details?.material || '%100 Ağır Pamuk',
        fit: prod.details?.fit || 'Boxy / Heavy Oversize',
        gsm: gsmValue,
        origin: prod.details?.origin || 'İstanbul, Türkiye',
        care: JSON.stringify([prod.details?.care || "30°C'de tersten yıkayınız"]),
      },
    });

    // Seed Size Stock
    const defaultSizes = prod.sizes && prod.sizes.length > 0 ? prod.sizes : ['S', 'M', 'L', 'XL', 'XXL'];
    const stockMap: Record<string, number> = {
      S: 15,
      M: 25,
      L: 40,
      XL: 20,
      XXL: 10,
      'Tek Beden': 50,
      'One Size': 50,
    };

    for (const size of defaultSizes) {
      await prisma.productSizeStock.upsert({
        where: {
          productId_size: {
            productId: upsertedProduct.id,
            size,
          },
        },
        update: {
          stock: stockMap[size] ?? 20,
        },
        create: {
          productId: upsertedProduct.id,
          size,
          stock: stockMap[size] ?? 20,
        },
      });
    }
  }
  console.log(`✅ Seeded ${PRODUCTS.length} products with details & size inventories`);

  // 4. Seed Initial Sample Orders for Dashboard Visualization
  const sampleOrder1 = await prisma.order.upsert({
    where: { orderNumber: 'BGY-2026-1001' },
    update: {},
    create: {
      orderNumber: 'BGY-2026-1001',
      customerName: 'Caner Yılmaz',
      customerEmail: 'caner.yilmaz@example.com',
      customerPhone: '+90 532 555 12 34',
      shippingCity: 'İstanbul',
      shippingAddress: 'Moda Cad. No: 42 D: 5, Kadıköy, İstanbul',
      totalAmount: 2499.0,
      status: 'PROCESSING',
      notes: 'Zile basmayınız, bebek uyuyor.',
      items: {
        create: [
          {
            name: 'DRILL LOGO HOODIE',
            size: 'L',
            price: 2499.0,
            quantity: 1,
            productId: 'drill-logo-hoodie',
          },
        ],
      },
    },
  });

  const sampleOrder2 = await prisma.order.upsert({
    where: { orderNumber: 'BGY-2026-1002' },
    update: {},
    create: {
      orderNumber: 'BGY-2026-1002',
      customerName: 'Eren Kara',
      customerEmail: 'eren.kara@example.com',
      customerPhone: '+90 544 333 45 67',
      shippingCity: 'İzmir',
      shippingAddress: 'Alsancak Mah. 1448 Sok. No: 12, Konak, İzmir',
      totalAmount: 1999.0,
      status: 'SHIPPED',
      trackingCarrier: 'Yurtiçi Kargo',
      trackingNumber: 'YK-98218731',
      notes: 'Güvenliğe teslim edilebilir.',
      items: {
        create: [
          {
            name: 'BAGGY SWEATPANTS',
            size: 'M',
            price: 1999.0,
            quantity: 1,
            productId: 'baggy-sweatpants',
          },
        ],
      },
    },
  });

  console.log(`✅ Seeded sample orders: ${sampleOrder1.orderNumber}, ${sampleOrder2.orderNumber}`);

  // 5. Seed Site Settings (CMS)
  const defaultHeroSlides = [
    {
      id: "slide-1",
      type: "video",
      src: "/videos/hero-night-city.webm",
      poster: "/images/hero/hero-bg.webp",
      coordinates: "41.0082° N, 28.9784° E",
      city: "İSTANBUL",
      badge: "SOKAK MODASI YENİDEN TANIMLANDI",
      headline: "BAGGY STREET",
      tagline: "Aynı Şehir, Farklı Bakış Açısı",
      ctaText: "HEMEN KEŞFET",
      ctaLink: "/shop",
    },
    {
      id: "slide-2",
      type: "video",
      src: "/videos/hero-traffic-night.webm",
      poster: "/images/hero/hero-bg.webp",
      coordinates: "52.3676° N, 4.9041° E",
      city: "AMSTERDAM & İSTANBUL",
      badge: "2026 DRILL KOLEKSİYONU",
      headline: "SOKAKLARDAN DÜNYAYA",
      tagline: "Sıradan Kıyafetlerin Ötesinde Bir Yaşam Tarzı",
      ctaText: "YENİ DROP'U İNCELE",
      ctaLink: "/shop?category=hoodies",
    },
    {
      id: "slide-3",
      type: "video",
      src: "/videos/hero-skyline-night.webm",
      poster: "/images/hero/hero-bg.webp",
      coordinates: "460 GSM SAF FRANSIZ PAMUKLU",
      city: "SINIRLI SERİ",
      badge: "TAVİZSİZ TOK KALIPLAR",
      headline: "OVERSIZE & BAGGY KESİMLER",
      tagline: "Yıllar Boyu Formunu Kaybetmeyen Dik Duruş",
      ctaText: "EŞOFMAN & HOODIE",
      ctaLink: "/shop?category=sweatpants",
    },
    {
      id: "slide-4",
      type: "video",
      src: "/videos/hero-street-lights.webm",
      poster: "/images/hero/hero-bg.webp",
      coordinates: "GECE SOKAKLARI // İSTANBUL",
      city: "KADIKÖY & BEYOĞLU",
      badge: "YENİ GÖMLEK & T-SHIRT DROPLARI",
      headline: "SOKAK IŞIKLARI ALTINDA",
      tagline: "Ağır Pamuklu Kumaşlar ve Tavizsiz Dökümler",
      ctaText: "YENİ DROPLARI KEŞFET",
      ctaLink: "/shop",
    },
  ];

  const defaultAnnouncementBar = {
    enabled: true,
    text: "2.000 TL ÜZERİ TÜM TÜRKİYE'YE ÜCRETSİZ KARGO",
    subtext: "YENİ DROP: ISTANBUL DRILL 2026",
    linkText: "ŞİMDİ KEŞFET →",
    linkUrl: "/shop",
  };

  const defaultEditorialLooks = [
    {
      id: "look-1",
      frameNo: "FRAME [01/07]",
      title: "UNDERGROUND TUNNEL DRILL",
      category: "hoodies",
      subtitle: "Ağır 460 GSM French Terry pamuklu ve çift katmanlı dik duran kapüşon silüeti.",
      location: "41.0082° N, 28.9784° E / İSTANBUL",
      cameraInfo: "Leica M6 // Kodak Tri-X 400 B&W // 35mm f/1.4",
      modelSpecs: "Boy: 1.88 m • Kilo: 78 kg • Beden: L / Oversize",
      mediaType: "image",
      mediaSrc: "/images/brand/drill-editorial-1.webp",
      tags: ["460 GSM", "PITCH BLACK", "HEAVY HOODIE"],
      featuredProductSlug: "drill-logo-hoodie",
      quote: "Göz alıcı değil, tehditkar ve tavizsiz bir duruş.",
    },
    {
      id: "look-2",
      frameNo: "FRAME [02/07]",
      title: "NIGHT RUNNER OVERSIZED PUFFER",
      category: "bottoms",
      subtitle: "Su itici mat ripstop kumaş ve kaz tüyü dolgulu ultra hacimli silüet.",
      location: "52.3676° N, 4.9041° E / AMSTERDAM",
      cameraInfo: "Contax T2 // Fujifilm Superia 800 // 38mm f/2.8",
      modelSpecs: "Boy: 1.82 m • Kilo: 74 kg • Beden: M / Relaxed",
      mediaType: "image",
      mediaSrc: "/images/brand/brand-story-models.webp",
      tags: ["WATER RESISTANT", "MATTE BLACK", "PUFFER JACKET"],
      featuredProductSlug: "baggy-sweatpants",
      quote: "Karanlık sokakların fırtınasında tavizsiz koruma.",
    },
  ];

  const defaultBrandStory = {
    badge: "KURALLARI YIKAN SOKAK MODASI",
    titleLine1: "FROM ISTANBUL",
    titleLine2: "TO THE WORLD",
    paragraph1: "Baggy Street; Amsterdam'ın yağmurlu kanallarında doğan karanlık drill müziğinin sert basları ile İstanbul sokaklarının bitmeyen enerjisini bir araya getiren bağımsız bir tasarım atölyesidir.",
    paragraph2: "Hızlı modanın dayattığı tekdüze dar kalıplara meydan okuyoruz. 460 GSM saf Fransız havlu pamuk, 14.5 oz sert Japon selvedge denim ve düşük omuzlu tok boxy kalıplarla sokağın gerçek zırhını inşa ediyoruz.",
    stats: [
      { label: "460 GSM SAF HAVLU", icon: "HeavyStitch" },
      { label: "14.5 OZ RAW DENİM", icon: "HeavyStitch" },
      { label: "380 GSM FLANEL", icon: "HeavyStitch" },
      { label: "300 GSM ASİT YIKAMA", icon: "HeavyStitch" },
    ],
    image: "/images/brand/brand-story-models.webp",
  };

  const cmsSettings = [
    { key: "hero_slides", value: JSON.stringify(defaultHeroSlides) },
    { key: "announcement_bar", value: JSON.stringify(defaultAnnouncementBar) },
    { key: "editorial_looks", value: JSON.stringify(defaultEditorialLooks) },
    { key: "brand_story", value: JSON.stringify(defaultBrandStory) },
  ];

  for (const s of cmsSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log(`✅ Seeded ${cmsSettings.length} site settings for CMS`);

  console.log('🚀 Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
