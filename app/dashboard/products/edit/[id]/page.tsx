import prisma from "@/prisma/client";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ProductForm from "../../_components/ProductForm";
import { BiEditAlt } from "react-icons/bi";
import ColorProductSelect from "../../_components/ColorProductSelect";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt((await params).id) },
  });

  const colors = await prisma.color.findMany();

  const productColorItems = await prisma.color_Item.findMany({
    where: { productId: product?.id },
  });

  if (!product) notFound();

  return (
    <Box className="py-4 space-y-10">
      <Flex
        justify="between"
        align="center"
        gap="4"
        className="text-violet-900"
      >
        <Flex align="center" gap="4">
          <BiEditAlt size="25" />
          <Heading size="4">{product.name}</Heading>
        </Flex>
        <Box>
          <Text size="2" weight="medium">
            Created At: {product.createdAt.toLocaleString()}
          </Text>
        </Box>
      </Flex>

      <ProductForm product={product} />
      <ColorProductSelect
        colors={colors}
        productColorItems={productColorItems}
        productId={product.id}
      />
    </Box>
  );
};

export default EditProductPage;
