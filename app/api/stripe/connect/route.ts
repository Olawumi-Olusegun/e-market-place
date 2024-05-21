import appConstants from "@/app/lib/constants";
import prismadb from "@/app/lib/prismadb";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function POST(request: Request) {

    const body = await request.text();
    const signature = headers().get("Stripe-Signature") as string;
    const webhookSecret = appConstants.STRIPE_CONNECT_WEBHOOK_SECRET as string;
    let event: Stripe.Event;


    if(!signature || !webhookSecret) {
        console.log("No webhookSecret/signature");
        return redirect("/");
    }


    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: unknown) {
        console.log("something went wrong")
        return new Response("webhook error", {status: 400})
    }

    switch(event.type) {
        case "account.updated": {
            const account = event.data.object;
            const data = await prismadb.user.update({
                where: {
                    connectedAccountId: account.id as string,
                },
                data: {
                    stripeConnectedLinked: account.capabilities?.transfers === "pending" || account.capabilities?.transfers === "inactive" ? false : true
                }
            })

            break;
        }
        default: {
            console.log("unhandled event")
        }
    }
    return new Response(null, {status: 200})
}