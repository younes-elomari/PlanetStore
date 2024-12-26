import { Flex } from "@radix-ui/themes";
import React from "react";
import { MdOutlineFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { RiWhatsappFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-10">
      <img
        src="/planetStoreLogo.svg"
        alt="planetStore logo"
        width={160}
        height={25}
      />
      <Flex align="center" gap="4" className="place-self-center text-gray-700">
        <MdOutlineFacebook
          size={22}
          className="cursor-pointer hover:text-gray-900 transition"
        />
        <RiInstagramFill
          size={22}
          className="cursor-pointer hover:text-gray-900 transition"
        />
        <RiWhatsappFill
          size={22}
          className="cursor-pointer hover:text-gray-900 transition"
        />
      </Flex>
      <div className="text-[15px] text-center font-medium">
        &copy; PlanetStore 2023. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
