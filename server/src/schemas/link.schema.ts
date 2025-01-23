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


export const updateLinkSchema = z.object({
    body:z.object({
      title: z
        .string()
        .trim()
        .min(1, "Title must contain atleast 1 character")
        .max(300, "Title cannot be greater than 300 characters").optional(),
      url: z.string().url("Enter valid url").optional(),
      order: z.number().optional(),
      type: z.nativeEnum(LINKS_TYPE).optional(),
      active: z.boolean().optional()
    })
  });