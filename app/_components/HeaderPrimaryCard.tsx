import { Box, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import headerData from "@/app/data/headerData.json";
import noImage from "@/public/no-image-placeholder.webp";

const HeaderPrimaryCard = () => {
  return (
    <Box className="relative rounded-sm text-gray-800">
      <Box className="absolute w-full h-full place-content-center overflow-hidden z-[-5]">
        <Image
          src={headerData.primaryHeaderCard.backgroundImage || noImage}
          alt="no image"
          className="object-cover w-full h-full"
          width={1920}
          height={1080}
        />
      </Box>
      <Box className="w-full h-full place-content-center place-items-start">
        <div className="px-10 py-32 max-w-[420px] text-gray-200">
          <Text size="6" weight="light" className="uppercase">
            {headerData.primaryHeaderCard.subHeading}
          </Text>
          <Heading size="8" weight="light" className="uppercase">
            {headerData.primaryHeaderCard.heading}
          </Heading>
        </div>
      </Box>
    </Box>
  );
};

export default HeaderPrimaryCard;
