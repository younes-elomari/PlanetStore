import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { BiGridHorizontal } from "react-icons/bi";
import prisma from "@/prisma/client";
import _ from "lodash";
import Pagination from "@/app/_components/Pagination";
import MessageTable from "./_components/MessageTable";
import AlertText from "../_components/AlertText";
import pagesCount from "@/app/utils/pagesCount";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

const MessagePage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = pagesCount.messagesPageCount;

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayMessages = await prisma.message.count({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const messageCount = await prisma.message.count();

  return (
    <Box className="py-4 space-y-6">
      <Flex justify="between" gap="4" align="center">
        <Flex align="center" gap="4" className="text-violet-900">
          <BiGridHorizontal size="25" />
          <Heading size="4">Messages List.</Heading>
        </Flex>
        <Text size="2" weight="medium" className="text-red-600">
          Today Messages: {todayMessages}
        </Text>
      </Flex>
      {messageCount === 0 ? (
        <AlertText alertText="messages" />
      ) : (
        <Box className="space-y-2">
          <Text weight="medium" size="2">
            Messages Table:{" "}
            <span className="text-gray-700">
              ( {messageCount} number of genres )
            </span>
          </Text>
          <MessageTable messages={messages} />
        </Box>
      )}

      <Pagination
        currentPage={page}
        itemCount={messageCount}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default MessagePage;
