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
  
  const order = await prisma.order.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!order)
    return NextResponse.json({ error: "Invalid Order" }, { status: 404 });

  await prisma.order_Item.deleteMany({
    where: { orderId: order.id },
  });

  await prisma.invoice.delete({
    where: { orderId: order.id },
  });

  await prisma.order.delete({
    where: { id: order.id },
  });

  return NextResponse.json({});
}
