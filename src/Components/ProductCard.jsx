import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({productId,imgLink, title, price}) => {

  

  return (
   <Link to={`/productDetails/${productId} ` }  target="_self">
    <div className='cursor-pointer shadow-md' >
              <div className='overflow-hidden'>
              <img
                src={imgLink}
                alt="Image"
                className='hover:scale-110 transition ease-in-out'
              />
              </div>
              <div className='text-gray-500 text-sm pt-3 pb-1 font-medium my-1 p-2'>{title}</div>
              <div className='text-gray-500 text-sm font-medium my-1 p-2'>Price: &#x20B9;{price}</div>
            </div>
   </Link>
  )
}

export default ProductCard
