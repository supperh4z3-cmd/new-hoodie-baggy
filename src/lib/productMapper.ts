import { Product, ProductSize, CategorySlug } from './types/ecommerce';
import { Prisma } from '@prisma/client';

export type PrismaProductWithRelations = Prisma.ProductGetPayload<{
  include: { details: true; sizes: true };
}>;

const CATEGORY_NAMES: Record<string, string> = {
  hoodies: 'HOODIES',
  sweatpants: 'SWEATPANTS',
  jackets: 'JACKETS',
  jeans: 'JEANS',
  accessories: 'ACCESSORIES',
  shirts: 'SHIRTS',
  tshirts: 'T-SHIRTS',
};

export function mapPrismaProductToEcommerce(p: PrismaProductWithRelations): Product {
  // Parse gallery images
  let images: string[] = [];
  if (p.gallery) {
    try {
      const parsed = JSON.parse(p.gallery);
      if (Array.isArray(parsed)) {
        images = parsed.filter(
          (item): item is string => typeof item === 'string' && item.length > 0
        );
      }
    } catch {
      images = [p.image];
    }
  }
  if (!images.includes(p.image)) {
    images.unshift(p.image);
  }
  if (images.length === 0) {
    images = ['/images/products/drill-logo-hoodie.webp'];
  }

  // Parse sizes (ordered S, M, L, XL, XXL)
  const sizeOrder: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];
  const sizes: ProductSize[] = p.sizes
    ? p.sizes
        .map((s) => s.size as ProductSize)
        .sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    : ['S', 'M', 'L', 'XL'];

  // Parse care instructions
  let careString = "30°C'de ters çevirerek yıkayınız. Ağartıcı ve kurutma makinesi kullanmayınız.";
  if (p.details?.care) {
    try {
      const parsedCare = JSON.parse(p.details.care);
      if (Array.isArray(parsedCare)) {
        careString = parsedCare.join('. ');
      } else if (typeof parsedCare === 'string') {
        careString = parsedCare;
      }
    } catch {
      careString = p.details.care;
    }
  }

  const categorySlug = (p.category.toLowerCase()) as CategorySlug;
  const categoryName = CATEGORY_NAMES[categorySlug] || p.category.toUpperCase();

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    compareAtPrice: p.comparePrice ?? undefined,
    category: categorySlug,
    categoryName,
    colors: ['Siyah'],
    sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'],
    images,
    description: p.description,
    shortDescription:
      p.description.slice(0, 110) + (p.description.length > 110 ? '...' : ''),
    details: {
      material: p.details?.fabric || '%100 Ağır Gramaj Saf Pamuk',
      fit: p.details?.fit || 'Boxy / Heavy Oversize',
      care: careString,
      origin: p.details?.origin || 'İstanbul, Türkiye',
    },
    badge: (p.badge as 'NEW' | 'HOT' | 'LIMITED') || undefined,
    isFeatured: p.badge === 'HOT' || p.badge === 'NEW' || true,
  };
}
