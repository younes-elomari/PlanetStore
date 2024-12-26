"use client";
import { Box } from "@radix-ui/themes";
import React from "react";
import CheckoutProductCard from "./CheckoutProductCard";
import useProductsStore from "@/app/store";

const CheckoutSummary = () => {
  const { shoppingCartProducts } = useProductsStore();
  return (
    <Box className="space-y-2">
      {shoppingCartProducts.map((product) => (
        <CheckoutProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default CheckoutSummary;
