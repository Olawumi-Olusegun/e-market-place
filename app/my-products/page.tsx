
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import prismadb from '../lib/prismadb';
import ProductCard from '../components/ProductCard';
import { unstable_noStore as noStore } from "next/cache";
type Props = {}

async function getData(userId: string) {
    noStore()
    const data = await prismadb.product.findMany({
        where: {
            userId
        },
        select: {
            name: true,
            images: true,
            price: true,
            smallDescription: true,
            id: true,
        }
    })

    return data;
}

async function MyProductPage({}: Props) {
    
    const {getUser} = getKindeServerSession();
    
    const user = await getUser();

    if(!user) {
        return redirect("/");
    }

    const data = await getData(user.id);

    if(!data || data.length === 0) {
        return null;
    }

  return (
    <section className='max-w-7xl mx-auto px-4 md:px-8 my-7'>
        <h1 className='text-2xl font-bold '>My Products</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
            {data.map((product) => (
                <ProductCard 
                key={product.id}
                images={product.images}
                name={product.name}
                price={product.price} 
                smallDescription={product.smallDescription} 
                id={product.id}
                />
            ))}
        </div>
    </section>
  )
}

export default MyProductPage