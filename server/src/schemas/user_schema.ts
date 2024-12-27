import { z } from "zod";
import { UserRoleEnum } from "../types";

export const deleteBodySchema = z.object({
    ids: z.array(z.string()),
})

export const browseBodySchema = z.object({
    role: z.string().optional(),
    pagination: z.object({
        pageSize: z.number().optional(),
        fromItem: z.number().optional(),
        orderBy: z.string().optional(),
        orderDir: z.string().optional(),
    }).optional(),
    populate: z.boolean().optional(),
    text: z.string().optional(),
})