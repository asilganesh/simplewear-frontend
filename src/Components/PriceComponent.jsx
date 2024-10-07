import React from 'react'
import { Link } from 'react-router-dom'

const PriceComponent = ( {cartTotal }) => {



  return (
    <>
    <div className='border '>
    <div className="p-4 text-2xl text-black ">
           <p> Order <span className="font-medium">Details</span></p>
          </div>
        <div className='p-5 flex flex-col gap-2' >
            <p className='flex justify-between'><span className='text-gray-500'>Cart Total</span> <span className='text-black font-medium'>&#x20B9;{cartTotal*10}</span></p>
            <p className='flex justify-between'><span className='text-gray-500'>Shipping Fee</span> <span className='text-black font-medium'>&#x20B9; 40</span></p>
        </div>
        <div className=' p-4 flex flex-col gap-4'>
            <p className='flex justify-between text-lg font-bold'><span>Total Amount</span> <span>&#x20B9;{(cartTotal*10) +40}</span></p>
            <button className='bg-black text-white p-2 text-base '>
                <Link to="/place-order">Proceed To Checkout</Link>
            </button>
        </div>
    </div>
    </>
  )
}

export default PriceComponent
