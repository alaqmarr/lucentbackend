
import { DataTable } from '@/components/products/category-table';
import { columns } from '@/components/products/columns';
import { Category, Product } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getCategories(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-[100vw] p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button>New Product</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}