import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error('Admin coupons GET error:', error);
    return NextResponse.json(
      { error: 'Kuponlar yüklenirken sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, discount, type = 'PERCENTAGE', isActive = true } = body;

    if (!code || discount === undefined) {
      return NextResponse.json(
        { error: 'Kupon kodu ve indirim oranı zorunludur.' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();

    // Check if code exists
    const existing = await prisma.coupon.findUnique({
      where: { code: cleanCode },
    });

    if (existing) {
      return NextResponse.json(
        { error: `"${cleanCode}" kupon kodu zaten kullanımda.` },
        { status: 409 }
      );
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: cleanCode,
        discount: parseFloat(discount.toString()),
        type: type === 'FIXED' ? 'FIXED' : 'PERCENTAGE',
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json({
      success: true,
      coupon,
    }, { status: 201 });
  } catch (error) {
    console.error('Admin coupon POST error:', error);
    return NextResponse.json(
      { error: 'Kupon oluşturulurken hata oluştu.' },
      { status: 500 }
    );
  }
}
