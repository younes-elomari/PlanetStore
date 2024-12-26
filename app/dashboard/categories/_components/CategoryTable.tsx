import { Text, Table } from "@radix-ui/themes";
import { Category } from "@prisma/client";
import CategoryTableBody from "./CategoryTableBody";

interface Props {
  categories: Category[];
}

const CategoryTable = ({ categories }: Props) => {
  return (
    <div>
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
        <CategoryTableBody categories={categories} />
      </Table.Root>
    </div>
  );
};

const columns: { label: string; value?: keyof Category }[] = [
  { label: "IconBackground" },
  { label: "Name", value: "name" },
  { label: "Slug", value: "slug" },
  { label: "Edit" },
  { label: "Delete" },
];

export default CategoryTable;
