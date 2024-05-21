import React from 'react'
import prismadb from '../lib/prismadb'
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { Product } from '@prisma/client';
import ProductCard from './ProductCard';

type Props = {}

async function getData() {
    const data = await prismadb.product.findMany({
        select: {
            price: true,
            smallDescription: true,
            category: true,
            name: true,
            id: true,
            images: true,
        },
        take: 4,
        orderBy: {
            createdAt: "desc"
        }
    });

    return data;
}

async function NewestProducts({}: Props) {
    
    const data = await getData();

  return (
    <section className='mt-12'>
        <div className="md:flex md:items-center md:justify-between">
            <h1 className='text-2xl font-extrabold tracking-tighter my-5 '>Newest Products</h1>
            <Link href={"/"} className='hidden text-sm font-medium text-primary hover:text-primary/90 md:flex items-center gap-2'>
                <span>All Product</span>
                <MoveRight className='w-4' />
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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

export default NewestProducts