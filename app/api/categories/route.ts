import authOptions from "@/app/auth/authOptions";
import { categorySchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = categorySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const category = await prisma.category.findUnique({
    where: { name: body.name },
  });
  if (category)
    return NextResponse.json(
      { error: "Category already exists." },
      { status: 400 }
    );

  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.slug,
      iconBackground: body.iconBackground,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}
