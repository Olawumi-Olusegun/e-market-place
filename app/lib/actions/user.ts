"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prismadb from "../prismadb";
import { userSettingSchema } from "../zodSchemas";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[]
    },
    message?: string | null;
}


export async function UpdateUserSettings(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        throw new Error("Something went wrong")
    }


    const validateFields = userSettingSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
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

   const data =  await prismadb.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName: validateFields.data.firstName,
            lastName: validateFields.data.lastName,
            email: validateFields.data.email,
        }
    })
    const state: State = {
        status: "success",
        message: "Your setting have been updated"
    }

    return state;
    
}