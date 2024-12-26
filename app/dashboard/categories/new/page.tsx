import { Box, Flex, Heading } from "@radix-ui/themes";
import { MdOutlineAddToPhotos } from "react-icons/md";
import CategoryForm from "../_components/CategoryForm";

const NewCategoryPage = () => {
  return (
    <Box className="py-4 space-y-8">
      <Flex align="center" gap="4" className="text-violet-900">
        <MdOutlineAddToPhotos size="25" />
        <Heading size="4">Add New Category.</Heading>
      </Flex>
      <CategoryForm />
    </Box>
  );
};

export default NewCategoryPage;
