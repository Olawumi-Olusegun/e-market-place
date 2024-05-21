"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import SelectCategory from '../SelectCategory';
import { Input } from '@/components/ui/input';
import TipTapEditor from '../Editor';
import { UploadButton } from '@/app/lib/uploadthing';
import { JSONContent } from '@tiptap/react';
import { useFormState } from 'react-dom';
import { SellProduct, State } from '@/app/lib/actions/product';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from '../SubmitButton';

type Props = {}

function SellForm({}: Props) {

    const inititialState: State =  {message: "", status: undefined}

    const [state, formAction] = useFormState(SellProduct, inititialState);

    const [json, setJson] = useState<JSONContent | null>(null)
    const [images, setImages] = useState<string[] | null>(null);
    const [productFile, setProductFile] = useState<string | null>(null);


    useEffect(() => {
        if(state.status === "success") {
            toast.success(state.message)
        } else if (state.status === "error") {
            toast.error(state.message)
        }
    }, [state])

  return (
    <form action={formAction}>
    <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>Please describe your product here in detail so that is can be sold!</CardDescription>
    </CardHeader>
    <CardContent className='flex flex-col gap-y-10'>
        <div className="flex flex-col gap-y-2">
            <Label>Name:</Label>
            <Input required min={3} name='name' placeholder='Name of your product' type='text' />
            {state?.errors?.["name"]?.[0] && <span className='text-destructive text-sm'>{state?.errors?.["name"]?.[0]}</span>}
        </div>

        <div className="flex flex-col gap-y-2 w-full">
            <Label>Category:</Label>
            <SelectCategory />
            {state?.errors?.["category"]?.[0] && <span className='text-destructive text-sm'>{state?.errors?.["category"]?.[0]}</span>}
        </div>

        <div className="flex flex-col gap-y-2 w-full">
            <Label>Price:</Label>
            <Input required min={1} name='price' placeholder='NGN3000' type='number'  />
            {state?.errors?.["price"]?.[0] && <span className='text-destructive text-sm'>{state?.errors?.["price"]?.[0]}</span>}
        </div>

        <div className="flex flex-col gap-y-2 w-full">
            <Label>Small Summary:</Label>
            <Textarea required minLength={1} name='smallDescription' placeholder='Enter product description' />
            {state?.errors?.["smallDescription"]?.[0] && <span className='text-destructive text-sm'>{state?.errors?.["smallDescription"]?.[0]}</span>}
        </div>

        <div className="flex flex-col gap-y-2 w-full">
            <input type="hidden" name='description' value={JSON.stringify(json)} />
            <Label>Description:</Label>
            <TipTapEditor json={json} setJson={setJson} />
            {state?.errors?.["description"]?.[0] && <span className='text-destructive text-sm'>{state?.errors?.["description"]?.[0]}</span>}
        </div>
        <div className="flex flex-col gap-y-2">
            <input type="hidden" name="images" value={JSON.stringify(images)} />
        <Label>Product Images:</Label>
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            setImages(res.map((item) => item.url))
           
            toast.success("Images uploaded")
            }}
            onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`${error.message}`)
            }}
        />
        {state?.errors?.["images"]?.[0] && <span className='text-destructive text-sm'>{state?.errors?.["images"]?.[0]}</span>}
        </div>

        <div className="flex flex-col gap-y-2">
        <input type="hidden" name="productFile" value={productFile ?? ""} />
        <Label>Product File:</Label>
        <UploadButton
            endpoint="productFileUploader"
            onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            setProductFile(res[0].url)
            toast.success("zip file uploaded")
            }}
            onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`${error.message}`)
            }}
        />
         {state?.errors?.["productFile"]?.[0] && <span className='text-destructive text-sm'>{state?.errors?.["productFile"]?.[0]}</span>}
        </div>
    </CardContent>
    <CardFooter className='my-7'>
        <SubmitButton title='Create your product' className='ml-auto' />
    </CardFooter>
    </form>
  )
}

export default SellForm