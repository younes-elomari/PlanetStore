"use client";
import { Order, Order_Statuse } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  statuses: Order_Statuse[];
  order: Order;
}

const OrderItemStatusSelect = ({ statuses, order }: Props) => {
  const router = useRouter();

  const changeStatus = (status: string) => {
    const data =
      status === "Shipped"
        ? {
            orderStatus: status,
            shippedDate: new Date(),
          }
        : { orderStatus: status };

    try {
      axios.patch("/api/orders/" + order.id, data);
      router.push("/dashboard/orders");
      router.refresh();
    } catch (error) {
      alert("Changes could not be saved.");
    }
  };

  return (
    <Box>
      <Select.Root
        defaultValue={order.orderStatus || ""}
        onValueChange={changeStatus}
      >
        <Select.Trigger placeholder="Status" />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status} value={status}>
              {status}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default OrderItemStatusSelect;
