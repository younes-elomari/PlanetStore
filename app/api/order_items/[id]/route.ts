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
  
  const orderItem = await prisma.order_Item.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!orderItem)
    return NextResponse.json({ error: "Invalid Order Item" }, { status: 404 });

  await prisma.order.delete({
    where: { id: orderItem.id },
  });

  return NextResponse.json({});
}
