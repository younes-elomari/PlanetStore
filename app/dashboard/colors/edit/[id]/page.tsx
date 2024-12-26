import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import ColorForm from "../../_components/ColorForm";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { BiEditAlt } from "react-icons/bi";

const EditColorPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const color = await prisma.color.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!color) notFound();

  return (
    <Box className="py-4 space-y-4">
      <Flex align="center" gap="4" className="text-violet-900">
        <BiEditAlt size="25" />
        <Heading size="4">{color.name}</Heading>
      </Flex>
      <ColorForm color={color} />
    </Box>
  );
};

export default EditColorPage;
