import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { BiLayer } from "react-icons/bi";
import CategoryIdSelect from "./CategoryIdSelect";
import { Category } from "@prisma/client";
import SearchComponent from "@/app/_components/SearchComponent";

interface Props {
  categories: Category[];
}

const ProductActions = ({ categories }: Props) => {
  return (
    <Box className="space-y-3">
      <Flex justify="between" gap="4" align="center">
        <Flex align="center" gap="4" className="text-violet-900">
          <BiLayer size="25" />
          <Heading size="4">Product List.</Heading>
        </Flex>
        <Button>
          <Link href="products/new">Add Product</Link>
        </Button>
      </Flex>
      <Box className="space-y-2">
        <Text weight="medium" size="2">
          Filter:
        </Text>
        <Flex gap="4" className="flex-wrap">
          <CategoryIdSelect categories={categories} />
        </Flex>
      </Box>
      <Box className="space-y-2">
        <Text weight="medium" size="2">
          Search:
        </Text>
        <SearchComponent />
      </Box>
    </Box>
  );
};

export default ProductActions;
