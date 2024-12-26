"use client";
import { useEffect } from "react";
import useProductsStore from "../store";
import { Box, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";

const OrderRecivedPage = () => {
  const { setInvoiceNumber, deleteShoppingCartProducts } = useProductsStore();

  useEffect(() => {
    setInvoiceNumber(""), deleteShoppingCartProducts();
  }, []);

  return (
    <Box className="space-y-4 mb-6">
      <Box className="space-y-2">
        <Heading size="5" weight="light" className="text-green-700">
          Thank you, we have received your order.
        </Heading>
        <Heading dir="rtl" size="5" weight="light" className="text-green-700">
          .شكراً، لقد تلقينا طلبك
        </Heading>
      </Box>
      <Box className="space-x-2 text-gray-700">
        <Text size="2" weight="medium">
          We hope you had a wonderful shopping experience with us. Meeting our
          customers needs is our top priority. We will contact you shortly to
          confirm your order and inform you of the delivery date.
        </Text>
        <Text size="2" weight="medium">
          نأمل أنك حظيت بتجربة تسوق رائعة معنا. توفير ما يحتاجه زبائننا هو
          أولويتنا. سنتصل بك في أقرب وقت من أجل تأكيد طلبك وإخبارك بموعد
          التسليم.
        </Text>
      </Box>
    </Box>
  );
};

export const metadata: Metadata = {
  title: "PlanetStore - orderRecived",
  description:
    "Meeting our customers needs is our top priority. We will contact you shortly to confirm your order and inform you of the delivery date.",
};

export default OrderRecivedPage;
