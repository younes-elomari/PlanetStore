import { Product } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";

const columns: { label: string; value?: keyof Product }[] = [
  { label: "Name", value: "name" },
  { label: "Purchased", value: "orderTimes" },
];

interface Props {
  products: Product[];
}

const TopProductTable = ({ products }: Props) => {
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

      <Table.Body>
        {products.map((product) => (
          <Table.Row key={product.id} className="text-gray-500">
            <Table.Cell className="content-center">
              <Text size="2" className="font-medium whitespace-nowrap">
                {product.name}
              </Text>
            </Table.Cell>

            <Table.Cell className="content-center">
              <Text
                size="2"
                className="font-medium whitespace-nowrap text-red-700"
              >
                {product.orderTimes}
              </Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TopProductTable;
