import React from 'react'

const ProductCard = ({imgLink, title, price}) => {
  return (
    <div >
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
  )
}

export default ProductCard
