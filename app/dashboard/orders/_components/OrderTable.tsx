import { Box, Table, Text } from "@radix-ui/themes";
import { Customer, Order } from "@prisma/client";
import OrderTableBody from "./OrderTableBody";

interface Props {
  orders: Order[];
  customers: Customer[];
}

const OrderTable = ({ orders, customers }: Props) => {
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
        <OrderTableBody orders={orders} customers={customers} />
      </Table.Root>
    </Box>
  );
};

const columns: { label: string; value?: keyof Order }[] = [
  { label: "View" },
  { label: "Order Date", value: "orderDate" },
  { label: "Customer", value: "customerId" },
  { label: "Status", value: "orderStatus" },
  { label: "Shipped Date", value: "shippedDate" },
  { label: "Delete" },
];

export const orderTableColumnNames = columns.map((column) => column.value);

export default OrderTable;
