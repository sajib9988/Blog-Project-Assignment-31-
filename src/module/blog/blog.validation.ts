import { z } from "zod";

export const BlogValidateSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "Title must be string",
      required_error: "Title is Required",
    }),
    content: z.string({
      invalid_type_error: "Content must be string",
      required_error: "Content is Required",
    }),
    isPublished: z.boolean().default(true),
  }),
});

export const UpdateBlogValidateSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: "Title must be string" }).optional(),
    content: z
      .string({ invalid_type_error: "Content must be string" })
      .optional(),
  }),
});
