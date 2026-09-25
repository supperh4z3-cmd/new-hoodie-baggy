import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();
    const { isActive, discount, type } = body;

    const updateData: Record<string, unknown> = {};
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (discount !== undefined) updateData.discount = parseFloat(discount.toString());
    if (type !== undefined) updateData.type = type;

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error('Admin coupon PATCH error:', error);
    return NextResponse.json(
      { error: 'Kupon güncellenirken hata oluştu.' },
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

    await prisma.coupon.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Kupon başarıyla silindi.',
    });
  } catch (error) {
    console.error('Admin coupon DELETE error:', error);
    return NextResponse.json(
      { error: 'Kupon silinirken hata oluştu.' },
      { status: 500 }
    );
  }
}
