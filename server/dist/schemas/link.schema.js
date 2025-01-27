"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLinkSchema = exports.createLinkSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createLinkSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .trim()
            .min(1, "Title must contain atleast 1 character")
            .max(300, "Title cannot be greater than 300 characters"),
        url: zod_1.z.string().url("Enter valid url"),
        order: zod_1.z.number(),
        type: zod_1.z.nativeEnum(client_1.LINKS_TYPE),
    }),
});
exports.updateLinkSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z
            .string()
            .trim()
            .min(1, "Title must contain at least 1 character")
            .max(300, "Title cannot be greater than 300 characters")
            .optional(),
        url: zod_1.z.string().url("Enter valid URL").optional(),
        order: zod_1.z.number().optional(),
        type: zod_1.z.nativeEnum(client_1.LINKS_TYPE).optional(),
        active: zod_1.z.boolean().optional(),
        thumbnail: zod_1.z.string().optional(),
        thumbnail_layout: zod_1.z.nativeEnum(client_1.THUMBNAIL_LAYOUT_TYPE).optional(),
        prioritize: zod_1.z.boolean().optional(),
        animation_type: zod_1.z.nativeEnum(client_1.LINK_ANIMATION_TYPE).optional(),
        show_time: zod_1.z.string().datetime().optional(),
        hide_time: zod_1.z.string().datetime().optional(),
        isLocked: zod_1.z.boolean().optional(),
        lock_type: zod_1.z.nativeEnum(client_1.LINK_LOCK_TYPE).optional(),
        lock_data: zod_1.z.object({}).optional(),
        redirect: zod_1.z.boolean().optional(),
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
