"use client";
import {
  TextField,
  Text,
  Button,
  Box,
  Callout,
  TextArea,
} from "@radix-ui/themes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { messageSchema } from "@/app/validationSchemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/_components/Spinner";

type messageDataType = z.infer<typeof messageSchema>;

const ContactForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<messageDataType>({
    resolver: zodResolver(messageSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/messages", data);
      router.push("/contact/recived");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
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
            Email:{" "}
            {errors.email?.message && (
              <Text size="2" className="font-medium text-red-500">
                *
              </Text>
            )}
          </Text>
          <TextField.Root
            autoComplete="off"
            type="email"
            placeholder="email"
            className="mt-2"
            {...register("email")}
          />
        </div>
        <div>
          <Text size="2" className="font-medium">
            Message:{" "}
            {errors.message?.message && (
              <Text size="2" className="font-medium text-red-500">
                *
              </Text>
            )}
          </Text>
          <TextArea
            autoComplete="off"
            placeholder="address"
            className="mt-2"
            {...register("message")}
          />
        </div>

        <Button color="green" disabled={isSubmitting}>
          <Text className="m-2">Send Message{isSubmitting && <Spinner />}</Text>
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
