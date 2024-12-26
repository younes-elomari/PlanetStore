import { Box } from "@radix-ui/themes";
import { Metadata } from "next";
import ShoppingCartComponent from "./_components/ShoppingCartComponent";

const ShoppingCartPage = () => {
  return (
    <Box>
      <ShoppingCartComponent />
    </Box>
  );
};

export const metadata: Metadata = {
  title: "PlanetStore - shopping cart",
  description: "descover your products. in our shopping cart.",
};

export default ShoppingCartPage;
