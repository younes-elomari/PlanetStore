import { Customer, Order } from "@prisma/client";
import { Badge, Button, Text, Table } from "@radix-ui/themes";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa6";
import DeleteOrderButton from "./DeleteOrderButton";

interface Props {
  customers: Customer[];
  orders: Order[];
}

const OrderTableBody = ({ orders, customers }: Props) => {
  const getCustomerName = (customerId: number) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer?.fullName;
  };

  return (
    <Table.Body>
      {orders.map((order) => (
        <Table.Row key={order.id} className=" text-gray-500">
          <Table.Cell className="content-center">
            <Button size="1" color="violet" variant="soft">
              <Link href={`/dashboard/orders/${order.id}`}>
                <FaRegEye size="15" />
              </Link>
            </Button>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {order.orderDate.toLocaleDateString()}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {getCustomerName(order.customerId)}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              <Badge
                size="2"
                color={
                  order.orderStatus === "Processed"
                    ? "red"
                    : order.orderStatus === "Shipped"
                    ? "violet"
                    : "green"
                }
              >
                {order.orderStatus}
              </Badge>
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {order.shippedDate?.toLocaleDateString()}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <DeleteOrderButton orderId={order.id} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default OrderTableBody;
