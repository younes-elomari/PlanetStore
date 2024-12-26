"use client";
import { Color, Color_Item } from "@prisma/client";
import {
  Box,
  Card,
  Flex,
  Heading,
} from "@radix-ui/themes";
import React from "react";
import ColorCheckBox from "./ColorCheckBox";
import DeleteColorItem from "./DeleteColorItem";

interface Props {
  productId: number;
  productColorItems: Color_Item[];
  colors: Color[];
}

const ColorProductSelect = ({
  colors,
  productId,
  productColorItems,
}: Props) => {
  return (
    <Card className="space-y-6">
      <Box className="space-y-4">
        <Heading size="3" className="text-gray-700">
          Colors:
        </Heading>
        <Flex gap="3">
          {colors.map((color) => (
            <ColorCheckBox
              key={color.id}
              color={color}
              productId={productId}
              productColorItems={productColorItems}
            />
          ))}
        </Flex>
      </Box>
      <Box className="space-y-4">
        <Heading size="3" className="text-gray-700">
          Delete Product Colors:
        </Heading>
        <Flex gap="3">
          {productColorItems.map((item) => (
            <DeleteColorItem key={item.id} colors={colors} item={item} />
          ))}
        </Flex>
      </Box>
    </Card>
  );
};

export default ColorProductSelect;
