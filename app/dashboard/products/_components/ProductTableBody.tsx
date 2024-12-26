import { Badge, Button, Table, Text } from "@radix-ui/themes";
import { Category, Product } from "@prisma/client";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";

interface Props {
  products: Product[];
  categories: Category[];
}

const ProductTableBody = ({ products, categories }: Props) => {
  const getCategory = (categoryId: number) => {
    return categories.find((categorie) => categorie.id === categoryId);
  };

  return (
    <Table.Body>
      {products.map((product) => (
        <Table.Row key={product.id} className=" text-gray-500">
          <Table.Cell className="content-center">
            <div className="h-full w-full max-h-[80px] max-w-[80px]">
              <img
                src={product.backgroundImage || "/no-image-placeholder.webp"}
                alt={product.slug}
                height={80}
                width={80}
                className="w-full h-full object-cover"
              />
            </div>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {product.name}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {parseFloat(product.unitPrice.toString()).toLocaleString()} DH
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              <Badge
                size="2"
                color={
                  product.discount >= 20
                    ? "red"
                    : product.discount >= 15
                    ? "purple"
                    : "green"
                }
              >
                {product.discount} %
              </Badge>
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text
              size="2"
              className="font-medium whitespace-nowrap text-red-700"
            >
              {product.orderTimes.toLocaleString()}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {product.createdAt.toLocaleDateString()}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              <Badge size="3" color="purple">
                {product.categoryId && getCategory(product.categoryId)?.name}
              </Badge>
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Button size="1" color="violet" variant="soft">
              <Link href={`/dashboard/products/edit/${product.id}`}>
                <BiEditAlt size="15" />
              </Link>
            </Button>
          </Table.Cell>
          <Table.Cell className="content-center">
            <DeleteProductButton productId={product.id} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default ProductTableBody;
