"use client";

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react';
import React from 'react'
import { useFormStatus } from 'react-dom';



interface SubmitButtonProps extends ButtonProps {
    title: string;
}

function SubmitButton({className, title, ...props}: SubmitButtonProps) {
    const {pending} = useFormStatus();
  return (
    <Button disabled={pending} type={pending ? "button" : "submit"} className={cn('max-w-max', className)} {...props} >
        {pending && <Loader className='w-4 h-4 mr-2 animate-spin' />}
        <span> {pending ? "Please wait..." : `${title}` } </span>
    </Button>
  )
}

export default SubmitButton