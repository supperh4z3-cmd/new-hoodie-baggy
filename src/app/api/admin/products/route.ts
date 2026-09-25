import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: Prisma.ProductWhereInput = {};

    if (category && category !== 'ALL') {
      where.category = category;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q } },
        { slug: { contains: q } },
        { description: { contains: q } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        details: true,
        sizes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Admin products GET error:', error);
    return NextResponse.json(
      { error: 'Ürünler listelenirken hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug: customSlug,
      category,
      price,
      comparePrice,
      badge,
      image,
      gallery,
      description,
      fabric,
      fit,
      gsm,
      origin,
      care,
      sizes, // array of { size: string, stock: number }
    } = body;

    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { error: 'Ürün adı, kategori ve fiyat zorunludur.' },
        { status: 400 }
      );
    }

    // Auto slugify if not provided
    const slug =
      customSlug?.trim() ||
      name
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const defaultSizes = sizes && Array.isArray(sizes) && sizes.length > 0
      ? sizes
      : [
          { size: 'S', stock: 15 },
          { size: 'M', stock: 25 },
          { size: 'L', stock: 35 },
          { size: 'XL', stock: 20 },
          { size: 'XXL', stock: 10 },
        ];

    const product = await prisma.product.create({
      data: {
        slug: finalSlug,
        name,
        category,
        price: parseFloat(price.toString()),
        comparePrice: comparePrice ? parseFloat(comparePrice.toString()) : null,
        badge: badge || null,
        image: image || '/images/products/placeholder.webp',
        gallery: JSON.stringify(gallery || [image || '/images/products/placeholder.webp']),
        description: description || '',
        inStock: true,
        details: {
          create: {
            fabric: fabric || '%100 Pamuk Ağır Kumaş',
            fit: fit || 'Boxy / Heavy Oversize',
            gsm: gsm ? parseInt(gsm.toString(), 10) : 420,
            origin: origin || 'İstanbul, Türkiye',
            care: JSON.stringify(care || ["30°C'de tersten yıkayınız"]),
          },
        },
        sizes: {
          create: defaultSizes.map((s: { size: string; stock: number }) => ({
            size: s.size,
            stock: parseInt(s.stock.toString(), 10) || 0,
          })),
        },
      },
      include: {
        details: true,
        sizes: true,
      },
    });

    return NextResponse.json({
      success: true,
      product,
    }, { status: 201 });
  } catch (error) {
    console.error('Admin product POST error:', error);
    return NextResponse.json(
      { error: 'Ürün oluşturulurken hata oluştu.' },
      { status: 500 }
    );
  }
}
