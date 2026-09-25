import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        details: true,
        sizes: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Admin product GET error:', error);
    return NextResponse.json(
      { error: 'Ürün yüklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    const {
      name,
      category,
      price,
      comparePrice,
      badge,
      image,
      gallery,
      description,
      inStock,
      fabric,
      fit,
      gsm,
      origin,
      care,
      sizes, // array of { size: string, stock: number }
    } = body;

    // Verify product exists
    const existing = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 });
    }

    const productId = existing.id;

    // Update main product fields
    const productUpdateData: Record<string, unknown> = {};
    if (name !== undefined) productUpdateData.name = name;
    if (category !== undefined) productUpdateData.category = category;
    if (price !== undefined) productUpdateData.price = parseFloat(price.toString());
    if (comparePrice !== undefined) {
      productUpdateData.comparePrice = comparePrice ? parseFloat(comparePrice.toString()) : null;
    }
    if (badge !== undefined) productUpdateData.badge = badge || null;
    if (image !== undefined) productUpdateData.image = image;
    if (gallery !== undefined) {
      productUpdateData.gallery = typeof gallery === 'string' ? gallery : JSON.stringify(gallery);
    }
    if (description !== undefined) productUpdateData.description = description;
    if (inStock !== undefined) productUpdateData.inStock = Boolean(inStock);

    await prisma.product.update({
      where: { id: productId },
      data: productUpdateData,
    });

    // Update Details if provided
    if (fabric || fit || gsm || origin || care) {
      await prisma.productDetails.upsert({
        where: { productId },
        update: {
          ...(fabric && { fabric }),
          ...(fit && { fit }),
          ...(gsm && { gsm: parseInt(gsm.toString(), 10) }),
          ...(origin && { origin }),
          ...(care && { care: JSON.stringify(care) }),
        },
        create: {
          productId,
          fabric: fabric || '%100 Pamuk',
          fit: fit || 'Boxy / Heavy Oversize',
          gsm: gsm ? parseInt(gsm.toString(), 10) : 420,
          origin: origin || 'İstanbul, Türkiye',
          care: JSON.stringify(care || ["30°C'de tersten yıkayınız"]),
        },
      });
    }

    // Update Size Stocks if provided
    if (sizes && Array.isArray(sizes)) {
      for (const s of sizes) {
        if (s.size && s.stock !== undefined) {
          await prisma.productSizeStock.upsert({
            where: {
              productId_size: {
                productId,
                size: s.size,
              },
            },
            update: {
              stock: parseInt(s.stock.toString(), 10),
            },
            create: {
              productId,
              size: s.size,
              stock: parseInt(s.stock.toString(), 10),
            },
          });
        }
      }
    }

    const refreshedProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        details: true,
        sizes: true,
      },
    });

    return NextResponse.json({
      success: true,
      product: refreshedProduct,
    });
  } catch (error) {
    console.error('Admin product PUT error:', error);
    return NextResponse.json(
      { error: 'Ürün güncellenirken hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const existing = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Ürün başarıyla silindi.',
    });
  } catch (error) {
    console.error('Admin product DELETE error:', error);
    return NextResponse.json(
      { error: 'Ürün silinirken hata oluştu.' },
      { status: 500 }
    );
  }
}
