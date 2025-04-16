import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const subcategoryId = id;

    // Check if the subcategory exists
    const subcategory = await prisma.product.findUnique({
      where: { id: subcategoryId },
    });

    if (!subcategory) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }
    await prisma.productImage.deleteMany({
      where: { productId: subcategoryId },
    });
    
    await prisma.product.delete({
      where: { id: subcategoryId },
    });

    return NextResponse.json({ message: "product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
