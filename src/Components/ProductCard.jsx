import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({productId,imgLink, title, price}) => {
  return (
   <Link to={`/productDetails/${productId} ` }  target="_blank">
    <div className='cursor-pointer' >
              <div className='overflow-hidden'>
              <img
                src={imgLink}
                alt="Image"
                className='hover:scale-110 transition ease-in-out'
              />
              </div>
              <div className='text-gray-500 text-sm pt-3 pb-1 font-medium'>{title}</div>
              <div className='text-gray-500 text-sm font-medium'>${price}</div>
            </div>
   </Link>
  )
}

export default ProductCard
