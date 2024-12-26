"use client";
import { Category } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  categories: Category[];
}

const CategoryIdSelect = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Box>
      <Select.Root
        onValueChange={(categoryId) => {
          const params = new URLSearchParams(searchParams);
          params.set("categoryId", categoryId);
          router.push("?" + params.toString());
        }}
      >
        <Select.Trigger placeholder="Category" />
        <Select.Content>
          <Select.Item value="All">All</Select.Item>
          {categories.map((category) => (
            <Select.Item key={category.id} value={category.id.toString()}>
              {category.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default CategoryIdSelect;
