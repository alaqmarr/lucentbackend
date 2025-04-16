import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product, Category, Subcategory } from '@prisma/client';
import { Icons } from '@/components/icons';

interface RecentProductsProps {
  products: (Product & {
    category: Category;
    subcategory: Subcategory | null;
  })[];
}

export function RecentProducts({ products }: RecentProductsProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              {product.category.name}
              {product.subcategory && ` › ${product.subcategory.name}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">₹{product.price.toFixed(2)}</span>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/products/${product.id}`}>
                <Icons.eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
      <Button variant="link" className="w-full" asChild>
        <Link href="/products">View all products</Link>
      </Button>
    </div>
  );
}