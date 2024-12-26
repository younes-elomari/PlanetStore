import { Box, Text } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import Pagination from "@/app/_components/Pagination";
import AlertText from "../_components/AlertText";
import CategoryTable from "./_components/CategoryTable";
import pagesCount from "@/app/utils/pagesCount";
import CategoryActions from "./_components/CategoryActions";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  searchParams: Promise<{
    page: string;
    name: string;
  }>;
}

const DashboardCategoryPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = pagesCount.categoryPageCount;

  const categories = await prisma.category.findMany({
    where: {
      name: { contains: (await searchParams).name },
    },
    orderBy: { name: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const categoryCount = await prisma.category.count({
    where: {
      name: { contains: (await searchParams).name },
    },
  });

  return (
    <Box className="py-4 space-y-6">
      <CategoryActions />
      {categoryCount === 0 ? (
        <AlertText alertText="categories" />
      ) : (
        <Box className="space-y-2">
          <Text weight="medium" size="2">
            Categories Table:{" "}
            <span className="text-gray-700">( {categoryCount} )</span>
          </Text>
          <CategoryTable categories={categories} />
        </Box>
      )}

      <Pagination
        currentPage={page}
        itemCount={categoryCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default DashboardCategoryPage;
