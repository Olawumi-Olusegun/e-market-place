
import React, { Suspense } from 'react'
import prismadb from '../lib/prismadb';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import ProductCard, { LoadingProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {}

interface ProductRowProps {
    category: "newest" | "templates" | "uikits" | "icons";
}

async function getData({category}: ProductRowProps) {

    switch(category) {
        case "icons": {
            const data = await prismadb.product.findMany({
                where: {
                    category: "icon"
                },
                select: {
                    price: true,
                    name: true,
                    smallDescription: true,
                    images: true,
                    id: true,
                },
                take: 3
            });
            return {
                data: data,
                title: "Icons",
                link: "/products/icon"
            }
        }

        case "newest": {
            const data = await prismadb.product.findMany({
                select: {
                    price: true,
                    name: true,
                    smallDescription: true,
                    images: true,
                    id: true,
                },
                take: 3,
                orderBy: {
                    createdAt: "desc"
                }
            });
            return {
                data: data,
                title: "Newest Products",
                link: "/products/all"
            }
        }

        case "templates": {
            const data = await prismadb.product.findMany({
                where: {
                    category: "template"
                },
                select: {
                    price: true,
                    name: true,
                    smallDescription: true,
                    images: true,
                    id: true,
                },
                take: 3,
                orderBy: {
                    createdAt: "desc"
                }
            });
            return {
                data: data,
                title: "Template",
                link: "/products/template"
            }
        }

        case "uikits": {
            const data = await prismadb.product.findMany({
                where: {
                    category: "uikit"
                },
                select: {
                    price: true,
                    name: true,
                    smallDescription: true,
                    images: true,
                    id: true,
                },
                take: 3,
                orderBy: {
                    createdAt: "desc"
                }
            });
            return {
                data: data,
                title: "Ui Kits",
                link: "/products/uikit"
            }
        }
        default: {
            return redirect("/")
        }
    }
}

function ProductRow({category}: ProductRowProps) {


  return (
    <section className='mt-12'>
        <Suspense fallback={<LoadingState />}>
            <LoadRows category={category} />
        </Suspense>
    </section>
  )
}

export default ProductRow

async function LoadRows({category}: ProductRowProps) {

    const {data, title, link} = await getData({category});
    if(!data || data.length === 0) {
        return null;
    }


    return (
        <>
        <div className="md:flex md:items-center md:justify-between">
            <h1 className='text-2xl font-extrabold tracking-tighter my-5 '>{title}</h1>
            <Link href={link} className='hidden text-sm font-medium text-primary hover:text-primary/90 md:flex items-center gap-2'>
                <span>All Product</span>
                <MoveRight className='w-4' />
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((product:any) => (
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
        </>
    )
}

function LoadingState() {
    return (
        <div>
            <Skeleton className="h-8 w-56"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
            </div>
        </div>
    )
}