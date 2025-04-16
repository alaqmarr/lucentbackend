import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFile } from "@/lib/firebase";
import { checkProductName } from "@/lib/validateName";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        category: true,
        subcategory: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = await checkProductName(body.name);
    // Create product with images
    const product = await prisma.product.create({
      data: {
        name: name,
        description: body.description,
        price: parseFloat(body.price),
        quantity: parseInt(body.quantity),
        isLive: body.isLive,
        slug: body.slug,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null,
        images: {
          create: body.images.map((url: string) => ({ url })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
