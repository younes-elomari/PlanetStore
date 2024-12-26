import { Table, Text } from "@radix-ui/themes";
import { Customer } from "@prisma/client";

interface Props {
  customers: Customer[];
}

const CustomerTableBody = ({ customers }: Props) => {
  return (
    <Table.Body>
      {customers.map((customer) => (
        <Table.Row key={customer.id} className=" text-gray-500">
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {customer.fullName}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {customer.phone}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {customer.email}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {customer.address}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {customer.city}
            </Text>
          </Table.Cell>
          <Table.Cell className="content-center">
            <Text size="2" className="font-medium whitespace-nowrap">
              {customer.country}
            </Text>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default CustomerTableBody;
