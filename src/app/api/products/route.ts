import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPrismaProductToEcommerce } from '@/lib/productMapper';
import { PRODUCTS } from '@/lib/data/products';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    const where: Prisma.ProductWhereInput = {};

    if (category && category !== 'all') {
      where.category = category.toLowerCase();
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q } },
        { slug: { contains: q } },
        { description: { contains: q } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort === 'price-asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-desc') {
      orderBy = { price: 'desc' };
    }

    const dbProducts = await prisma.product.findMany({
      where,
      include: {
        details: true,
        sizes: true,
      },
      orderBy,
    });

    if (dbProducts && dbProducts.length > 0) {
      let mapped = dbProducts.map(mapPrismaProductToEcommerce);
      if (featured === 'true') {
        mapped = mapped.filter(
          (p) => p.isFeatured || p.badge === 'HOT' || p.badge === 'NEW'
        );
      }
      return NextResponse.json({
        success: true,
        count: mapped.length,
        products: mapped,
      });
    }

    // Graceful fallback to static PRODUCTS if DB is empty
    let fallback = [...PRODUCTS];
    if (category && category !== 'all') {
      fallback = fallback.filter((p) => p.category === category);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      fallback = fallback.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (featured === 'true') {
      fallback = fallback.filter((p) => p.isFeatured);
    }

    return NextResponse.json({
      success: true,
      fallback: true,
      count: fallback.length,
      products: fallback,
    });
  } catch (error) {
    console.error('Public products GET error:', error);
    return NextResponse.json({
      success: true,
      fallback: true,
      count: PRODUCTS.length,
      products: PRODUCTS,
    });
  }
}
