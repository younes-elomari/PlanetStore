"use client";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Product } from "@prisma/client";
import { calculatePriceWithOffer } from "../utils/calculatePriceWithOffer";
import { FaCheck } from "react-icons/fa6";
import { ItemInArray } from "../utils/itemInArray";
import toast, { Toaster } from "react-hot-toast";
import useProductsStore from "../store";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { shoppingCartProducts, addShoppingCartProduct } = useProductsStore();
  const badgeColor = product.discount >= 15 ? "bg-red-700" : "bg-green-700";

  return (
    <Box className="space-y-4 mt-2">
      <Link href={`/products/${product.slug}`}>
        <Box className="relative bg-gray-100 rounded-sm p-2">
          {product.discount !== 0 && (
            <Text
              className={`absolute top-2 left-2 px-4 py-1 text-sm ${badgeColor} text-gray-50 font-medium`}
            >
              -{product.discount}%
            </Text>
          )}
          <div className="h-[240px] w-full overflow-hidden">
            <img
              src={product.iconImage || "/no-image-placeholder.webp"}
              alt={product.slug}
              className="object-cover w-full h-full"
            />
          </div>
        </Box>
      </Link>
      <Box className="space-y-2">
        <Box>
          <Heading size="3" weight="medium" className="text-gray-600">
            {product.name}
          </Heading>
          <Flex align="center" gap="2">
            <Text size="3" weight="medium" className="text-gray-700">
              {calculatePriceWithOffer(
                parseFloat(product.unitPrice.toString()),
                product.discount
              )}{" "}
              DH
            </Text>
            {product.discount !== 0 && (
              <Text
                size="2"
                weight="medium"
                className="text-gray-500 line-through"
              >
                {parseFloat(product.unitPrice.toString()).toLocaleString()} DH
              </Text>
            )}
          </Flex>
        </Box>
        <Button
          disabled={ItemInArray(shoppingCartProducts, product.id)}
          onClick={() => {
            addShoppingCartProduct({ ...product, quantity: 1 });
            toast.success("product on Shopping Cart.", {
              duration: 700,
            });
          }}
          color="grass"
          radius="none"
        >
          <Text className="px-2 cursor-pointer w-24 place-items-center">
            {ItemInArray(shoppingCartProducts, product.id) ? (
              <FaCheck />
            ) : (
              "Add To Cart"
            )}
          </Text>
        </Button>
        <Toaster />
      </Box>
    </Box>
  );
};

export default ProductCard;
