
import { DataTable } from '@/components/subcategory/category-table';
import { columns } from '@/components/subcategory/columns';
import { Category, Subcategory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getCategories(): Promise<Subcategory[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategories`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-[100vw] space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subcategories</h1>
        <Link href="/subcategories/new">
          <Button>New Subcategory</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}