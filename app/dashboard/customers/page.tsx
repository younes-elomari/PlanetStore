import pagesCount from "@/app/utils/pagesCount";
import prisma from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import React from "react";
import CustomersActions from "./_components/CustomersActions";
import Pagination from "@/app/_components/Pagination";
import AlertText from "../_components/AlertText";
import CustomerTable from "./_components/CustomerTable";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  searchParams: Promise<{ page: string }>;
}

const page = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = pagesCount.customersPageCount;

  const customers = await prisma.customer.findMany({
    orderBy: { fullName: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const customersCount = await prisma.customer.count();

  return (
    <Box className="py-4 space-y-6">
      <CustomersActions />
      {customersCount === 0 ? (
        <AlertText alertText="customers" />
      ) : (
        <Box className="space-y-2">
          <Text weight="medium" size="2">
            Products Table:{" "}
            <span className="text-gray-700">
              ( {customersCount} number of customers )
            </span>
          </Text>
          <CustomerTable customers={customers} />
        </Box>
      )}
      <Pagination
        currentPage={page}
        itemCount={customersCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default page;
