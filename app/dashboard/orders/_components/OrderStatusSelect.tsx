"use client";
import { Order_Statuse } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  statuses: Order_Statuse[];
}

const OrderStatusSelect = ({ statuses }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Box>
      <Select.Root
        onValueChange={(status) => {
          const params = new URLSearchParams(searchParams);
          params.set("status", status);
          router.push("?" + params.toString());
        }}
      >
        <Select.Trigger placeholder="Status" />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status} value={status}>
              {status}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default OrderStatusSelect;
