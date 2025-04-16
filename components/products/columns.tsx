"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Category, Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash } from "lucide-react";

const remove = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete/product/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.error("Failed to delete product");
    alert("Failed to delete product");
  } else {
    alert("Product deleted successfully");
  }
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/categories/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "isLive",
    header: "Live",
    cell: ({ row }) => (
      <Link
        href={`/categories/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.getValue("isLive") ? "Yes" : "No"}
      </Link>
    ),
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => (
      <Link
        href={`/categories/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.getValue("categoryId") || "-"}
      </Link>
    ),
  },
  {
    accessorKey: "subcategoryId",
    header: "Subcategory",
    cell: ({ row }) => (
      <Link
        href={`/categories/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.getValue("subcategoryId") || "-"}
      </Link>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-muted-foreground line-clamp-1">
        {row.getValue("description") || "-"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/products/${category.id}`}
                className="flex items-center"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => remove(category.id)} className="text-red-500">
              <Trash className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];