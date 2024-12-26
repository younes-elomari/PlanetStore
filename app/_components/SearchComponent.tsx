"use client";
import { Flex } from "@radix-ui/themes";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";

const SearchComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchName = (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set("name", name);
      router.push("?" + params.toString());
    };

  return (
    <Flex align="center" className="sapce-x-4 border rounded-md px-3">
      <input
        onChange={(e) => searchName(e.target.value)}
        type="text"
        placeholder="Search"
        className="inputBorder w-full rounded-sm bg-transparent text-gray-700 font-normal outline-none py-1"
      />
      <FaMagnifyingGlass size={18} />
    </Flex>
  );
};

export default SearchComponent;
