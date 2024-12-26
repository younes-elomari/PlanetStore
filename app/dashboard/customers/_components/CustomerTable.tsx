import { Table, Text } from "@radix-ui/themes";
import { Customer } from "@prisma/client";
import CustomerTableBody from "./CustomerTableBody";

interface Props {
  customers: Customer[]
}

const CustomerTable = ({ customers }: Props) => {
  return (
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
      <CustomerTableBody customers={customers} />
    </Table.Root>
  );
};

const columns: { label: string; value?: keyof Customer }[] = [
  { label: "Full Name", value: "fullName" },
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Address", value: "address" },
  { label: "City", value: "city" },
  { label: "Country", value: "country" },
];
export default CustomerTable;
