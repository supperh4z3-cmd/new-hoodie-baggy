import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Sipariş bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Admin order GET error:', error);
    return NextResponse.json(
      { error: 'Sipariş yüklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    const { status, trackingNumber, trackingCarrier, notes } = body;

    const dataToUpdate: Record<string, unknown> = {};

    if (status !== undefined) dataToUpdate.status = status;
    if (trackingNumber !== undefined) dataToUpdate.trackingNumber = trackingNumber;
    if (trackingCarrier !== undefined) dataToUpdate.trackingCarrier = trackingCarrier;
    if (notes !== undefined) dataToUpdate.notes = notes;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: dataToUpdate,
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Admin order PATCH error:', error);
    return NextResponse.json(
      { error: 'Sipariş güncellenirken sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
