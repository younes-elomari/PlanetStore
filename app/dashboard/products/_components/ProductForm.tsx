"use client";
import {
  TextField,
  Text,
  Button,
  Box,
  Callout,
  Flex,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { productSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/_components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { Category, Product } from "@prisma/client";
import Spinner from "@/app/_components/Spinner";
import SelectProductCategory from "./SelectProductCategory";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useCategories();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (product) await axios.patch("/api/products/" + product.id, data);
      else await axios.post("/api/products/", data);
      router.push("/dashboard/products");
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
        <Flex direction="column" width="100%" gap="2">
          <Text size="2" className="font-medium">
            Category: {isCategoriesLoading && <Spinner />}
          </Text>
          <Controller
            defaultValue={
              product?.categoryId ? product?.categoryId.toString() : ""
            }
            name="categoryId"
            control={control}
            render={({ field }) => (
              <SelectProductCategory
                value={field.value || ""}
                onValueChange={field.onChange}
                placeholder="product category"
                data={categories || []}
              />
            )}
          />
          <ErrorMessage>{errors.categoryId?.message}</ErrorMessage>
        </Flex>

        <div>
          <Text size="2" className="font-medium">
            Background Image: (URL)
          </Text>
          <TextField.Root
            defaultValue={product?.backgroundImage || ""}
            autoComplete="off"
            type="text"
            placeholder="background image"
            className="mt-2"
            {...register("backgroundImage")}
          />
          <ErrorMessage>{errors.backgroundImage?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="2" className="font-medium">
            Icon Image: (URL)
          </Text>
          <TextField.Root
            defaultValue={product?.iconImage || ""}
            autoComplete="off"
            type="text"
            placeholder="Icon image"
            className="mt-2"
            {...register("iconImage")}
          />
          <ErrorMessage>{errors.iconImage?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="2" className="font-medium">
            Name:
          </Text>
          <TextField.Root
            defaultValue={product?.name}
            autoComplete="off"
            type="text"
            placeholder="Product Name"
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
            defaultValue={product?.slug}
            autoComplete="off"
            type="text"
            placeholder="product-slug"
            className="mt-2"
            {...register("slug")}
          />
          <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="2" className="font-medium">
            Price:
          </Text>
          <TextField.Root
            defaultValue={parseFloat(product?.unitPrice.toString() || "") || 0}
            autoComplete="off"
            type="number"
            placeholder="price"
            className="mt-2"
            step="0.01"
            {...register("unitPrice")}
          />
          <ErrorMessage>{errors.unitPrice?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="2" className="font-medium">
            Discount:
          </Text>
          <TextField.Root
            defaultValue={product?.discount || 0}
            autoComplete="off"
            type="number"
            placeholder="discount"
            className="mt-2"
            step="0.01"
            {...register("discount")}
          />
          <ErrorMessage>{errors.discount?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="2" className="font-medium">
            Delevery Chrges:
          </Text>
          <TextField.Root
            defaultValue={product?.deleveryChrge || "0"}
            autoComplete="off"
            type="number"
            placeholder="delevery chrge"
            className="mt-2"
            step="0.01"
            {...register("deleveryChrge")}
          />
          <ErrorMessage>{errors.deleveryChrge?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="2" className="font-medium">
            Description:
          </Text>
          <Controller
            defaultValue={product?.description}
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                className="mt-2"
                placeholder="description"
                {...field}
              />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Button color="green" disabled={isSubmitting}>
          <Text className="m-2 cursor-pointer">
            {product ? "Update Product" : "Submit New Product"}
          </Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

const useCategories = () =>
  useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => axios.get("/api/categories").then((res) => res.data),
    retry: 3,
  });

export default ProductForm;
