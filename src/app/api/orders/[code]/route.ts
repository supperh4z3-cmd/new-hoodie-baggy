import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await props.params;

    if (!code) {
      return NextResponse.json(
        { error: 'Sipariş kodu belirtilmedi.' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: cleanCode },
          { id: code.trim() },
        ],
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Belirtilen sipariş numarasına ait kayıt bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Order tracking API error:', error);
    return NextResponse.json(
      { error: 'Sipariş bilgisi sorgulanırken hata oluştu.' },
      { status: 500 }
    );
  }
}
