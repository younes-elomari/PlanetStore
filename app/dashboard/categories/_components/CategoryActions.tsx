
import SearchComponent from "@/app/_components/SearchComponent";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";

const CategoryActions = () => {
  return (
    <Box>
      <Flex justify="between" gap="4" align="center">
        <Flex align="center" gap="4" className="text-violet-900">
          <BiCategoryAlt size="25" />
          <Heading size="4">Category List.</Heading>
        </Flex>
        <Button>
          <Link href="categories/new">Add Category</Link>
        </Button>
      </Flex>
      <Box className="space-y-2">
        <Text weight="medium" size="2">
          Search:
        </Text>
        <SearchComponent />
      </Box>
    </Box>
  );
};

export default CategoryActions;
