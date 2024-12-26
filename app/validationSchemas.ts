import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name is required").max(255),
  slug: z.string().min(3, "Slug is required").max(255),
  unitPrice: z.coerce.number().min(1).max(9999999.99),
  description: z.string().min(3, "Description is required").max(65535),
  discount: z.coerce.number().gte(0).max(100).default(0),
  backgroundImage: z.string().max(65535).optional(),
  iconImage: z.string().max(65535).optional(),
  deleveryChrge: z.coerce.number().gte(0).max(1000).default(0),
  categoryId: z.string().min(1).max(255),
});

export const categorySchema = z.object({
  iconBackground: z.string().max(65535).optional().default(""),
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
});

export const colorSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  color: z.string().min(1, "Color is required").max(50),
});

export const colorItemSchema = z.object({
  colorId: z.string().min(1, "color is required").max(255),
  productId: z.string().min(1, "product is required").max(255),
});

export const customerSchema = z.object({
  fullName: z.string().min(1, "firstName is required").max(255),
  email: z.string().email().optional(),
  phone: z.string().min(8, "Phone is required").max(15),
  city: z.string().min(3, "City is required").max(255),
  address: z.string().min(3, "Address is required").max(65535),
  country: z.string().max(255).optional().default("Morocco"),
});

export const orderSchema = z.object({
  customerId: z.string().min(1, "Customer is required").max(255),
  shippedDate: z.string().datetime().or(z.string()).optional(),
  orderStatus: z.string().max(255).optional(),
});

export const orderItemSchema = z.object({
  orderId: z.string().min(1, "Order is required").max(255),
  productId: z.string().min(1, "Product is required").max(255),
  quantity: z.number().gte(0).max(32000),
  unitPrice: z.number().gte(0).max(9999999.99),
});

export const invoiceSchema = z.object({
  number: z.string().min(1).max(255),
  invoiceTotal: z.number().gte(0).max(9999999.99),
  dueDate: z.string().datetime().or(z.string()).optional(),
  paymentTotal: z.number().gte(0).max(9999999.99),
  paymentDate: z.string().datetime().or(z.string()).optional(),
  customerId: z.string().min(1, "Customer is required").max(255),
  orderId: z.string().min(1, "Order is required").max(255),
});

export const paymentSchema = z.object({
  date: z.string().datetime().or(z.string()).optional(),
  amount: z.number().gte(0).max(9999999.99),
  customerId: z.string().min(1, "Customer is required").max(255),
  invoiceId: z.string().min(1, "Invoice is required").max(255),
});

export const messageSchema = z.object({
  fullName: z.string().max(255).optional(),
  email: z.string().optional().default(""),
  phone: z.string().max(15).optional(),
  message: z.string().min(1).max(65535),
});

export const patchOrderSchema = z.object({
  // customerId: z.string().max(255).optional(),
  // shipperId: z.string().min(1, "Shipper is required").max(255).optional(),
  shippedDate: z.string().datetime().or(z.string()).optional(),
  orderStatus: z.string().max(255).optional(),
});

export const registerUserSchema = z
  .object({
    username: z.string().min(3, "username is required.").max(50),
    email: z.string().email("email is required.").max(200),
    secret: z.string().min(8).max(800),
    password: z.string().min(8, "password is required.").max(800),
    confirmPassword: z.string().min(8, "conform password").max(800),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dosn't match",
    path: ["confirmPassword"],
  });
