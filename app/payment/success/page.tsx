
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

function SuccessPaymentPage({}: Props) {
  return (
    <section className='min-h-[80vh] w-full flex flex-center items-center justify-center'>
        <Card className='w-[350px]'>
            <div className="p-6">
                <div className="w-full flex justify-center">
                    <Check className='w-12 h-12 rounded-full p-2 bg-green-500/30 text-green-500' />
                </div>
                <div className="mt-3 text-center sm:mt-5 w-full">
                    <h3 className='text-lg leading-6 font-medium'>Payment Successful</h3>
                    <p className="mt-2 text-sm text-muted-foreground ">
                        Congrats to your purchase, please check your email for further instructions
                    </p>
                
                    <Button asChild className='mt-5 sm:mt-6 w-full '>
                        <Link href={"/"}>Back to home</Link>
                    </Button>
                </div>
            </div>
        </Card>
    </section>
  )
}

export default SuccessPaymentPage