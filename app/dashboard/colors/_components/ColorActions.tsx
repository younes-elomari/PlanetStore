import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import { BiLayout } from "react-icons/bi";
import SearchComponent from "@/app/_components/SearchComponent";

const ColorActions = () => {
  return (
    <Box>
      <Flex justify="between" gap="4" align="center">
        <Flex align="center" gap="4" className="text-violet-900">
          <BiLayout size="25" />
          <Heading size="4">Color List.</Heading>
        </Flex>
        <Button>
          <Link href="colors/new">Add Color</Link>
        </Button>
      </Flex>
      <Box className="space-y-2">
        <Text weight="medium" size="2">
          Search:
        </Text>
        <SearchComponent />
      </Box>
    </Box>
  );
}

export default ColorActions