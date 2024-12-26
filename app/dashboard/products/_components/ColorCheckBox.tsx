"use client";
import { Color, Color_Item } from "@prisma/client";
import { Callout, Card, Checkbox, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import _ from "lodash";

interface Props {
  productColorItems: Color_Item[];
  productId: number;
  color: Color;
}

const ColorCheckBox = ({ color, productId, productColorItems }: Props) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submitColorItem = async () => {
    try {
      setSubmitting(true);
      const response = await axios.post("/api/color_items", {
        colorId: color.id.toString(),
        productId: productId.toString(),
      });
      if (response.data) setSubmitting(false);
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  };

  const desableButton = () => {
    const uniqueColorIds = _.uniqBy(productColorItems, "colorId").map(
      (item) => item.colorId
    );

    return uniqueColorIds.includes(color.id) ? true : false;
  };

  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Card>
        <Flex align="center" gap="8" className="flex-wrap">
          <div
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "5px",
              backgroundColor: `${color.color}`,
            }}
          ></div>
          <Checkbox
            disabled={isSubmitting || desableButton()}
            defaultChecked={desableButton()}
            onClick={() => submitColorItem()}
          />
        </Flex>
      </Card>
    </>
  );
};

export default ColorCheckBox;
