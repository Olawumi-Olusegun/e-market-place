
import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(3, "Product name required/minimun of 3"),
    category: z.string().min(3, "Category required"),
    price: z.number().min(1, "Price must be greater than zero"),
    smallDescription: z.string().min(1, "Small description is required"),
    description: z.string().min(10, "Description is required"),
    images: z.array(z.string(), {message: "Images are required"}),
    productFile: z.string().min(1, "Upload a zip file of your product")
});

export type productSchemaTypes = z.infer<typeof productSchema>; 



export const userSettingSchema = z.object({
    firstName: z.string()
        .min(3, "Firstname is required")
        .or(z.literal(""))
        .optional(),
    lastName: z.string()
        .min(3, "Lastname is required")
        .or(z.literal(""))
        .optional(),
    email: z.string()
        .min(3, "Email is required")
        .email(),
});

export type userSettingSchemaTypes = z.infer<typeof userSettingSchema>; 