import { customerSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = customerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newCustomer = await prisma.customer.create({
    data: {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      city: body.city,
      address: body.address,
    },
  });

  return NextResponse.json(newCustomer, { status: 201 });
}
