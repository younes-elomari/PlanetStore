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

  const invoice = await prisma.invoice.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!invoice)
    return NextResponse.json({ error: "Invalid Invoice" }, { status: 404 });

  await prisma.invoice.delete({
    where: { id: invoice.id },
  });

  return NextResponse.json({});
}
