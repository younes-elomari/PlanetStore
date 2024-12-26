import authOptions from "@/app/auth/authOptions";
import { colorSchema } from "@/app/validationSchemas";
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
  const validation = colorSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const color = await prisma.color.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!color)
    return NextResponse.json({ error: "Invalid Color." }, { status: 404 });

  const updatedColor = await prisma.color.update({
    where: {
      id: color.id,
    },
    data: {
      name: body.name,
      slug: body.slug,
      color: body.color,
    },
  });

  return NextResponse.json(updatedColor);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const color = await prisma.color.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!color)
    return NextResponse.json({ error: "Invalid Color." }, { status: 404 });

  const colorItems = await prisma.color_Item.findMany({
    where: { colorId: color.id },
  });
  if (colorItems)
    await prisma.color_Item.deleteMany({
      where: { colorId: color.id },
    });

  await prisma.color.delete({
    where: { id: color.id },
  });

  return NextResponse.json({});
}
