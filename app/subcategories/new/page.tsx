import { SubcategoryForm } from '@/components/subcategory/subcategory-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CreateSubcategoryPage() {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="flex items-center justify-between mb-6 mt-6">
        <div className="flex items-center gap-4">
          <Link href="/subcategories">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create Subcategory</h1>
        </div>
      </div>

      <div className="rounded-lg shadow p-6">
        <SubcategoryForm />
      </div>
    </div>
  );
}