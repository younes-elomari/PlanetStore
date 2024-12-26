import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import ProductsGrid from "./ProductsGrid";
import { MdFiberNew } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
}

const NewArrivals = ({ products }: Props) => {
  return (
    <Box className="space-y-3 text-gray-700">
      <Flex align="center" gap="2" justify="between">
        <Flex align="center" gap="2">
          <MdFiberNew size={18} />
          <Text weight="medium" size="3">
            New Products
          </Text>
        </Flex>
        <Link href="/shop">
          <Flex
            align="center"
            gap="2"
            className="cursor-pointer hover:text-gray-900 transition"
          >
            <Text weight="medium" size="2">
              All Products
            </Text>
            <GoChevronRight size={15} />
          </Flex>
        </Link>
      </Flex>
      <ProductsGrid products={products} />
    </Box>
  );
};

export default NewArrivals;
