"use client";
import {
  AlertDialog,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { AiOutlineDelete } from "react-icons/ai";
import useProductsStore, { CartProduct } from "@/app/store";
import { calculatePriceWithOffer } from "@/app/utils/calculatePriceWithOffer";
import { calculateTotal } from "@/app/utils/calculateTotal";
import { formatQuantityNumber } from "@/app/utils/formatQuantityNumber";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: CartProduct;
}

const ShoppingProductCard = ({ product }: Props) => {
  const { updateShoppingCartProduct, removeShoppingCartProduct } =
    useProductsStore();

  const incrementProductQuantity = () => {
    const updatedShoppingCartProduct = product;
    updatedShoppingCartProduct.quantity++;
    updateShoppingCartProduct(updatedShoppingCartProduct);
  };

  const decrementProductQuantity = () => {
    const updatedShoppingCartProduct = product;
    updatedShoppingCartProduct.quantity--;
    updateShoppingCartProduct(updatedShoppingCartProduct);
  };

  return (
    <Box className="border p-3">
      <Grid columns={{ initial: "1", md: "2" }} align="center">
        <Flex align="center" gap="4">
          <Box className="max-w-14">
            <div className="h-[60px] w-[60px] overflow-hidden">
              <img
                src={product.iconImage || "/no-image-placeholder.webp"}
                alt={product.slug}
                className="object-cover w-full h-full"
              />
            </div>
          </Box>
          <Heading size="3">{product.name}</Heading>
        </Flex>
        <Flex align="center" gap="4" justify="between">
          <Text size="3" weight="medium">
            {calculatePriceWithOffer(
              parseFloat(product.unitPrice.toString()),
              product.discount
            )}{" "}
            DH
          </Text>
          <Flex align="center" gap="2">
            <Button
              onClick={() => decrementProductQuantity()}
              disabled={product.quantity <= 1 ? true : false}
              radius="none"
              color="green"
              variant="outline"
            >
              <Text className="cursor-pointer w-4">-</Text>
            </Button>
            <Text slot="5" weight="medium">
              {formatQuantityNumber(product.quantity)}
            </Text>
            <Button
              onClick={() => incrementProductQuantity()}
              radius="none"
              color="green"
              variant="outline"
            >
              <Text className="cursor-pointer w-4">+</Text>
            </Button>
          </Flex>
          <Text size="3" weight="medium">
            {calculateTotal(
              parseFloat(product.unitPrice.toString()),
              product.discount,
              product.quantity
            ).toLocaleString()}{" "}
            DH
          </Text>

          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <AiOutlineDelete size={20} className="cursor-pointer" />
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Description>
                <Text size="3" weight="medium">
                  Are you sure you want to delete this product from your
                  shopping cart? This action cannot be undone.
                </Text>
              </AlertDialog.Description>
              <Flex mt="4" gap="3">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    <Text className="cursor-pointer">Cancel</Text>
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    color="red"
                    onClick={() => {
                      removeShoppingCartProduct(product.id);
                      toast.success("Product has been removed", {
                        duration: 700,
                      });
                    }}
                  >
                    <Text className="cursor-pointer">Delete</Text>
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
      </Grid>
      <Toaster />
    </Box>
  );
};

export default ShoppingProductCard;
