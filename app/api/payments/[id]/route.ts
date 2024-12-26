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
  
  const payment = await prisma.payment.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!payment)
    return NextResponse.json({ error: "Invalid Payment" }, { status: 404 });

  await prisma.payment.delete({
    where: { id: payment.id },
  });

  return NextResponse.json({});
}
