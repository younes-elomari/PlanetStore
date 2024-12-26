import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { CartProduct } from "@/app/store";
import { calculateTotal } from "@/app/utils/calculateTotal";

interface Props {
  product: CartProduct;
}

const CheckoutProductCard = ({ product }: Props) => {
  return (
    <Box className="border p-3">
      <Flex align="center" justify="between" gap="4">
        <Flex align="center" gap="4">
          <Box className="max-w-14">
            <div className="h-[50px] w-[50px]">
              <img
                src={product.iconImage || "/no-image-placeholder.webp"}
                alt={product.slug}
                className="object-cover w-full h-full"
              />
            </div>
          </Box>
          <Box className="space-y-2">
            <Heading size="3">{product.name}</Heading>

            <Flex align="center" gap="4" justify="between">
              <Text size="2" weight="medium">
                Items: {product.quantity}
              </Text>
              <Text size="2" weight="medium">
                Total:{" "}
                {calculateTotal(
                  parseFloat(product.unitPrice.toString()),
                  product.discount,
                  product.quantity
                ).toLocaleString()}{" "}
                DH
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CheckoutProductCard;
