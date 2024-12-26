import { Box, Card, Grid, Heading } from "@radix-ui/themes";
import React from "react";
import TopProductTable from "./_components/TopProductsTable";
import prisma from "@/prisma/client";
import DashboardHeaderGrid from "./_components/DashboardHeaderGrid";
import _ from "lodash";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import { Metadata } from "next";
import LineChartComponent from "../_components/LineChartComponent";

const DasoboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const todaysOrdersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const categoriesCount = await prisma.category.count();
  const customersCount = await prisma.customer.count();

  const topProducts = await prisma.product.findMany({
    orderBy: {
      orderTimes: "desc",
    },
    take: 15,
  });

  const orders = await prisma.order.findMany();

  const getMounthlyOrders = () => {
    const grouped = _.groupBy(orders, (order) => {
      return `${
        order.orderDate.getMonth() + 1
      }/${order.orderDate.getFullYear()}`;
    });

    return _.map(grouped, (items, key) => ({
      date: key,
      value: items.length,
    }));
  };

  return (
    <Box className="space-y-4">
      <DashboardHeaderGrid
        todaysOrdersCount={todaysOrdersCount}
        productsCount={productsCount}
        categoriesCount={categoriesCount}
        customersCount={customersCount}
      />

      <Grid columns={{ initial: "1", md: "1fr 300px" }} gap="3">
        <Card className="sapce-y-2">
          <Heading size="2" weight="medium">
            Orders:
          </Heading>
          <Box>
            <LineChartComponent data={getMounthlyOrders()} />
          </Box>
        </Card>
        <TopProductTable products={topProducts} />
      </Grid>
    </Box>
  );
};

// export const metadata: Metadata = {
//   title: "PlanetStore - dashboard",
// };

export default DasoboardPage;
