import { Invoice } from "@prisma/client";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";

interface Props {
  invoice: Invoice;
}

const InvoiceDetails = ({ invoice }: Props) => {
  return (
    <Box className="p-3 border border-gray-200 rounded-md shadow-md">
      <Heading size="6" weight="light" className="my-4 text-gray-900">
        Invoice Information
      </Heading>
      <Flex direction="column" gap="2" className="text-gray-700">
        <Text size="3" weight="medium">
          Invoice Number:{" "}
          <span className="text-gray-900">{invoice.number}</span>
        </Text>
        <Text size="3" weight="medium">
          Invoice Date:{" "}
          <span className="text-gray-900">
            {invoice.invoiceDate.toLocaleString()}
          </span>
        </Text>
        <Text size="3" weight="medium">
          Invoice Total:{" "}
          <span className="text-gray-900">
            {parseFloat(invoice.invoiceTotal.toString()).toLocaleString()} DH
          </span>
        </Text>
        {invoice.dueDate && (
          <Text size="3" weight="medium">
            Due Date:{" "}
            <span className="text-gray-900">
              {parseFloat(invoice.dueDate.toString()).toLocaleString()} DH
            </span>
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default InvoiceDetails;
