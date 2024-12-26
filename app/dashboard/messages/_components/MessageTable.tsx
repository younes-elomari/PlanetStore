import { Box, Table, Text } from "@radix-ui/themes";
import { Message } from "@prisma/client";
import MessageTableBody from "./MessageTableBody";

interface Props {
  messages: Message[];
}

const MessageTable = ({ messages }: Props) => {
  return (
    <Box>
      <Table.Root size="3" variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className="whitespace-nowrap"
              >
                <Text size="2" weight="medium" className="text-gray-900">
                  {column.label}
                </Text>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <MessageTableBody messages={messages} />
      </Table.Root>
    </Box>
  );
};

const columns: { label: string; value?: keyof Message }[] = [
  { label: "View" },
  { label: "Full Name", value: "fullName" },
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Date", value: "createdAt" },
  { label: "Delete" },
];

export default MessageTable;
