"use client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CheckoutGrid from "./CheckoutGrid";
import useProductsStore from "@/app/store";
import EmptyShoppingCart from "@/app/_components/EmptyShoppingCart";

const CheckoutComponent = () => {
  const { shoppingCartProducts } = useProductsStore();

  if (shoppingCartProducts.length === 0) return <EmptyShoppingCart />;

  return (
    <Box className="space-y-3">
      <Flex align="center" gap="2">
        <FaMagnifyingGlass size={18} />
        <Text weight="medium" size="3">
          Chechout Order
        </Text>
      </Flex>
      <CheckoutGrid />
    </Box>
  );
};

export default CheckoutComponent;
