import { Box, Grid } from "@radix-ui/themes";
import React from "react";
import ShoppingProductCard from "./ShoppingProductCard";
import ShoppingCartSummary from "./ShoppingCartSummary";
import  { CartProduct } from "@/app/store";

interface Props {
  shoppingCartProducts: CartProduct[];
}

const ShoppingCartGrid = ({ shoppingCartProducts }: Props) => {
  return (
    <Grid columns={{ initial: "1", md: "1fr 300px" }} gap="4">
      <Box className="space-y-2">
        {shoppingCartProducts.map((product) => (
          <ShoppingProductCard key={product.id} product={product} />
        ))}
      </Box>
      <ShoppingCartSummary products={shoppingCartProducts} />
    </Grid>
  );
};

export default ShoppingCartGrid;
