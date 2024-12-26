import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FaRegFaceSmileBeam } from "react-icons/fa6";

interface Props {
  alertText: string;
}

const AlertText = ({ alertText }: Props) => {
  return (
    <Flex
      className="p-4 bg-red-100 text-red-700 font-medium rounded-sm"
      gap="4"
      align="center"
    >
      <FaRegFaceSmileBeam size="25" />
      <Text size="3">
        Looks like you d&apos;ont have any {alertText} at the moment. Why not add
        some to get started?
      </Text>
    </Flex>
  );
};

export default AlertText;
