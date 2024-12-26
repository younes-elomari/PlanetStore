import { Box, Text } from "@radix-ui/themes";
import React from "react";
import SortProductsSelector from "./_components/SortProductsSelector";
import prisma from "@/prisma/client";
import _ from "lodash";
import pagesCount from "../utils/pagesCount";
import SearchProduct from "./_components/SearchProduct";
import { Metadata } from "next";
import ProductsGrid from "../_components/ProductsGrid";
import Pagination from "../_components/Pagination";
import Categories from "../_components/Categories";

interface Props {
  searchParams: Promise<{
    productName: string;
    page: string;
    category: string;
    orderBy: string;
  }>;
}

const ShopPage = async ({ searchParams }: Props) => {
  const page = parseInt((await searchParams).page) || 1;
  const pageSize = pagesCount.shopPageProductsCount;

  const categories = await prisma.category.findMany({});

  const categorySlugs = _(categories)
    .map((category) => category.slug)
    .value();
  const categorySlug = categorySlugs.includes((await searchParams).category)
    ? (await searchParams).category
    : undefined;

  const category = categories.find((c) => c.slug === categorySlug);
  const orderBy = ["createdAt", "orderTimes", "unitPrice", "discount"].includes(
    (await searchParams).orderBy
  )
    ? {
        [(await searchParams).orderBy]:
          (await searchParams).orderBy === "unitPrice" ? "asc" : "desc",
      }
    : undefined;

  const products = await prisma.product.findMany({
    where: {
      categoryId: category?.id,
      name: { contains: (await searchParams).productName },
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const productsCount = await prisma.product.count({
    where: {
      categoryId: category?.id,
      name: { contains: (await searchParams).productName },
    },
  });

  return (
    <Box className="space-y-7 text-gray-800">
      <Box className="space-y-5">
        <Categories
          categories={categories}
          label="Categories"
          showAllCategoriesButton={true}
        />
        <SortProductsSelector />
        <SearchProduct />
        {productsCount === 0 ? (
          <Text size="2" weight="medium" className="text-red-700 my-4 block">
            Sorry! we didn&apos;t find your product.
          </Text>
        ) : (
          <ProductsGrid products={products} />
        )}
      </Box>
      <Pagination
        currentPage={page}
        itemCount={productsCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export const metadata: Metadata = {
  title: "PlanetStore - shop",
  description:
    "we are committed to providing you with an unparalleled shopping experience. Our online store is designed to offer the best products on the market, ensuring that you receive the highest quality goods at the most competitive prices.",
};

export default ShopPage;
