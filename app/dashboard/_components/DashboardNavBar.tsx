import { Box, Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const DashboardNavBar = () => {
  return (
    <Box className="center">
      <Flex className="flex-wrap" gap="4">
        <Link href="/dashboard">
          <Button><Text className="cursor-pointer"> Dashboars</Text></Button>
        </Link>
        <Link href="/dashboard/orders">
          <Button><Text className="cursor-pointer"> Orders</Text></Button>
        </Link>
        <Link href="/dashboard/products">
          <Button><Text className="cursor-pointer"> Products</Text></Button>
        </Link>
        <Link href="/dashboard/categories">
          <Button><Text className="cursor-pointer"> Categories</Text></Button>
        </Link>
        <Link href="/dashboard/colors">
          <Button><Text className="cursor-pointer"> Colors</Text></Button>
        </Link>
        <Link href="/dashboard/messages">
          <Button><Text className="cursor-pointer"> Messages</Text></Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default DashboardNavBar;
