import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BiLayer } from "react-icons/bi";

interface Props {
  label: string;
  count: number;
  href: string
}

const DashboardMainCard = ({ label, count, href }: Props) => {
  return (
    <Card>
      <Link href={href}>
        <Flex
          align="center"
          gap="4"
          className="text-red-600 hover:text-red-700 transform"
          justify="between"
        >
          <Flex align="center" gap="2">
            <BiLayer size="20" />
            <Text weight="medium" size="2">
              {label}:
            </Text>
          </Flex>
          <Heading weight="medium" size="4">
            {count}
          </Heading>
        </Flex>
      </Link>
    </Card>
  );
};

export default DashboardMainCard;
