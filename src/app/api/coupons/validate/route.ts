import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'Lütfen bir kupon kodu giriniz.' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();

    const coupon = await prisma.coupon.findUnique({
      where: { code: cleanCode },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json(
        { valid: false, error: 'Geçersiz veya süresi dolmuş kupon kodu.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      message:
        coupon.type === 'PERCENTAGE'
          ? `%${coupon.discount} indirim uygulandı!`
          : `${coupon.discount} TL indirim uygulandı!`,
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Kupon doğrulanırken hata oluştu.' },
      { status: 500 }
    );
  }
}
