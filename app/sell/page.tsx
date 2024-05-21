import { Card } from '@/components/ui/card'
import React from 'react'
import SellForm from '../components/forms/SellForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prismadb from '../lib/prismadb';
import { unstable_noStore as noStore } from "next/cache";


async function getData(userId: string) {
  noStore();
  const data = await prismadb.user.findUnique({
    where: {
      id: userId
    },
    select: {
      stripeConnectedLinked: true,
    }
  })

  if(!data || !data.stripeConnectedLinked) {
    return redirect("/billing")
  }

  return data;

}

async function SellPage() {
    const {getUser} = getKindeServerSession();

    const user = await getUser();

    if(!user) {
        return redirect("/")
    }

    const data = await getData(user.id);

  return (
    <section className='max-w-7xl w-full mx-auto px-4 md:px-8 my-7 '>
        <Card>
            <SellForm />
        </Card>
    </section>
  )
}

export default SellPage