import { Grid } from "@radix-ui/themes";
import React from "react";
import { Product } from "@prisma/client";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductsGrid = ({ products }: Props) => {
  return (
    <Grid columns={{ initial: "2", md: "4", lg: "5" }} gap="4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsGrid;
