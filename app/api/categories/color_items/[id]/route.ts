import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const colorItem = await prisma.color_Item.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!colorItem)
    return NextResponse.json({ error: "Invalid Color Item" }, { status: 404 });

  await prisma.color_Item.delete({
    where: { id: colorItem.id },
  });

  return NextResponse.json({});
}
