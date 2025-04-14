// app/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {prisma} from '@/lib/prisma';

export default async function Dashboard() {
  const [categoriesCount, subcategoriesCount, productsCount, liveProductsCount] = await Promise.all([
    prisma.category.count(),
    prisma.subcategory.count(),
    prisma.product.count(),
    prisma.product.count({ where: { isLive: true } }),
  ]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{categoriesCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subcategories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{subcategoriesCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{productsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{liveProductsCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}