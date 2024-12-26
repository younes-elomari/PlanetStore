import { Flex, Heading, Text, Box } from "@radix-ui/themes";
import { RiListOrdered2 } from "react-icons/ri";
import OrderStatusSelect from "./OrderStatusSelect";
import { Order_Statuse } from "@prisma/client";

const OrdersActions = () => {
  const date = new Date().toLocaleDateString();

  return (
    <Box className="space-y-6">
      <Flex justify="between" gap="4" align="center">
        <Flex align="center" gap="4" className="text-violet-900">
          <RiListOrdered2 size="25" />
          <Heading size="4">Orders List.</Heading>
        </Flex>
        <Text weight="medium" size="2" className="text-violet-800">
          Today: {date}
        </Text>
      </Flex>

      <Box className="space-y-2">
        <Text weight="medium" size="2">
          Filter:
        </Text>
        <Flex gap="4" className="flex-wrap">
          <OrderStatusSelect statuses={statuses} />
        </Flex>
      </Box>
    </Box>
  );
};

export const statuses = Object.values(Order_Statuse);

export default OrdersActions;
