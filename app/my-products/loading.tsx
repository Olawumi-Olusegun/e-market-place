
import React from 'react'
import { LoadingProductCard } from '../components/ProductCard'

type Props = {}

function LoadingMyProducts({}: Props) {
  return (
    <div className='max-w-7xl mx-auto px-4 md:px-8 my-7'>
        <div className="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
        </div>
    </div>
  )
}

export default LoadingMyProducts