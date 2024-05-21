
import { LoadingProductCard } from '@/app/components/ProductCard'
import React from 'react'

type Props = {}

function LoadingCategory({}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 my-7">
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-3'>
            <LoadingProductCard />
        </div>
    </div>
  )
}

export default LoadingCategory