import prisma from "@/prisma/client";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { BiGridHorizontal } from "react-icons/bi";
import DeleteMessageButton from "../_components/DeleteMessageButton";

interface Props {
  params: Promise<{ id: string }>;
}

const MessageDetailsPage = async ({ params }: Props) => {
  const message = await prisma.message.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!message) notFound();

  return (
    <Box className="text-gray-600 py-4 space-y-6">
      <Flex justify="between" gap="4" align="center">
        <Flex align="center" gap="4" className="text-violet-900">
          <BiGridHorizontal size="25" />
          <Heading size="4">Messages Details.</Heading>
        </Flex>
        <DeleteMessageButton messageId={message.id} />
      </Flex>
      <Box>
        <Text size="3" weight="medium">
          Full Name: <span className="text-gray-800">{message.fullName}</span>
        </Text>
      </Box>
      <Box>
        <Text size="3" weight="medium">
          Phone: <span className="text-gray-800">{message.phone}</span>
        </Text>
      </Box>
      <Box>
        <Text size="3" weight="medium">
          Date:{" "}
          <span className="text-gray-800">
            {message.createdAt.toLocaleString()}
          </span>
        </Text>
      </Box>
      <Box>
        <Text size="3" weight="medium">
          Message: <span className="text-gray-800">{message.message}</span>
        </Text>
      </Box>
    </Box>
  );
};

export default MessageDetailsPage;
