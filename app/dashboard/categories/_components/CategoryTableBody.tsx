import { Button, Table, Text } from "@radix-ui/themes";
import { BiEditAlt } from "react-icons/bi";
import { Category } from "@prisma/client";
import Link from "next/link";
import DeleteCategoryButton from "./DeleteCategoryButton";

interface Props {
  categories: Category[];
}

const CategoryTableBody = ({ categories }: Props) => {
  return (
    <Table.Body>
      {categories.map((category) => (
        <Table.Row key={category.id}>
          <Table.Cell className="content-center">
            <div className="h-full w-full max-h-[80px] max-w-[80px]">
              <img
                src={category.iconBackground || "/no-image-placeholder.webp"}
                alt={category.slug}
                height={80}
                width={80}
                className="w-full h-full object-cover"
              />
            </div>
          </Table.Cell>
          <Table.Cell className="bg-slate-300 content-center">
            <Text
              size="2"
              className=" font-medium whitespace-nowrap text-gray-700"
            >
              {category.name}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text
              size="2"
              className="font-medium whitespace-nowrap text-gray-700"
            >
              {category.slug}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Button size="1" color="violet" variant="soft">
              <Link href={`/dashboard/categories/edit/${category.id}`}>
                <BiEditAlt size="15" />
              </Link>
            </Button>
          </Table.Cell>
          <Table.Cell className="content-center">
            <DeleteCategoryButton categoryId={category.id} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default CategoryTableBody;
