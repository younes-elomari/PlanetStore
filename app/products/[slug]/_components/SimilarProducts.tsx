import ProductsGrid from "@/app/_components/ProductsGrid";
import { Product } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { MdOutlineTravelExplore } from "react-icons/md";

interface Props {
  products: Product[];
}

const SimilarProducts = ({ products }: Props) => {
  return (
    <Box className="space-y-6 text-gray-800">
      <Box className="space-y-3">
        <Flex align="center" gap="2">
          <MdOutlineTravelExplore size={18} />
          <Text weight="medium" size="3">
            simillar products
          </Text>
        </Flex>
        <ProductsGrid products={products} />
      </Box>
    </Box>
  );
};

export default SimilarProducts;
