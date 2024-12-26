import authOptions from "@/app/auth/authOptions";
import { productSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      unitPrice: parseFloat(body.unitPrice),
      description: body.description,
      discount: body.discount,
      deleveryChrge: body.deleveryChrge,
      backgroundImage: body.backgroundImage,
      iconImage: body.iconImage,
      categoryId: parseInt(body.categoryId),
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
