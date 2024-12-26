"use client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { MdOutlineShoppingCart } from "react-icons/md";
import useProductsStore from "@/app/store";
import EmptyShoppingCart from "@/app/_components/EmptyShoppingCart";
import ShoppingCartGrid from "./ShoppingCartGrid";

const ShoppingCartComponent = () => {
  const { shoppingCartProducts } = useProductsStore();

  if (shoppingCartProducts.length === 0)
    return (
      <Box className="py-6">
        <EmptyShoppingCart />
      </Box>
    );

  return (
    <Box className="space-y-6 text-gray-800">
      <Box className="space-y-3">
        <Flex align="center" gap="2">
          <MdOutlineShoppingCart size={18} />
          <Text weight="medium" size="3">
            Shopping Cart
          </Text>
        </Flex>
      </Box>
      <ShoppingCartGrid shoppingCartProducts={shoppingCartProducts} />
    </Box>
  );
};

export default ShoppingCartComponent;
