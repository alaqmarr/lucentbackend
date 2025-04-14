// app/products/new/page.tsx
'use client';

import { ProductForm } from "@/components/ProductForm";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Category, Subcategory } from '@prisma/client';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, subcategoriesRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/subcategories'),
      ]);
      const [categoriesData, subcategoriesData] = await Promise.all([
        categoriesRes.json(),
        subcategoriesRes.json(),
      ]);
      setCategories(categoriesData);
      setSubcategories(subcategoriesData);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <ProductForm
        initialData={null}
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
}