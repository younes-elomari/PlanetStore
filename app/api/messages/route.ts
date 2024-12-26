import { messageSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = messageSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newMessage = await prisma.message.create({
    data: {
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      message: body.message,
    },
  });

  return NextResponse.json(newMessage, { status: 201 });
}
