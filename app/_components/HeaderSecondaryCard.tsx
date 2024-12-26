import { Box, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import noImage from "@/public/no-image-placeholder.webp";

interface Props {
  subHeading: string;
  heading: string;
  img?: string;
}

const HeaderSecondaryCard = ({ subHeading, heading, img }: Props) => {
  return (
    <Box className="relative rounded-sm text-gray-800">
      <Box className="absolute w-full h-full place-content-center overflow-hidden z-[-5]">
        <Image
          src={img || noImage}
          alt="no image"
          className="object-cover w-full h-full"
          width={1920}
          height={1080}
        />
      </Box>
      <Box className="w-full h-full place-content-center place-items-start items-center justify-center ">
        <div className="px-8 py-20 max-w-[420px] text-gray-100">
          <Text size="8" weight="light" className="uppercase">
            {subHeading}
          </Text>
          <Heading size="6" weight="light" className="uppercase">
            {heading}
          </Heading>
        </div>
      </Box>
    </Box>
  );
};

export default HeaderSecondaryCard;
