import { Box, Flex, Heading } from "@radix-ui/themes";
import { BiFace } from "react-icons/bi";

const CustomersActions = () => {
  return (
    <Box className="space-y-3">
      <Flex align="center" gap="4" className="text-violet-900">
        <BiFace size="25" />
        <Heading size="4">Customers List.</Heading>
      </Flex>
    </Box>
  );
};

export default CustomersActions;
