import { Box, Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import emptyCard from "@/public/emptyCard.png";

const EmptyShoppingCart = () => {
  return (
    <Box className="text-center max-w-96 m-auto space-y-5">
      <Heading size="8" weight="light" className="text-gray-700">
        Your Cart is Empty
      </Heading>
      <Heading size="5" weight="light" className=" text-gray-500 spac">
        Looks like you haven&apos;t added anything to your cart yet.
      </Heading>
      <Image src={emptyCard} alt="empty shopping card" />
      <Button color="green" className="uppercase">
        <Link href="/">Add Products to Cart</Link>
      </Button>
    </Box>
  );
};

export default EmptyShoppingCart;
