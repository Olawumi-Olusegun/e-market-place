
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import prismadb from '../lib/prismadb';
import { CreateStripeAccountLink, GetStripeDashboard } from '../lib/actions/product';
import SubmitButton from '../components/SubmitButton';

type Props = {}

async function getData(userId: string) {
    const data = await prismadb.user.findUnique({
        where: {
            id: userId
        },
        select: {
            stripeConnectedLinked: true,
        }
    });

    return data
}

async function BillingPage({}: Props) {
    
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/")
    }

    const data = await getData(user.id);

    if(!data) {
        return redirect("/");
    }


  return (
    <section className='max-w-7xl w-full mx-auto px-4 md:px-8 my-7'>
        <Card>
            <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>Find all your details regarding your payment</CardDescription>
            </CardHeader>
            <CardContent>
                {!data.stripeConnectedLinked && (
                    <form action={CreateStripeAccountLink}>
                        <SubmitButton title='Link your account to stripe' />
                    </form>
                 )}

                {data.stripeConnectedLinked && (
                    <form action={GetStripeDashboard}>
                        <SubmitButton title='View Dashboard' />
                    </form>
                 )}

            </CardContent>
        </Card>
    </section>
  )
}

export default BillingPage