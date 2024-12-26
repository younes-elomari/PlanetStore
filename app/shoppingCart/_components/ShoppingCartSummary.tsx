"use client";
import { CartProduct } from "@/app/store";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import _ from "lodash";
import { calculatePriceWithOffer } from "@/app/utils/calculatePriceWithOffer";
import { formatQuantityNumber } from "@/app/utils/formatQuantityNumber";

interface Props {
  products: CartProduct[];
}

const ShoppingCartSummary = ({ products }: Props) => {
  const totalItems = _.sumBy(products.map((product) => product.quantity));

  const subTotal = _.sumBy(
    products.map(
      (product) =>
        calculatePriceWithOffer(
          parseFloat(product.unitPrice.toString()),
          product.discount
        ) * product.quantity
    )
  ).toFixed(2);

  const deleveryCharges = _.sumBy(
    products.map((product) => (product.deleveryChrge || 0) * product.quantity)
  ).toFixed(2);

  const total = parseFloat(subTotal + deleveryCharges).toFixed(2);

  return (
    <Box>
      <Box className="border mb-4">
        <Box className="border-b px-3 py-4">
          <Heading size="4" weight="medium" className="text-gray-700 py-2">
            Order Summary
          </Heading>
        </Box>
        <Box className="space-y-3 text-gray-600 px-3 py-6">
          <Flex align="center" justify="between">
            <Text weight="medium" size="3">
              Items
            </Text>
            <Text weight="medium" size="3">
              {formatQuantityNumber(totalItems)}
            </Text>
          </Flex>
          <Flex align="center" justify="between">
            <Text weight="medium" size="3">
              SubTotal
            </Text>
            <Text weight="medium" size="3">
              {subTotal} DH
            </Text>
          </Flex>
          <Flex align="center" justify="between">
            <Text weight="medium" size="3">
              Shipping
            </Text>
            <Text weight="medium" size="3">
              {deleveryCharges} DH
            </Text>
          </Flex>
        </Box>
        <Flex
          className="border-t px-3 py-4"
          justify="between"
          gap="2"
          align="center"
        >
          <Text size="3" weight="medium" className="text-gray-700 py-2">
            Total
          </Text>
          <Text size="3" weight="medium" className="text-gray-700 py-2">
            {total} DH
          </Text>
        </Flex>
      </Box>
      <Link href="/checkout">
        <button className="w-full bg-green-700 py-3 text-center px-2 cursor-pointer text-gray-100 hover:bg-green-800 transition">
          <Text size="3" weight="medium">
            Checkout
          </Text>
        </button>
      </Link>
    </Box>
  );
};

export default ShoppingCartSummary;
