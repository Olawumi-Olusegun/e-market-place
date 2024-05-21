import appConstants from "@/app/lib/constants";
import prismadb from "@/app/lib/prismadb";
import { stripe } from "@/app/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { unstable_noStore as noStore } from "next/cache";


export async function GET(request: Request){

    noStore()

    const {getUser} = getKindeServerSession();

    try {
        const user = await getUser();

        if(!user || user === null || !user.id) {
            return redirect("/")
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

        return NextResponse.redirect(appConstants.APP_BASE_URL);

    } catch (error) {
        return redirect("/")
    }
}