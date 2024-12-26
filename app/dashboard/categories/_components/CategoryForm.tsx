"use client";
import { TextField, Text, Button, Box, Callout } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { categorySchema } from "@/app/validationSchemas";
import { Category } from "@prisma/client";
import Spinner from "@/app/_components/Spinner";
import ErrorMessage from "@/app/_components/ErrorMessage";

type CategoryFormData = z.infer<typeof categorySchema>;

const CategoryForm = ({ category }: { category?: Category }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (category) await axios.patch("/api/categories/" + category.id, data);
      else await axios.post("/api/categories", data);
      router.push("/dashboard/categories");
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
            Name:
          </Text>
          <TextField.Root
            defaultValue={category?.name}
            autoComplete="off"
            type="text"
            placeholder="category name"
            className="mt-2"
            {...register("name")}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="2" className="font-medium">
            Slug:
          </Text>
          <TextField.Root
            defaultValue={category?.slug}
            autoComplete="off"
            type="text"
            placeholder="category-slug"
            className="mt-2"
            {...register("slug")}
          />
          <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="2" className="font-medium">
            Icon Background:
          </Text>
          <TextField.Root
            defaultValue={category?.iconBackground || ""}
            autoComplete="off"
            type="text"
            placeholder="icon background"
            className="mt-2"
            {...register("iconBackground")}
          />
          <ErrorMessage>{errors.iconBackground?.message}</ErrorMessage>
        </div>

        <Button color="green" disabled={isSubmitting}>
          <Text className="m-2 cursor-pointer">
            {category ? "Update Category" : "Submit New Category"}
          </Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default CategoryForm;
