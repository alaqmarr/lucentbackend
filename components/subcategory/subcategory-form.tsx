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
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Category, Subcategory } from '@prisma/client';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, {
    message: 'Slug must be lowercase with hyphens',
  }),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
});

export function SubcategoryForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<Subcategory[]>([]);

  // check the name field and add make it lowercase, replace hyphens and set it onto the slug field

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    form.setValue('slug', slug);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      categoryId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/subcategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create subcategory');
      }

      const data = await response.json();
      toast.success('Subcategory created successfully!');
      router.push('/subcategories');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory Name</FormLabel>
                <FormControl
                onChange={(e) => {
                  field.onChange(e);
                  handleNameChange((e.target as HTMLInputElement).value);
                }
                }
                >
                  <Input placeholder="Enter subcategory name" {...field} />
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
                <FormLabel>URL Slug</FormLabel>
                <FormControl>
                  <Input placeholder="subcategory-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
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

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Subcategory description"
                      className="min-h-[100px]"
                      {...field}
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
            onClick={() => router.push('/subcategories')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Subcategory
          </Button>
        </div>
      </form>
    </Form>
  );
}