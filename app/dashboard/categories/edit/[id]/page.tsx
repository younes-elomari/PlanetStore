import prisma from "@/prisma/client";
import React from "react";
import CategoryForm from "../../_components/CategoryForm";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { BiEditAlt } from "react-icons/bi";

const EditCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const category = await prisma.category.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!category) notFound();

  return (
    <Box className="py-4 space-y-4">
      <Flex align="center" gap="4" className="text-violet-900">
        <BiEditAlt size="25" />
        <Heading size="4">{category.name}</Heading>
      </Flex>
      <CategoryForm category={category} />
    </Box>
  );
};

export default EditCategoryPage;
