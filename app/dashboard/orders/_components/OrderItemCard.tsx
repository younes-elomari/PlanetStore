import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import noImage from "@/public/no-image-placeholder.webp";
import { Order_Item } from "@prisma/client";
import prisma from "@/prisma/client";
import { calculatePriceWithOffer } from "@/app/utils/calculatePriceWithOffer";
import { calculateTotal } from "@/app/utils/calculateTotal";

interface Props {
  orderItem: Order_Item;
}

const OrderItemCard = async ({ orderItem }: Props) => {
  const product = await prisma.product.findUnique({
    where: { id: orderItem.productId },
  });

  if (!product) return null;

  return (
    <Box className="p-3 border border-gray-200 rounded-md shadow-md">
      <Flex gap="4">
        <Image src={noImage} width={120} height={60} alt="no Image" />

        {/* {product.backgroundImage ? (
          <CldImage
            src={product.backgroundImage}
            alt={product.slug}
            width={120}
            height={60}
          />
        ) : (
          <Image src={noImage} width={120} height={60} alt="no Image" />
        )} */}
        <Box className="space-y-3">
          <Box>
            <Text size="2" weight="medium">
              {product?.name}
            </Text>
          </Box>
          <Flex gap="8" justify="between" align="center" className="flex-wrap">
            <Text size="2" weight="medium">
              Price with offer:{" "}
              {calculatePriceWithOffer(
                parseFloat(orderItem?.unitPrice.toString()),
                product?.discount
              ).toLocaleString()}{" "}
              DH
            </Text>
            <Text size="2" weight="medium">
              offer: {product.discount} %
            </Text>
            <Text size="2" weight="medium">
              Quantity: {orderItem.quantity}
            </Text>
            <Text size="2" weight="medium">
              Total:{" "}
              {calculateTotal(
                parseFloat(product?.unitPrice.toString()),
                product?.discount,
                orderItem.quantity
              ).toLocaleString()}{" "}
              DH
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default OrderItemCard;
