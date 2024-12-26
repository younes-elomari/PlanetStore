import { Box, Text } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import _ from "lodash";
import { Product } from "@prisma/client";
import pagesCount from "@/app/utils/pagesCount";
import AlertText from "../_components/AlertText";
import Pagination from "@/app/_components/Pagination";
import ProductTable from "./_components/ProductTable";
import ProductActions from "./_components/ProductActions";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  searchParams: Promise<{
    orderBy: keyof Product;
    order: "asc" | "desc";
    page: string;
    name: string;
    categoryId: string;
  }>;
}

const ProductPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = pagesCount.productsPageCount;

  const categories = await prisma.category.findMany();

  const categoryIds = _(categories)
    .map((categorie) => categorie.id)
    .value();
  const categoryId = categoryIds.includes(
    parseInt((await searchParams).categoryId)
  )
    ? parseInt((await searchParams).categoryId)
    : undefined;

  const products = await prisma.product.findMany({
    where: {
      categoryId,
      name: {
        contains: (await searchParams).name,
      },
    },
    orderBy: { name: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const productCount = await prisma.product.count({
    where: {
      categoryId,
      name: {
        contains: (await searchParams).name,
      },
    },
  });

  return (
    <Box className="py-4 space-y-6">
      <ProductActions categories={categories} />
      {productCount === 0 ? (
        <AlertText alertText="products" />
      ) : (
        <Box className="space-y-2">
          <Text weight="medium" size="2">
            Products Table:{" "}
            <span className="text-gray-700">
              ( {productCount} number of products )
            </span>
          </Text>
          <ProductTable products={products} categories={categories} />
        </Box>
      )}
      <Pagination
        currentPage={page}
        itemCount={productCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default ProductPage;
