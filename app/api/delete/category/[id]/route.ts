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
    const subcategory = await prisma.category.findUnique({
      where: { id: subcategoryId },
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    await prisma.category.delete({
      where: { id: subcategoryId },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
