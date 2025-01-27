import {
  LINK_ANIMATION_TYPE,
  LINK_LOCK_TYPE,
  LINKS_TYPE,
  THUMBNAIL_LAYOUT_TYPE,
} from "@prisma/client";
import { z } from "zod";

export const createLinkSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, "Title must contain atleast 1 character")
      .max(300, "Title cannot be greater than 300 characters"),
    url: z.string().url("Enter valid url"),
    order: z.number(),
    type: z.nativeEnum(LINKS_TYPE),
  }),
});


export const updateLinkSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(1, "Title must contain at least 1 character")
        .max(300, "Title cannot be greater than 300 characters")
        .optional(),
      url: z.string().url("Enter valid URL").optional(),
      order: z.number().optional(),
      type: z.nativeEnum(LINKS_TYPE).optional(),
      active: z.boolean().optional(),
      thumbnail: z.string().optional(),
      thumbnail_layout: z.nativeEnum(THUMBNAIL_LAYOUT_TYPE).optional(),
      prioritize: z.boolean().optional(),
      animation_type: z.nativeEnum(LINK_ANIMATION_TYPE).optional(),
      show_time: z.string().datetime().nullable().optional(),
      hide_time: z.string().datetime().nullable().optional(),
      isLocked: z.boolean().optional(),
      lock_type: z.nativeEnum(LINK_LOCK_TYPE).optional(),
      lock_data: z.object({}).optional(),
      redirect: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      // Validate `animation_type` if `prioritize` is true
      if (data.prioritize) {
        if (!data.animation_type || data.animation_type === "NONE") {
          ctx.addIssue({
            code: "custom",
            path: ["animation_type"],
            message: "Animation type must be present and cannot be NONE when prioritize is true.",
          });
        }
      }

      // Validate `lock_type` if `isLocked` is true
      if (data.isLocked) {
        if (!data.lock_type || data.lock_type === "NONE") {
          ctx.addIssue({
            code: "custom",
            path: ["lock_type"],
            message: "Lock type must be present and cannot be NONE when isLocked is true.",
          });
        }
      }
    }),
});

