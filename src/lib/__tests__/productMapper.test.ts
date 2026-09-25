import { describe, it, expect } from 'vitest';
import { mapPrismaProductToEcommerce, PrismaProductWithRelations } from '../productMapper';

describe('productMapper', () => {
  it('correctly maps a Prisma product with relations to storefront Product', () => {
    const prismaProduct = {
      id: 'prod-test-1',
      slug: 'heavy-test-hoodie',
      name: 'Heavy Test Hoodie',
      category: 'hoodies',
      price: 2450,
      comparePrice: 2850,
      badge: 'NEW',
      image: '/images/products/test.webp',
      gallery: JSON.stringify(['/images/products/test-1.webp', '/images/products/test-2.webp']),
      description: 'Ağır gramajlı sokak kapüşonlusu.',
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      details: {
        id: 'det-1',
        productId: 'prod-test-1',
        fabric: '%100 Ağır Gramaj Saf Pamuk (460 GSM)',
        fit: 'Boxy Oversize',
        gsm: 460,
        origin: 'İstanbul, Türkiye',
        care: JSON.stringify(["30°C'de yıkayınız"]),
      },
      sizes: [
        { id: 's-1', productId: 'prod-test-1', size: 'M', stock: 15 },
        { id: 's-2', productId: 'prod-test-1', size: 'L', stock: 20 },
        { id: 's-3', productId: 'prod-test-1', size: 'XL', stock: 0 },
      ],
    };

    const mapped = mapPrismaProductToEcommerce(
      prismaProduct as unknown as PrismaProductWithRelations
    );

    expect(mapped.id).toBe('prod-test-1');
    expect(mapped.slug).toBe('heavy-test-hoodie');
    expect(mapped.price).toBe(2450);
    expect(mapped.compareAtPrice).toBe(2850);
    expect(mapped.category).toBe('hoodies');
    expect(mapped.images).toContain('/images/products/test-1.webp');
    expect(mapped.sizes).toEqual(['M', 'L', 'XL']);
    expect(mapped.details.material).toContain('460 GSM');
  });
});
