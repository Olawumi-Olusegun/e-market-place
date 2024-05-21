
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

function CancelPaymentPage({}: Props) {
  return (
    <section className='min-h-[80vh] w-full flex flex-center items-center justify-center'>
        <Card className='w-[350px]'>
            <div className="p-6">
                <div className="w-full flex justify-center">
                    <XCircle className='w-12 h-12 rounded-full p-2 bg-red-500/30 text-red-500' />
                </div>
                <div className="mt-3 text-center sm:mt-5 w-full">
                    <h3 className='text-lg leading-6 font-medium'>Payment Cancelled</h3>
                    <p className="mt-2 text-sm text-muted-foreground ">Something went with your payment. Younhave not been charged, Please try again</p>
                
                    <Button asChild className='mt-5 sm:mt-6 w-full '>
                        <Link href={"/"}>Back to home</Link>
                    </Button>
                </div>
            </div>
        </Card>
    </section>
  )
}

export default CancelPaymentPage