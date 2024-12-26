import authOptions from "@/app/auth/authOptions";
import { paymentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const payments = await prisma.payment.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json(payments);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await request.json();
  const validation = paymentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newPayment = await prisma.payment.create({
    data: {
      amount: parseFloat(body.amount),
      customerId: parseInt(body.customerId),
      invoiceId: parseInt(body.invoiceId),
      paymentMethod: body.paymentMethod,
    },
  });

  return NextResponse.json(newPayment, { status: 201 });
}
