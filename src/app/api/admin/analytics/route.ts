import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Revenue & Orders
    const revenueAgg = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { not: 'CANCELLED' } },
    });
    const totalRevenue = revenueAgg._sum.totalAmount || 0;

    const totalOrders = await prisma.order.count();
    const pendingOrders = await prisma.order.count({
      where: { status: { in: ['PENDING', 'PROCESSING'] } },
    });

    const totalProducts = await prisma.product.count();

    // 2. Low Stock Monitor (Stock <= 15)
    const lowStockCount = await prisma.productSizeStock.count({
      where: { stock: { lte: 15 } },
    });

    const lowStockItems = await prisma.productSizeStock.findMany({
      where: { stock: { lte: 15 } },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
            price: true,
          },
        },
      },
      orderBy: { stock: 'asc' },
      take: 8,
    });

    // 3. Recent 5 Orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });

    // 4. Products by category count
    const productsByCategory = await prisma.product.groupBy({
      by: ['category'],
      _count: { id: true },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        totalProducts,
        lowStockCount,
      },
      recentOrders,
      lowStockItems,
      categoryBreakdown: productsByCategory.map((c) => ({
        category: c.category,
        count: c._count.id,
      })),
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Analitik verileri yüklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}
