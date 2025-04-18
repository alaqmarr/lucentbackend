import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkCategoryName } from "@/lib/validateName";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
        products: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = await checkCategoryName(body.name);
    const category = await prisma.category.create({
      data: {
        id: name,
        name: body.name,
        description: body.description,
        slug: body.slug,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
