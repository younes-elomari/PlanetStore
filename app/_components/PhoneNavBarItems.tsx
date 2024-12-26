import { Box, Button, DropdownMenu } from "@radix-ui/themes";
import React from "react";
import { RiMenu4Fill } from "react-icons/ri";

const PhoneNavBarItems = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" color="gray">
          <RiMenu4Fill className="cursor-pointer" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Home</DropdownMenu.Item>
        <DropdownMenu.Item>Shop</DropdownMenu.Item>
        <DropdownMenu.Item>About us</DropdownMenu.Item>
        <DropdownMenu.Item>Contact us</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default PhoneNavBarItems;
