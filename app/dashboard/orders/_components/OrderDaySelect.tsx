"use client";
import { Box, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  days: number[];
}

const OrderDaySelect = ({ days }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Box>
      <Select.Root
        onValueChange={(day) => {
          const params = new URLSearchParams(searchParams);
          params.set("day", day);
          router.push("?" + params.toString());
        }}
      >
        <Select.Trigger placeholder="Day" />
        <Select.Content>
          <Select.Item value="All">All</Select.Item>
          {days.map((day) => (
            <Select.Item key={day} value={day.toString()}>
              {day}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default OrderDaySelect;
