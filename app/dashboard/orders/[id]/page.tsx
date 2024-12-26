import { Badge, Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import React from "react";
import OrderItemStatusSelect from "../_components/OrderItemStatusSelect";
import { notFound } from "next/navigation";
import CustomerDetails from "../_components/CustomerDetails";
import InvoiceDetails from "../_components/InvoiceDetails";
import OrderItemCard from "../_components/OrderItemCard";

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const order = await prisma.order.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!order) return notFound();

  const orderItems = await prisma.order_Item.findMany({
    where: {
      orderId: order.id,
    },
  });

  const customer = await prisma.customer.findUnique({
    where: { id: order.customerId },
  });

  const invoice = await prisma.invoice.findUnique({
    where: { orderId: order.id },
  });

  return (
    <Box className="py-4 space-y-8">
      <Flex justify="between" gap="4" align="center">
        <Text weight="medium" size="3" className="text-gray-950">
          Ordered at: {order.orderDate.toLocaleString()}
        </Text>
        <Badge
          size="2"
          color={
            order?.orderStatus === "Processed"
              ? "red"
              : order?.orderStatus === "Shipped"
              ? "violet"
              : "green"
          }
          className="uppercase"
        >
          {order?.orderStatus}
        </Badge>
      </Flex>

      {order.shippedDate && (
        <Box>
          <Text weight="medium" size="3" className="text-gray-950">
            Shipped at: {order?.shippedDate.toLocaleString()}
          </Text>
        </Box>
      )}

      <Grid columns={{ initial: "1", md: "2" }} gap="3">
        {customer && <CustomerDetails customer={customer} />}
        {invoice && <InvoiceDetails invoice={invoice} />}
      </Grid>

      <Box className="space-y-4">
        <Heading weight="medium" size="3" className="text-gray-950">
          Order Items:
        </Heading>

        <Box className="space-y-4">
          {orderItems.map((order) => (
            <OrderItemCard key={order.id} orderItem={order} />
          ))}
        </Box>
      </Box>

      {order.orderStatus !== "Delivered" && (
        <Flex gap="3" align="center">
          <Text size="2" weight="medium">
            Order Status:
          </Text>
          <OrderItemStatusSelect
            order={order}
            statuses={["Processed", "Shipped", "Delivered"]}
          />
        </Flex>
      )}
    </Box>
  );
};

export default OrderDetailsPage;
