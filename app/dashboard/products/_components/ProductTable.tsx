import { Table, Text } from "@radix-ui/themes";
import { Category, Product } from "@prisma/client";
import ProductTableBody from "./ProductTableBody";

interface Props {
  products: Product[];
  categories: Category[];
}

const ProductTable = ({ products, categories }: Props) => {
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
      <ProductTableBody products={products} categories={categories} />
    </Table.Root>
  );
};

const columns: { label: string; value?: keyof Product }[] = [
  { label: "Product Image" },
  { label: "Name", value: "name" },
  { label: "Price", value: "unitPrice" },
  { label: "Offre", value: "discount" },
  { label: "Purchased", value: "orderTimes" },
  { label: "Create Date", value: "createdAt" },
  { label: "Category", value: "categoryId" },
  { label: "Edit" },
  { label: "Delete" },
];
export default ProductTable;
