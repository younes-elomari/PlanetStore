import { Box, Text } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import Pagination from "@/app/_components/Pagination";
import pagesCount from "@/app/utils/pagesCount";
import ColorTable from "./_components/ColorTable";
import AlertText from "../_components/AlertText";
import ColorActions from "./_components/ColorActions";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  searchParams: Promise<{
    page: string;
    name: string;
  }>;
}

const ColorPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = pagesCount.colorsPageCount;

  const colors = await prisma.color.findMany({
    where: {
      name: { contains: (await searchParams).name },
    },
    orderBy: { name: "asc" },
  });

  const colorsCount = await prisma.color.count({
    where: {
      name: { contains: (await searchParams).name },
    },
  });

  return (
    <Box className="py-4 space-y-6">
      <ColorActions />
      {colorsCount === 0 ? (
        <AlertText alertText="colors" />
      ) : (
        <Box className="space-y-2">
          <Text weight="medium" size="2">
            Colors Table:{" "}
            <span className="text-gray-700">
              ( {colorsCount} number of colors )
            </span>
          </Text>
          <ColorTable colors={colors} />
        </Box>
      )}

      <Pagination
        currentPage={page}
        itemCount={colorsCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default ColorPage;
