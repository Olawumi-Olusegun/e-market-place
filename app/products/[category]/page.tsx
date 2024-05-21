
import ProductCard from '@/app/components/ProductCard';
import prismadb from '@/app/lib/prismadb';
import { CategoryTypes } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'
import { unstable_noStore as noStore } from "next/cache";


type Props = {
    params: {
        category: string;
    }
}

async function getData(category: string) {
   noStore()
    let input: string | undefined;

    switch(category) {
        case "template": {
            input = "template";
            break;
        }
        case "uikit": {
            input = "uikit";
            break;
        }
        case "icon": {
            input = "icon";
            break;
        }
        case "all": {
            input = undefined;
            break;
        }
        default: {
            return redirect("/")
        }
    }

    const data = await prismadb.product.findMany({
        where: {
            category: input as CategoryTypes
        },
        select: {
            id: true,
            images: true,
            smallDescription: true,
            price: true,
            name: true
        }
    });

    return data;

}

async function ProductCategory({params}: Props) {
    const data = await getData(params.category);

    if(!data || data.length === 0) {
        return redirect("/")
    }


  return (
    <section className='max-w-7xl mx-auto px-4 md:px-8 my-7'>
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
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

export default ProductCategory