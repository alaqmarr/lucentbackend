// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductsPage() {
    interface Product {
        id: string;
        name: string;
        price: number;
        quantity: number;
        isLive: boolean;
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products', { cache: 'no-store' });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleProductStatus = async (productId: string, isLive: boolean) => {
        try {
            setIsLoading(true);
            // Call API to update product status
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PATCH',
                body: JSON.stringify({ isLive: !isLive }),
            });

            if (response.ok) {
                setProducts(products.map(product =>
                    product.id === productId ? { ...product, isLive: !isLive } : product
                ));
            }
        } catch (error) {
            toast.error('Failed to update product status');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            setIsLoading(true);
            // Call API to delete product
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter(product => product.id !== productId));
                toast.success('Product deleted successfully');
            }
        } catch (error) {
            toast.error('Failed to delete product');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }
    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link href="/products/new">
                    <Button>Add New Product</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={product.isLive}
                                    onCheckedChange={() => toggleProductStatus(product.id, product.isLive)}
                                    disabled={isLoading}
                                />
                                <span className="ml-2">{product.isLive ? 'Live' : 'Archived'}</span>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => router.push(`/products/edit/${product.id}`)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => deleteProduct(product.id)}>
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}