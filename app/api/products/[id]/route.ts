import authOptions from "@/app/auth/authOptions";
import { productSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const product = await prisma.product.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 404 });

  const updatedProduct = await prisma.product.update({
    where: {
      id: product.id,
    },
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

  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const product = await prisma.product.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 404 });

  const productColorItems = await prisma.color_Item.findMany({
    where: { productId: product.id },
  });
  if (productColorItems)
    await prisma.color_Item.deleteMany({
      where: { productId: product.id },
    });

  await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({});
}
