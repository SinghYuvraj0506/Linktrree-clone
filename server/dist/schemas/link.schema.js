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
        type: zod_1.z.nativeEnum(client_1.LINKS_TYPE)
    })
});
exports.updateLinkSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .trim()
            .min(1, "Title must contain atleast 1 character")
            .max(300, "Title cannot be greater than 300 characters").optional(),
        url: zod_1.z.string().url("Enter valid url").optional(),
        order: zod_1.z.number().optional(),
        type: zod_1.z.nativeEnum(client_1.LINKS_TYPE).optional(),
        active: zod_1.z.boolean().optional()
    })
});
