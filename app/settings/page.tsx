
import { Card, CardHeader } from '@/components/ui/card'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import prismadb from '../lib/prismadb';
import SettingsForm from '../components/SettingsForm';

type Props = {}

async function getData(userId: string) {
    const data = await prismadb.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
        }
    })

    return data;
}

async function SettingsPage({}: Props) {

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/")
    }

    const data = await getData(user.id);

    if(!data) {
        return redirect("/")
    }

  return (
    <section className='max-w-7xl w-full mx-auto px-4 md:px-8 my-5'>
        <Card>
            <SettingsForm 
            firstName={data.firstName} 
            lastName={data.lastName} 
            email={data.email} 
            />
        </Card>
    </section>
  )
}

export default SettingsPage