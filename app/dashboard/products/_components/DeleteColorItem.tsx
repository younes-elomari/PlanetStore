"use client";
import { Color, Color_Item } from "@prisma/client";
import {
  AlertDialog,
  Button,
  Card,
  Flex,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/app/_components/Spinner";

interface Props {
  colors: Color[];
  item: Color_Item;
}

const DeleteColorItem = ({ colors, item }: Props) => {
    const router = useRouter();
    const [isDeleting, setDeleting] = useState(false);
    const [error, setError] = useState(false);


  const getColor = (colorId: number) => {
    return colors.find((color) => color.id === colorId);
  };

  const deleteItem = async (colorItemId: number) => {
    
    try {
      setDeleting(true);
      const response = await axios.delete("/api/color_items/" + colorItemId);
      if (response) setDeleting(false);
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <Card>
        <Flex align="center" gap="8" className="flex-wrap">
          <div
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "5px",
              backgroundColor: `${getColor(item.colorId)?.color}`,
            }}
          ></div>
          <Flex gap="2">
            <IoIosCloseCircleOutline
              onClick={() => deleteItem(item.id)}
              size="20"
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            />
            {isDeleting && <Spinner />}
          </Flex>
        </Flex>
      </Card>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This color item could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteColorItem;
