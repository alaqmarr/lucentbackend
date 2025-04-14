import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import { deleteFile } from '@/lib/firebase';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const productId = await params;
  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }
  const { id } = productId;
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        images: true,
        category: true,
        subcategory: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const productId = await params;
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    const { id } = productId;

    // Get current product to compare images
    const currentProduct = await prisma.product.findUnique({
      where: { id: id },
      include: { images: true },
    });

    if (!currentProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Find images to delete
    const currentImages = currentProduct.images.map(img => img.url);
    const imagesToDelete = currentImages.filter(url => !body.images.includes(url));

    // Delete removed images from Firebase
    await Promise.all(
      imagesToDelete.map(url => deleteFile(url).catch(console.error))
    );

    // Update product in database
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        quantity: parseInt(body.quantity),
        isLive: body.isLive,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null,
        slug: body.slug,
        images: {
          deleteMany: { url: { notIn: body.images } },
          createMany: {
            data: body.images
              .filter((url: string) => !currentImages.includes(url))
              .map((url: string) => ({ url })),
          },
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const productId = await params;
    if (!productId) { 
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    const { id } = productId;

    // Get product to delete images
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: { images: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete all associated images from Firebase
    await Promise.all(
      product.images.map(img => deleteFile(img.url).catch(console.error))
    );

    // Delete product from database
    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}