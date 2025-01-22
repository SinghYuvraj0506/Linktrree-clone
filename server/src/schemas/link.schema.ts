import { LINKS_TYPE } from "@prisma/client";
import { z } from "zod";

export const createLinkSchema = z.object({
    body:z.object({
      title: z
        .string()
        .trim()
        .min(1, "Title must contain atleast 1 character")
        .max(300, "Title cannot be greater than 300 characters"),
      url: z.string().url("Enter valid url"),
      order: z.number(),
      type: z.nativeEnum(LINKS_TYPE)
    })
  });