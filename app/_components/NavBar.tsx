"use client";
import { Box, Text, Flex } from "@radix-ui/themes";
import { MdOutlineShoppingCart } from "react-icons/md";
import React from "react";
import Link from "next/link";
import useProductsStore from "../store";
import PhoneNavBarItems from "./PhoneNavBarItems";

const NavBar = () => {
  return (
    <nav>
      <BottomNav />
    </nav>
  );
};

const BottomNav = () => {
  return (
    <Flex align="center" justify="between" className="space-x-3 py-4">
      <Flex align="center" gap="2">
        <div className="md:hidden">
          <PhoneNavBarItems />
        </div>
        <img
          src="/planetStoreLogo.svg"
          alt="planetStore logo"
          width={160}
          height={25}
        />
      </Flex>
      <NavListItems />
      <NavActions />
    </Flex>
  );
};

const NavActions = () => {
  const { shoppingCartProducts } = useProductsStore();

  return (
    <Flex align="center" className="space-x-4 text-gray-700">
      <Link href="/shoppingCart">
        <button className="relative cursor-pointer px-2 py-2 text-base font-semibold">
          <Text
            size="1"
            weight="medium"
            className="absolute top-0 left-0 w-5 h-5 rounded-full bg-red-700 text-white place-items-center place-content-center"
          >
            {shoppingCartProducts.length}
          </Text>
          <Link href="/shoppingCart">
            <MdOutlineShoppingCart size={24} />
          </Link>
        </button>
      </Link>
    </Flex>
  );
};

export const NavListItems = () => {
  return (
    <Box className="center">
      <ul className="hidden md:inline-flex space-x-6">
        <Link
          href="/"
          className="list-item text-base font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition"
        >
          Home
        </Link>
        <Link
          href="/shop"
          className="list-item text-base font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition"
        >
          Shop
        </Link>
        <Link
          href="/about"
          className="list-item text-base font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition"
        >
          About us
        </Link>
        <Link
          href="/contact"
          className="list-item text-base font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition"
        >
          Contact us
        </Link>
      </ul>
    </Box>
  );
};

export default NavBar;
