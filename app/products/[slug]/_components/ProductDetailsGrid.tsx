"use client";
import { Box, Button, Flex, Heading, Text, Grid } from "@radix-ui/themes";
import { Category, Color, Product } from "@prisma/client";
import { calculatePriceWithOffer } from "@/app/utils/calculatePriceWithOffer";
import ReactMarkdown from "react-markdown";
import useProductsStore from "@/app/store";
import { FaCheck } from "react-icons/fa6";
import { ItemInArray } from "@/app/utils/itemInArray";
import { calculateTotal } from "@/app/utils/calculateTotal";
import { formatQuantityNumber } from "@/app/utils/formatQuantityNumber";

interface Props {
  product: Product;
  category: Category | null;
  productColors: (Color | null)[];
}

const ProductDetailsGrid = ({ product, category, productColors }: Props) => {
  const {
    shoppingCartProducts,
    addShoppingCartProduct,
    updateShoppingCartProduct,
  } = useProductsStore();

  const shoppingCartPtoduct = shoppingCartProducts.find(
    (p) => p.id === product.id
  ) || { ...product, quantity: 1 };

  const IncrementProductQuantity = () => {
    if (!ItemInArray(shoppingCartProducts, product.id))
      addShoppingCartProduct(shoppingCartPtoduct);
    const updatedShoppingCartProduct = shoppingCartPtoduct;
    updatedShoppingCartProduct.quantity++;
    updateShoppingCartProduct(updatedShoppingCartProduct);
  };

  const decrementProductQuantity = () => {
    const updatedShoppingCartProduct = shoppingCartPtoduct;
    updatedShoppingCartProduct.quantity--;
    updateShoppingCartProduct(updatedShoppingCartProduct);
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Box className="relative bg-gray-100 rounded-sm p-2">
        {product.discount !== 0 && (
          <Text className="absolute inline-block px-4 py-1 text-sm bg-green-800 text-gray-50 font-medium">
            -{product.discount}%
          </Text>
        )}
        <div className="max-h-[420px] w-full overflow-hidden">
          <img
            src={product.backgroundImage || "/no-image-placeholder.webp"}
            alt={product.slug}
            className="object-cover w-full h-full"
          />
        </div>
      </Box>
      <Box className="space-y-4">
        <Box className="space-y-1">
          <Heading size="2" weight="medium" className="text-gray-600">
            {category?.name}
          </Heading>
          <Heading size="6" weight="light" className="text-gray-900">
            {product.name}
          </Heading>
        </Box>
        <Flex align="center" gap="4">
          <Heading size="6" weight="medium" className="text-red-700">
            {calculatePriceWithOffer(
              parseFloat(product.unitPrice.toString()),
              product.discount
            )}{" "}
            DH
          </Heading>
          <Heading
            size="4"
            weight="medium"
            className="text-gray-500 line-through"
          >
            {parseFloat(product.unitPrice.toString()).toLocaleString()} DH
          </Heading>
        </Flex>
        <Box className="border-t border-b py-4">
          <ReactMarkdown className="text-gray-700">
            {product.description}
          </ReactMarkdown>
        </Box>

        <Box className="space-y-3">
          <Text size="3" weight="medium" className="text-gray-600">
            Colors:
          </Text>
          <Flex align="center" gap="2">
            {productColors.map((color) => (
              <div
                key={color?.id}
                className="w-8 h-8 rounded-md"
                style={{
                  backgroundColor: `${color?.color}`,
                }}
              ></div>
            ))}
          </Flex>
        </Box>

        <Box className="space-y-3">
          <Text size="3" weight="medium" className="text-gray-600">
            Quantity:
          </Text>
          <Flex align="center" gap="4">
            <Button
              onClick={() => decrementProductQuantity()}
              disabled={shoppingCartPtoduct.quantity <= 1 ? true : false}
              radius="none"
              color="green"
            >
              <Text className="cursor-pointer w-4">-</Text>
            </Button>
            <Text slot="5" weight="medium">
              {formatQuantityNumber(shoppingCartPtoduct.quantity)}
            </Text>
            <Button
              onClick={() => IncrementProductQuantity()}
              radius="none"
              color="green"
            >
              <Text className="cursor-pointer w-4">+</Text>
            </Button>
          </Flex>
        </Box>
        <Box className="space-y-3">
          <Text size="3" weight="medium" className="text-gray-600">
            Total:
          </Text>
          <Heading size="6" weight="medium" className="text-red-700">
            {calculateTotal(
              parseFloat(shoppingCartPtoduct.unitPrice.toString()),
              shoppingCartPtoduct.discount,
              shoppingCartPtoduct.quantity
            ).toLocaleString()}{" "}
            DH
          </Heading>
        </Box>
        <Button
          onClick={() => addShoppingCartProduct(shoppingCartPtoduct)}
          disabled={ItemInArray(shoppingCartProducts, product.id)}
          size="3"
          radius="none"
          color="red"
        >
          <Text
            size="2"
            weight="medium"
            className="uppercase px-3 cursor-pointer w-36 place-items-center"
          >
            {ItemInArray(shoppingCartProducts, product.id) ? (
              <FaCheck />
            ) : (
              "Add To Card"
            )}
          </Text>
        </Button>
        <Box>
          {shoppingCartPtoduct.deleveryChrge ? (
            <Text size="2" weight="medium" className="text-gray-500">
              Home Delivery: {shoppingCartPtoduct.deleveryChrge} DH
            </Text>
          ) : (
            <Text size="2" weight="medium" className="text-red-500">
              Free Shipping
            </Text>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductDetailsGrid;
