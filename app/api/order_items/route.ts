import { orderItemSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const orderItems = await prisma.order_Item.findMany({
    orderBy: { orderDate: "asc" },
  });
  return NextResponse.json(orderItems);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = orderItemSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newOrderItem = await prisma.order_Item.create({
    data: {
      orderId: parseInt(body.orderId),
      productId: parseInt(body.productId),
      unitPrice: parseFloat(body.unitPrice),
      quantity: body.quantity,
    },
  });

  const product = await prisma.product.findUnique({
    where: { id: parseInt(body.productId) },
  });
  if (product)
    await prisma.product.update({
      where: { id: product?.id },
      data: { orderTimes: product?.orderTimes + newOrderItem.quantity },
    });

  return NextResponse.json(newOrderItem, { status: 201 });
}
