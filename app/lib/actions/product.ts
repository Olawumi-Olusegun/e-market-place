"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { productSchema } from "../zodSchemas";
import prismadb from "../prismadb";
import { CategoryTypes } from "@prisma/client";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[]
    },
    message?: string | null;
}


export async function SellProduct(prevState: any, formData: FormData){
    
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        throw new Error("Something went wrong")
    }


    const validateFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images: JSON.parse(formData.get("images") as string),
        productFile: formData.get("productFile"),
    });

    if(!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops! There is an error with your inputs",
        }
        // throw new Error(validateFields?.error.message)
        return state;
    }

    await prismadb.product.create({
        data: {
            userId: user.id,
            name: validateFields.data.name,
            category: validateFields.data.category as CategoryTypes,
            price: validateFields.data.price,
            smallDescription: validateFields.data.smallDescription,
            description: JSON.parse(validateFields.data.description),
            images: validateFields.data.images,
            productFile: validateFields.data.productFile,
        }
    })

    const state: State = {
        status: "success",
        message: "Your product has been created"
    }

    return state;

}
