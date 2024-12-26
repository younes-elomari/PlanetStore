import { Flex, Grid, Text } from "@radix-ui/themes";
import { BsCardList } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { RiShakeHandsLine } from "react-icons/ri";

interface Props {
  todayOrders: number;
  todayShippedOrders: number;
  todayDelevredOrders: number
}

const OrderStatusesGrid = ({todayOrders, todayShippedOrders, todayDelevredOrders}: Props) => {
  return (
    <Grid columns={{ initial: "1", md: "3" }} gap="4">
      <Flex
        align="center"
        justify="between"
        className="border rounded-md border-red-300 p-4"
      >
        <Flex align="center" gap="2" className="text-red-700">
          <BsCardList size="20" />
          <Text weight="medium" size="2">
            Today&apos;s orders:
          </Text>
        </Flex>
        <Text weight="medium" size="4" className="text-red-900">
          {todayOrders}
        </Text>
      </Flex>
      <Flex
        align="center"
        justify="between"
        className="border rounded-md border-red-300 p-4"
      >
        <Flex align="center" gap="2" className="text-red-700">
          <FiTruck />
          <Text weight="medium" size="2">
            Today Shiped Orders:
          </Text>
        </Flex>
        <Text weight="medium" size="4" className="text-red-900">
          {todayShippedOrders}
        </Text>
      </Flex>
      <Flex
        align="center"
        justify="between"
        className="border rounded-md border-red-300 p-4"
      >
        <Flex align="center" gap="2" className="text-red-700">
          <RiShakeHandsLine size="20" />
          <Text weight="medium" size="2">
            Today Delevred orders:
          </Text>
        </Flex>
        <Text weight="medium" size="4" className="text-red-900">
          {todayDelevredOrders}
        </Text>
      </Flex>
    </Grid>
  );
};

export default OrderStatusesGrid;
