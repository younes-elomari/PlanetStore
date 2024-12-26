import { Button, Table, Text } from "@radix-ui/themes";
import { Message } from "@prisma/client";
import Link from "next/link";
import DeleteMessageButton from "./DeleteMessageButton";
import { FaRegEye } from "react-icons/fa6";

interface Props {
  messages: Message[];
}

const MessageTableBody = ({ messages }: Props) => {
  return (
    <Table.Body>
      {messages.map((message) => (
        <Table.Row key={message.id} className=" text-gray-500">
          <Table.Cell className="content-center">
            <Button size="1" color="violet" variant="soft">
              <Link href={`/dashboard/messages/${message.id}`}>
                <FaRegEye size="15" />
              </Link>
            </Button>
          </Table.Cell>
          <Table.Cell className="bg-slate-300 content-center">
            <Text size="2" className=" font-medium whitespace-nowrap">
              {message.fullName}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {message.phone}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {message.email}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {message.createdAt.toLocaleString()}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <DeleteMessageButton messageId={message.id} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default MessageTableBody;
