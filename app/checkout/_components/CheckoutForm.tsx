"use client";
import { TextField, Text, Button, Box, Callout } from "@radix-ui/themes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Customer, Order } from "@prisma/client";
import useProductsStore from "@/app/store";
import { v4 } from "uuid";
import _ from "lodash";
import { calculatePriceWithOffer } from "@/app/utils/calculatePriceWithOffer";
import toast, { Toaster } from "react-hot-toast";
import { customerSchema } from "@/app/validationSchemas";
import Spinner from "@/app/_components/Spinner";

type customerDataType = z.infer<typeof customerSchema>;

const ChechoutForm = () => {
  const router = useRouter();
  const { shoppingCartProducts, setInvoiceNumber, deleteShoppingCartProducts } =
    useProductsStore();

  const subTotal = _.sumBy(
    shoppingCartProducts.map(
      (product) =>
        calculatePriceWithOffer(
          parseFloat(product.unitPrice.toString()),
          product.discount
        ) * product.quantity
    )
  ).toFixed(2);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<customerDataType>({
    resolver: zodResolver(customerSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const generateInvoiceNumber = () => {
    const uuid = v4();
    const segment = uuid.split("-");
    return `${segment[0].substring(0, 3)}-${segment[1].substring(0, 3)}`;
  };

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    const invoiceNumber = generateInvoiceNumber();
    try {
      setSubmitting(true);

      const customer: Customer = (await axios.post("/api/customers", data))
        .data;

      const order: Order = (
        await axios.post("/api/orders", {
          customerId: customer.id.toString(),
        })
      ).data;

      shoppingCartProducts.map(async (product) => {
        await axios.post("/api/order_items", {
          orderId: order.id.toString(),
          productId: product.id.toString(),
          unitPrice: parseFloat(product.unitPrice.toString()),
          quantity: product.quantity,
        });
      });

      await axios.post("/api/invoices", {
        number: invoiceNumber,
        invoiceTotal: parseFloat(subTotal),
        paymentTotal: parseFloat(subTotal),
        customerId: customer.id.toString(),
        orderId: order.id.toString(),
      });

      router.push("/orderRecived");
      toast.success(
        `Thank you mr: ${customer.fullName}, we have recived your order`,
        {
          duration: 5000,
        }
      );
    } catch (error) {
      setSubmitting(false);
      toast.error("An unexpected error occurred.");
    }
  });

  return (
    <Box className="space-y-6">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <Text size="2" className="font-medium">
            Full Name:{" "}
            {errors.fullName?.message && (
              <Text size="2" className="font-medium text-red-500">
                *
              </Text>
            )}
          </Text>
          <TextField.Root
            autoComplete="off"
            type="text"
            placeholder="full name"
            className="mt-2"
            {...register("fullName")}
          />
        </div>
        <div>
          <Text size="2" className="font-medium">
            Phone:{" "}
            {errors.phone?.message && (
              <Text size="2" className="font-medium text-red-500">
                *
              </Text>
            )}
          </Text>
          <TextField.Root
            autoComplete="off"
            type="number"
            placeholder="phone"
            className="mt-2"
            {...register("phone")}
          />
        </div>
        <div>
          <Text size="2" className="font-medium">
            City:{" "}
            {errors.city?.message && (
              <Text size="2" className="font-medium text-red-500">
                *
              </Text>
            )}
          </Text>
          <TextField.Root
            autoComplete="off"
            type="text"
            placeholder="city"
            className="mt-2"
            {...register("city")}
          />
        </div>
        <div>
          <Text size="2" className="font-medium">
            Address:{" "}
            {errors.address?.message && (
              <Text size="2" className="font-medium text-red-500">
                *
              </Text>
            )}
          </Text>
          <TextField.Root
            autoComplete="off"
            type="text"
            placeholder="address"
            className="mt-2"
            {...register("address")}
          />
        </div>

        <Button color="green" disabled={isSubmitting}>
          <Text className="m-2">
            Confirm Order {isSubmitting && <Spinner />}
          </Text>
        </Button>
      </form>
      <Toaster />
    </Box>
  );
};

export default ChechoutForm;
