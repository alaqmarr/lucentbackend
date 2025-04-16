import { ProductForm } from '@/components/ProductForm'
import React from 'react'

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: 'no-store',
  });
  const product = await res.json();
  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: 'no-store',
  });
  const categories = await categoriesRes.json();
  const subcategoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategories`, {
    cache: 'no-store',
  });
  const subcategories = await subcategoriesRes.json();
  return (
    <ProductForm
      initialData={product}
      categories={categories}
      subcategories={subcategories}
    />
  )
}

export default ProductPage
