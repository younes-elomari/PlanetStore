import authOptions from "@/app/auth/authOptions";
import { categorySchema } from "@/app/validationSchemas";
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
  const validation = categorySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const category = await prisma.category.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!category)
    return NextResponse.json({ error: "Invalid Category." }, { status: 404 });

  const updatedCategory = await prisma.category.update({
    where: {
      id: category.id,
    },
    data: {
      name: body.name,
      slug: body.slug,
      iconBackground: body.iconBackground,
    },
  });

  return NextResponse.json(updatedCategory);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const category = await prisma.category.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!category)
    return NextResponse.json({ error: "Invalid Category." }, { status: 404 });

  await prisma.category.delete({
    where: { id: category.id },
  });

  return NextResponse.json({});
}
