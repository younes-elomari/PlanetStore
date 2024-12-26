import { Customer } from "@prisma/client";
import { Box, Heading, Flex, Text } from "@radix-ui/themes";

interface Props {
  customer: Customer;
}

const CustomerDetails = ({ customer }: Props) => {
  return (
    <Box className="p-3 border border-gray-200 rounded-md shadow-md">
      <Heading size="6" weight="light" className="my-4 text-gray-900">
        Custommer Information
      </Heading>
      <Flex direction="column" gap="2" className="text-gray-700">
        <Text size="3" weight="medium">
          Full Name:{" "}
          <span className="text-gray-900">{customer.fullName}</span>
        </Text>
        <Text size="3" weight="medium">
          Phone: <span className="text-gray-900">{customer.phone}</span>
        </Text>
        <Text size="3" weight="medium">
          Email: <span className="text-gray-900">{customer.email}</span>
        </Text>
        <Text size="3" weight="medium">
          Address: <span className="text-gray-900">{customer.address}</span>
        </Text>
        <Text size="3" weight="medium">
          City: <span className="text-gray-900">{customer.city}</span>
        </Text>
      </Flex>
    </Box>
  );
};

export default CustomerDetails;
