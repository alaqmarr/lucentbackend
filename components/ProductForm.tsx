// components/product/product-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product, Category, Subcategory, ProductImage } from '@prisma/client';
import FirebaseImageUpload from "@/components/image-upload";
import { deleteFile } from '@/lib/firebase';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TipTapEditor } from './editor/tiptap-editor';

// Define extended Product type with relations
type ProductWithRelations = Product & {
  images: ProductImage[];
  category: Category;
  subcategory: Subcategory | null;
};

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be positive'),
  quantity: z.coerce.number().min(0, 'Quantity must be positive'),
  categoryId: z.string().min(1, 'Category is required'),
  subcategoryId: z.string().optional().nullable(),
  isLive: z.boolean(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  slug: z.string().min(1, 'Slug is required'),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: ProductWithRelations | null;
  categories: Category[];
  subcategories: Subcategory[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  subcategories,
}) => {
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      quantity: initialData?.quantity || 0,
      categoryId: initialData?.categoryId || '',
      subcategoryId: initialData?.subcategoryId || null,
      isLive: initialData?.isLive || false,
      images: initialData?.images.map(img => img.url) || [],
      slug: initialData?.slug || '',
    },
  });

  const selectedCategoryId = form.watch('categoryId');

  const filteredSubcategories = subcategories.filter(
    subcategory => subcategory.categoryId === selectedCategoryId
  );

  const onSubmit = async (data: ProductFormValues) => {
    const toastId = toast.loading(initialData ? 'Updating product...' : 'Creating product...');

    try {
      // Handle image deletions if editing
      if (initialData) {
        const initialImages = initialData.images.map(img => img.url);
        const imagesToDelete = initialImages.filter(url => !data.images.includes(url));
        
        // Delete removed images from Firebase
        await Promise.all(
          imagesToDelete.map(url => 
            deleteFile(url).catch(error => {
              console.error('Failed to delete image:', error);
            })
          )
        );
      }

      const url = initialData
        ? `/api/products/${initialData.id}`
        : '/api/products';
      const method = initialData ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          subcategoryId: data.subcategoryId || null,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      
      toast.success(initialData ? 'Product updated successfully!' : 'Product created successfully!', {
        id: toastId,
      });
      
      router.refresh();
      router.push(`/products/${result.id}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
        { id: toastId }
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Images Upload */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <FirebaseImageUpload
                      value={field.value}
                      onChange={(url:string) => field.onChange([...field.value, url])}
                      onRemove={(url:string) =>
                        field.onChange(field.value.filter(current => current !== url))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Basic Information */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Slug</FormLabel>
                <FormControl>
                  <Input placeholder="product-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categories */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  disabled={!selectedCategoryId || filteredSubcategories.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={filteredSubcategories.length ? "Select a subcategory" : "No subcategories available"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredSubcategories.map(subcategory => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="isLive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Product Status</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    {field.value ? 'Product is live' : 'Product is archived'}
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Description */}
          <div className="md:col-span-2">
  <FormField
    control={form.control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <TipTapEditor
            content={field.value || ''}
            onChange={field.onChange}
            placeholder="Write a detailed product description..."
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="min-w-[150px]"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {initialData ? 'Saving...' : 'Creating...'}
              </>
            ) : (
              initialData ? 'Save Changes' : 'Create Product'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};