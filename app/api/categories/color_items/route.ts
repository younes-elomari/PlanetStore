import authOptions from "@/app/auth/authOptions";
import { colorItemSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const colorItems = await prisma.color_Item.findMany();
  return NextResponse.json(colorItems);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await request.json();
  const validation = colorItemSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newColorItem = await prisma.color_Item.create({
    data: {
      colorId: parseInt(body.colorId),
      productId: parseInt(body.productId),
    },
  });

  return NextResponse.json(newColorItem, { status: 201 });
}
