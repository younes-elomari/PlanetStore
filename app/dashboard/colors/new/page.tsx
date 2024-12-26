import { Box, Flex, Heading } from "@radix-ui/themes";
import { TbTablePlus } from "react-icons/tb";
import ColorForm from "../_components/ColorForm";

const NewColorPage = () => {
  return (
    <Box className="py-4 space-y-8">
      <Flex align="center" gap="4" className="text-violet-900">
        <TbTablePlus size="25" />
        <Heading size="4">Add New Color.</Heading>
      </Flex>
      <ColorForm />
    </Box>
  );
};

export default NewColorPage;
