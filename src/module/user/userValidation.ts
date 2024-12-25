import { z } from "zod";

export const userSchemaValidation = z.object({
 body:
  z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must not exceed 100 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must not exceed 50 characters"),
    role: z.enum(["user"]).default("user"),
    isBlocked: z.boolean().default(false),
    createdAt: z.date().optional(), 
    updatedAt: z.date().optional(),
  })
 
});
