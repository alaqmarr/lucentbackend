// app/dashboard/dashboard-component.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart } from '@/components/charts';
import { RecentProducts } from '@/components/dashboard/recent-products';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { anton, bFont } from '@/lib/utils';


interface DashboardProps {
  categoriesCount: number;
  subcategoriesCount: number;
  productsCount: number;
  liveProductsCount: number;
  categoryDistribution: { name: string; value: number }[];
  inventoryData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  recentProducts: any[];
}

export default function DashboardComponent({
  categoriesCount,
  subcategoriesCount,
  productsCount,
  liveProductsCount,
  categoryDistribution,
  inventoryData,
  recentProducts
}: DashboardProps) {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-center items-center">
        <div>
          <h1 className={`${bFont.className} text-3xl font-extrabold text-muted-foreground uppercase`}>Store Overview</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Categories" 
          value={categoriesCount} 
          icon={<Icons.category className="h-6 w-6" />}
          description="Total product categories"
        />
        <StatCard 
          title="Subcategories" 
          value={subcategoriesCount} 
          icon={<Icons.layers className="h-6 w-6" />}
          description="Product subcategories"
        />
        <StatCard 
          title="Total Products" 
          value={productsCount} 
          icon={<Icons.package className="h-6 w-6" />}
          description="All products in inventory"
        />
        <StatCard 
          title="Live Products" 
          value={liveProductsCount} 
          icon={<Icons.eye className="h-6 w-6" />}
          description="Currently visible to customers"
          percentage={Math.round((liveProductsCount / productsCount) * 100)}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle
            className={`${bFont.className} text-2xl font-extrabold uppercase`}
            >Products by Category</CardTitle>
            <CardDescription>Distribution of products across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart data={categoryDistribution} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
            className={`${bFont.className} text-2xl font-extrabold uppercase`}
            >Inventory Status</CardTitle>
            <CardDescription>Products with lowest stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart data={inventoryData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle
            className={`${bFont.className} text-2xl font-extrabold uppercase`}
            >Recently Added Products</CardTitle>
            <CardDescription>The latest products in your store</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentProducts products={recentProducts} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
            className={`${bFont.className} text-2xl font-extrabold uppercase`}
            >Quick Actions</CardTitle>
            <CardDescription>Manage your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/categories">
                <Icons.category className="mr-2 h-4 w-4" />
                Manage Categories
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/subcategories">
                <Icons.layers className="mr-2 h-4 w-4" />
                Manage Subcategories
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/products">
                <Icons.package className="mr-2 h-4 w-4" />
                View All Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description, percentage }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  percentage?: number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`${bFont.className} text-lg font-extrabold text-muted-foreground uppercase`}>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`${anton.className} text-3xl font-extrabold`}>{value}</div>
        {percentage !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            {percentage}% of total products
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}