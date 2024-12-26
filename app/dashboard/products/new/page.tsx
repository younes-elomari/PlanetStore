import ProductForm from "../_components/ProductForm";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { BiLayerPlus } from "react-icons/bi";

const NewProductPage = () => {
  return (
    <Box className="py-4 space-y-8">
      <Flex align="center" gap="4" className="text-violet-900">
        <BiLayerPlus size="25" />
        <Heading size="4">Add New Product.</Heading>
      </Flex>
      <ProductForm />
    </Box>
  );
};

export default NewProductPage;
