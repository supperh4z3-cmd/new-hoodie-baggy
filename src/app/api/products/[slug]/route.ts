import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPrismaProductToEcommerce } from '@/lib/productMapper';
import { PRODUCTS } from '@/lib/data/products';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Ürün slug belirtilmedi' },
        { status: 400 }
      );
    }

    const dbProduct = await prisma.product.findUnique({
      where: { slug },
      include: {
        details: true,
        sizes: true,
      },
    });

    if (dbProduct) {
      const product = mapPrismaProductToEcommerce(dbProduct);
      return NextResponse.json({ success: true, product });
    }

    // Fallback to static catalog if exists
    const staticProduct = PRODUCTS.find((p) => p.slug === slug);
    if (staticProduct) {
      return NextResponse.json({
        success: true,
        fallback: true,
        product: staticProduct,
      });
    }

    return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
  } catch (error) {
    console.error('Public product slug GET error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
