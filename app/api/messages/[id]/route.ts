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

  const message = await prisma.message.findUnique({
    where: {
      id: parseInt((await params).id),
    },
  });
  if (!message)
    return NextResponse.json({ error: "Invalid Message" }, { status: 404 });

  await prisma.message.delete({
    where: { id: message.id },
  });

  return NextResponse.json({});
}
