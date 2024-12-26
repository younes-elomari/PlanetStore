import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { FaProductHunt } from "react-icons/fa";
import ProductDetailsGrid from "./_components/ProductDetailsGrid";
import SimilarProducts from "./_components/SimilarProducts";
import prisma from "@/prisma/client";

import { notFound } from "next/navigation";
import _ from "lodash";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const ProductDetailsPage = async ({ params }: Props) => {
  const product = await prisma.product.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const category = await prisma.category.findUnique({
    where: { id: product?.categoryId },
  });

  const colors = await prisma.color.findMany();

  const colorItems = await prisma.color_Item.findMany({
    where: { productId: product?.id },
  });
  const colorItemsColorIds = _(colorItems)
    .map((item) => item.id)
    .value();

  const productColors = colors.map((color) =>
    colorItemsColorIds.includes(color.id) ? color : null
  );

  const simmilarProducts = await prisma.product.findMany({
    where: { categoryId: category?.id },
    take: 10,
  });

  if (!product) notFound();

  return (
    <Box className="space-y-6 text-gray-800">
      <Box className="space-y-3">
        <Flex align="center" gap="2">
          <FaProductHunt size={18} />
          <Text weight="medium" size="3">
            Product Details
          </Text>
        </Flex>
        <ProductDetailsGrid
          product={product}
          category={category}
          productColors={productColors}
        />
      </Box>
      <SimilarProducts products={simmilarProducts} />
    </Box>
  );
};

export const metadata: Metadata = {
  title: "PlanetStore - product Details",
  description: "product details.",
};

export default ProductDetailsPage;
