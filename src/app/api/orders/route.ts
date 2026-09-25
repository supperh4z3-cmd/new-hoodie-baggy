import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingCity,
      shippingAddress,
      items,
      totalAmount,
      couponCode,
      notes,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingCity ||
      !shippingAddress ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      totalAmount === undefined
    ) {
      return NextResponse.json(
        { error: 'Lütfen tüm teslimat bilgilerini ve sepet ürünlerini eksiksiz doldurunuz.' },
        { status: 400 }
      );
    }

    // Generate unique order number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `BGY-2026-${randomDigits}`;

    // Execute in transactional block
    const newOrder = await prisma.$transaction(async (tx) => {
      // 1. Create Order with items
      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          shippingCity,
          shippingAddress,
          totalAmount: parseFloat(totalAmount.toString()),
          status: 'PENDING',
          notes: notes?.trim() || null,
          items: {
            create: items.map((item: {
              name: string;
              size: string;
              quantity: number;
              price: number;
              productId?: string;
            }) => ({
              name: item.name,
              size: item.size,
              quantity: parseInt(item.quantity.toString(), 10) || 1,
              price: parseFloat(item.price.toString()),
              productId: item.productId || null,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // 2. Decrement size stock for ordered products
      for (const it of items) {
        if (it.productId && it.size) {
          const stockRecord = await tx.productSizeStock.findFirst({
            where: {
              productId: it.productId,
              size: it.size,
            },
          });

          if (stockRecord) {
            await tx.productSizeStock.update({
              where: { id: stockRecord.id },
              data: {
                stock: Math.max(0, stockRecord.stock - (parseInt(it.quantity.toString(), 10) || 1)),
              },
            });
          }
        }
      }

      // 3. Increment coupon usage if applied
      if (couponCode) {
        const cleanCode = couponCode.trim().toUpperCase();
        const validCoupon = await tx.coupon.findUnique({
          where: { code: cleanCode },
        });

        if (validCoupon && validCoupon.isActive) {
          await tx.coupon.update({
            where: { id: validCoupon.id },
            data: { usageCount: { increment: 1 } },
          });
        }
      }

      return createdOrder;
    });

    return NextResponse.json({
      success: true,
      orderNumber: newOrder.orderNumber,
      orderId: newOrder.id,
      order: newOrder,
    }, { status: 201 });
  } catch (error) {
    console.error('Create storefront order error:', error);
    return NextResponse.json(
      { error: 'Sipariş oluşturulurken sunucu hatası meydana geldi.' },
      { status: 500 }
    );
  }
}
