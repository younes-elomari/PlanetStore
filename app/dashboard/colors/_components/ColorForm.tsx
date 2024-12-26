"use client";
import { TextField, Text, Button, Box, Callout, Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Spinner from "@/app/_components/Spinner";
import { colorSchema } from "@/app/validationSchemas";
import { Color } from "@prisma/client";

type ColorFormData = z.infer<typeof colorSchema>;

const ColorForm = ({ color }: { color?: Color }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (color) await axios.patch("/api/colors/" + color.id, data);
      else await axios.post("/api/colors", data);
      router.push("/dashboard/colors");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <Box>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-5">
        <Card className="space-y-4">
          <div>
            <Text size="2" weight="medium">
              Name:
            </Text>
            <TextField.Root
              defaultValue={color?.name}
              autoComplete="off"
              type="text"
              placeholder="Color Name"
              className="mt-2"
              {...register("name")}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>

          <div>
            <Text size="2" weight="medium">
              Slug:
            </Text>
            <TextField.Root
              defaultValue={color?.slug}
              autoComplete="off"
              type="text"
              placeholder="color-name"
              className="mt-2"
              {...register("slug")}
            />
            <ErrorMessage>{errors.slug?.message}</ErrorMessage>
          </div>

          <div>
            <Text size="2" weight="medium">
              HEX:
            </Text>
            <TextField.Root
              defaultValue={color?.color}
              autoComplete="off"
              type="text"
              placeholder="#ffffff"
              className="mt-2"
              {...register("color")}
            />
            <ErrorMessage>{errors.color?.message}</ErrorMessage>
          </div>
        </Card>

        <Button color="green" disabled={isSubmitting}>
          <Text className="m-2 cursor-pointer">
            {color ? "Update Color" : "Submit New Color"}
          </Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default ColorForm;
