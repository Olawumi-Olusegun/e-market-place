import appConstants from "@/app/lib/constants";
import prismadb from "@/app/lib/prismadb";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

import { Resend } from 'resend';
import ProductEmail from "@/app/components/ProductEmail";

const resend = new Resend(appConstants.RESEND_API_KEY);

export async function POST(request: Request) {

    const body = await request.text();
    const signature = headers().get("Stripe-Signature") as string;
    const webhookSecret = appConstants.STRIPE_SECRET_WEBHOOK as string;
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
        case "checkout.session.completed": {
            const session = event.data.object;
            const link = session.metadata?.link;

            const { data, error } = await resend.emails.send({
                from: 'E-MARKETPLACE <onboarding@resend.dev>',
                to: ['olawumi.olusegun@gmail.com'],
                subject: 'Your Product from E-MarketPlace',
                react: ProductEmail({link: link as string}),
              });

              if (error) {
                return console.error({ error });
              }

            break;
        }
        default: {
            console.log("unhandled event")
        }
    }
    return new Response(null, {status: 200})
}