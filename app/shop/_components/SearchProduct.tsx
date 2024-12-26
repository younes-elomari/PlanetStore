"use client";
import { Box, Text, TextField } from "@radix-ui/themes";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";

const SearchProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeSearchName = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("productName", name);
    router.push("?" + params.toString());
  };

  return (
    <Box className="space-y-2">
      <Text weight="medium" size="3">
        Search Product:
      </Text>
      <TextField.Root
        onChange={(e) => changeSearchName(e.target.value)}
        type="search"
        placeholder="Search..."
      >
        <TextField.Slot>
          <FaMagnifyingGlass />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};

export default SearchProduct;
