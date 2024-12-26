import { invoiceSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const invoices = await prisma.invoice.findMany({
    orderBy: { invoiceDate: "asc" },
  });
  return NextResponse.json(invoices);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = invoiceSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newInvoice = await prisma.invoice.create({
    data: {
      number: body.number,
      invoiceTotal: body.invoiceTotal,
      dueDate: body.dueDate,
      paymentTotal: body.paymentTotal,
      customerId: parseInt(body.customerId),
      orderId: parseInt(body.orderId),
    },
  });

  return NextResponse.json(newInvoice, { status: 201 });
}
