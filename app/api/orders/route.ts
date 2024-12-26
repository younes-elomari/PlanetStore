import { orderSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const orders = await prisma.order.findMany({
    orderBy: { orderDate: "asc" },
  });
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = orderSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newOrder = await prisma.order.create({
    data: {
      customerId: parseInt(body.customerId),      
    },
  });

  return NextResponse.json(newOrder, { status: 201 });
}
