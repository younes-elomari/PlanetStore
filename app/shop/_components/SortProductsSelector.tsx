"use client";
import { Product } from "@prisma/client";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const SortProductsSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("orderBy", value);
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text weight="medium" size="3">
        Filter Products:
      </Text>
      <Select.Root onValueChange={(value) => handleChange(value)}>
        <Select.Trigger placeholder="Filter By:" />
        <Select.Content>
          {sortNames.map((item) => (
            <Select.Item key={item.label} value={item.value || "None"}>
              <Text weight="medium" className="text-right">
                {item.label}
              </Text>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

const sortNames: { label: string; value?: keyof Product }[] = [
  { label: "None" },
  { label: "Newest", value: "createdAt" },
  { label: "Best Salles", value: "orderTimes" },
  { label: "Price", value: "unitPrice" },
  { label: "Best Offer", value: "discount" },
];

export default SortProductsSelector;
