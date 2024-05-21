
import ProductDescription from '@/app/components/ProductDescription';
import { BuyButton } from '@/app/components/SubmitButton';
import { BuyProduct } from '@/app/lib/actions/product';
import prismadb from '@/app/lib/prismadb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { JSONContent } from '@tiptap/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        productId: string;
    }
}

async function getData(productId: string) {
    const data = await prismadb.product.findUnique({
        where: {
            id: productId
        },
        select: {
            category: true,
            description: true,
            smallDescription: true,
            name: true,
            images: true,
            price: true,
            createdAt: true,
            id: true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                }
            }
        }
    })

    return data;
}

async function ProductDetailPage({params}: Props) {

    if(!params.productId) {
        return redirect("/")
    }

    const data = await getData(params.productId);

    if(!data) {
        return redirect("/")
    }

  return (
    <section className='max-w-7xl w-full mx-auto px-4 lg:px-8 mt-7 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
        <Carousel className='lg:row-end-1 lg:col-span-4'>
            <CarouselContent>
                {data.images.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden ">
                            <Image src={item} alt='product-image' fill className='object-cover' />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='ml-16' />
            <CarouselNext className='mr-16' />
        </Carousel>
        <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>{data.name}</h1>
            <p className='mt-3 text-muted-foreground'>{data.smallDescription}</p>
            <form action={BuyProduct}>
                <input type="hidden" name='productId' value={data.id} />
                <BuyButton price={data.price} />
            </form>
            <div className="border-t pt-10">
                <div className="grid grid-cols-2 w-full gap-y-3">
                    <h3 className='text-sm font-medium text-muted-foreground col-span-1'>Released: </h3>
                    <h3 className='text-sm font-medium col-span-1'>
                        {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long", }).format(data.createdAt)}
                    </h3>
                   
                    <h3 className='text-sm font-medium text-muted-foreground col-span-1'> Category: </h3>
                    <h3 className='text-sm font-medium col-span-1'> {data.category} </h3>
                
                </div>
            </div>

            <div className="border-t mt-10 " />
        </div>
        <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
            <ProductDescription content={data.description as JSONContent} />
        </div>
    </section>
  )
}

export default ProductDetailPage