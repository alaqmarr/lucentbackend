// app/dashboard/page.tsx
import DashboardComponent from './dashboard-component';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Disable caching for this page

export default async function DashboardPage() {
  // Fetch all data in parallel using api calls
  const [
    categoriesCount,
    subcategoriesCount,
    productsCount,
    liveProductsCount,
    categories,
    recentProducts,
    inventoryStatus
  ] = await Promise.all([
    prisma.category.count(),
    prisma.subcategory.count(),
    prisma.product.count(),
    prisma.product.count({ where: { isLive: true } }),
    prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      }
    }),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        subcategory: true
      }
    }),
    prisma.product.findMany({
      select: {
        name: true,
        quantity: true
      },
      orderBy: { quantity: 'asc' },
      take: 5
    })
  ]);

  // Prepare data for charts
  const categoryDistribution = categories.map(category => ({
    name: category.name,
    value: category._count.products
  }));

  const inventoryData = {
    labels: inventoryStatus.map(item => item.name),
    datasets: [{
      label: 'Quantity',
      data: inventoryStatus.map(item => item.quantity),
      backgroundColor: inventoryStatus.map(item =>
        item.quantity === 0 ? '#ef4444' :
          item.quantity < 10 ? '#f59e0b' : '#10b981'
      )
    }]
  };

  return (
    <div
      className='w-full flex flex-col items-center justify-center'
    >
      <DashboardComponent
        categoriesCount={categoriesCount}
        subcategoriesCount={subcategoriesCount}
        productsCount={productsCount}
        liveProductsCount={liveProductsCount}
        categoryDistribution={categoryDistribution}
        inventoryData={inventoryData}
        recentProducts={recentProducts}
      />
    </div>
  );
}