import prisma from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import { Order, Order_Statuse } from "@prisma/client";
import Pagination from "@/app/_components/Pagination";
import OrderTable from "./_components/OrderTable";
import AlertText from "../_components/AlertText";
import pagesCount from "@/app/utils/pagesCount";
import OrderStatusesGrid from "./_components/OrderStatusesGrid";
import OrdersActions, { statuses } from "./_components/OrdersActions";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  searchParams: Promise<{
    orderBy: keyof Order;
    order: "asc" | "desc";
    status: Order_Statuse;
    page: string;
  }>;
}

const OrderPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = pagesCount.ordersPageCount;

  const status = statuses.includes((await searchParams).status)
    ? (await searchParams).status
    : undefined;

  const orders = await prisma.order.findMany({
    where: {
      orderStatus: status,
    },
    orderBy: { orderDate: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const orderCount = await prisma.order.count({
    where: {
      orderStatus: (await searchParams).status,
    },
  });

  const customers = await prisma.customer.findMany();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayOrders = await prisma.order.count({
    where: {
      orderDate: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const todayShippedOrders = await prisma.order.count({
    where: {
      orderStatus: "Shipped",
      orderDate: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const todayDelevredOrders = await prisma.order.count({
    where: {
      orderStatus: "Delivered",
      orderDate: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  return (
    <Box className="py-4 space-y-8">
      <OrdersActions />

      <OrderStatusesGrid
        todayOrders={todayOrders}
        todayShippedOrders={todayShippedOrders}
        todayDelevredOrders={todayDelevredOrders}
      />

      {orders.length === 0 ? (
        <AlertText alertText="orders" />
      ) : (
        <Box className="space-y-2">
          <Text weight="medium" size="2">
            Orders Table:{" "}
            <span className="text-gray-700">
              ( {orders.length} number of orders )
            </span>
          </Text>
          <OrderTable orders={orders} customers={customers} />
        </Box>
      )}

      <Pagination
        currentPage={page}
        itemCount={orderCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default OrderPage;
