import { Button, Table, Text } from "@radix-ui/themes";
import { AiOutlineImport } from "react-icons/ai";
import { Color } from "@prisma/client";
import Link from "next/link";
import DeleteColorButton from "./DeleteColorButton";

interface Props {
  colors: Color[];
}

const ColorTable = ({ colors }: Props) => {
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
        <Table.Body>
          {colors.map((color) => (
            <Table.Row key={color.id} className=" text-gray-500">
              <Table.Cell className="content-center">
                <div
                  className="rounded-sm"
                  style={{
                    backgroundColor: `${color.color}`,
                    width: "45px",
                    height: "45px",
                    borderRadius: "5px",
                    border: "2px solid #999999",
                  }}
                ></div>
              </Table.Cell>
              <Table.Cell className="bg-slate-300 content-center">
                <Text size="2" className="font-medium whitespace-nowrap">
                  {color.color}
                </Text>
              </Table.Cell>
              <Table.Cell className="content-center">
                <Text size="2" className="font-medium whitespace-nowrap">
                  {color.name}
                </Text>
              </Table.Cell>
              <Table.Cell className="content-center">
                <Text size="2" className="font-medium whitespace-nowrap">
                  {color.slug}
                </Text>
              </Table.Cell>
              <Table.Cell className="content-center">
                <Button size="1" color="violet" variant="soft">
                  <Link href={`/dashboard/colors/edit/${color.id}`}>
                    <AiOutlineImport size="15" />
                  </Link>
                </Button>
              </Table.Cell>
              <Table.Cell className="content-center">
                <DeleteColorButton colorId={color.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

const columns: { label: string; value?: keyof Color }[] = [
  { label: "Color" },
  { label: "Hex", value: "color" },
  { label: "Name", value: "name" },
  { label: "Slug", value: "slug" },
  { label: "Edit" },
  { label: "Delete" },
];

export default ColorTable;
