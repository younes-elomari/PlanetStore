import authOptions from "@/app/auth/authOptions";
import { colorSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const colors = await prisma.color.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(colors);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await request.json();
  const validation = colorSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newColor = await prisma.color.create({
    data: {
      name: body.name,
      slug: body.slug,
      color: body.color,
    },
  });

  return NextResponse.json(newColor, { status: 201 });
}
