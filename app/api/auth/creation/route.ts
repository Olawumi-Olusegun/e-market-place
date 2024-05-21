import prismadb from "@/app/lib/prismadb";
import { stripe } from "@/app/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request){

    const {getUser} = getKindeServerSession();

    try {
        const user = await getUser();

        if(!user || user === null || !user.id) {
            throw new Error("Something went wrong")
        }

        const dbUser = await prismadb.user.findUnique({
            where: {
                id: user.id
            }
        });

        if(!dbUser) {

            const account = await stripe.accounts.create({
                email: user.email as string,
                controller: {
                    losses: {
                        payments: "application",
                    },
                    fees: {
                        payer: "application",
                    },
                    stripe_dashboard: {
                        type: "express"
                    }
                }
            });

            const dbUser = await prismadb.user.create({
                data: {
                    id: user.id,
                    firstName: user.given_name ?? "not-specified",
                    lastName: user.family_name ?? "not-specified",
                    email: user.email ?? "not-specified",
                    profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
                    connectedAccountId: account.id,
                }
            });
        }

        return NextResponse.redirect("http://localhost:3000");

    } catch (error) {
        throw new Error("Something went wrong")
    }
}