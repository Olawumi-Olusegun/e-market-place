"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { productSchema } from "../zodSchemas";
import prismadb from "../prismadb";
import { CategoryTypes } from "@prisma/client";
import { stripe } from "../stripe";
import { redirect } from "next/navigation";
import appConstants from "../constants";

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
    
    console.log({user})

    if(!user) {
        return redirect("/")
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

    const product = await prismadb.product.create({
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
    });

    if(!product) {
       return redirect("/")
    }

    // const state: State = {
    //     status: "success",
    //     message: "Your product has been created"
    // }

    // return state;

    return redirect(`/product/${product.id}`)

}


export async function BuyProduct(formData: FormData) {

  

    const productId = formData.get("productId") as string;
    console.log({productId})
    if(!productId) {
        return redirect("/")
    }

    const data = await prismadb.product.findUnique({
        where: {
            id: productId
        },
        select: {
            name: true,
            images: true,
            price: true,
            smallDescription: true,
            productFile: true,
            id: true,
            User: {
                select: {
                    connectedAccountId: true
                }
            }
        }
    });

    if(!data) {
        return redirect("/");
    }

    console.log({data})

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: Math.round((data.price as number) * 100),
                    product_data: {
                        name: data.name,
                        description: data.smallDescription,
                        images: data.images,
                    }
                },
                quantity: 1
            }
        ],
        metadata: {
            link: data.productFile as string
        },
        payment_intent_data:{
            application_fee_amount: Math.round((data?.price as number) * 100) * 0.1,
            transfer_data: {
                destination: data.User?.connectedAccountId as string,
            }
        },
        success_url: `http://localhost:3000/payment/success`,
        cancel_url: `http://localhost:3000/payment/cancel`
    });

    return redirect(session.url as string);
}

export async function CreateStripeAccountLink() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/")
    }

    const data = await prismadb.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            connectedAccountId: true
        }
    });

    if(!data) {
        return redirect("/")
    }

    const accountLink = await stripe.accountLinks.create({
        account: data.connectedAccountId,
        refresh_url: `${appConstants.APP_BASE_URL}/billing`,
        return_url: `${appConstants.APP_BASE_URL}/return/${data.connectedAccountId}`,
        type: "account_onboarding",
    });
    return redirect(accountLink.url);
}


export async function GetStripeDashboard() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/")
    }

    const data = await prismadb.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            connectedAccountId: true
        }
    });

    if(!data) {
        return redirect("/")
    }

    const loginLink = await stripe.accounts.createLoginLink(data.connectedAccountId);

    return redirect(loginLink.url);

}