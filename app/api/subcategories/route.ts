import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkSubcategoryName } from "@/lib/validateName";

export async function GET() {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: {
        category: true,
        products: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(subcategories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = await checkSubcategoryName(body.name);
    const subcategory = await prisma.subcategory.create({
      data: {
        id: name,
        name: body.name,
        description: body.description,
        slug: body.slug,
        categoryId: body.categoryId,
      },
    });
    return NextResponse.json(subcategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    );
  }
}
