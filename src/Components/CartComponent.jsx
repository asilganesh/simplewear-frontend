import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeProductFromCart, updateItemSize, updateItemQuantity} from '../Redux/cartStore';


const CartComponent = ({product}) => {
    console.log(product.quantity)

    const dispatch = useDispatch()

    const removeItem = (item ) => {
        dispatch(removeProductFromCart(item))
        
    }

    const updateSize = (size ) => {
        console.log(product)
      
        dispatch(updateItemSize({product,size}))
    }

    const updateQuantity = (quantity ) => {
       
        quantity = Number(quantity)
        dispatch(updateItemQuantity({product,quantity}))
    }

 
  return (
    <>
  <div className='flex  p-2 gap-5 border-2 my-3 '>
  


<div className=' h-44 sm:w-36  xsm:30 '>
  <img 
    src={product.image[0]}
    alt="product-image" 
    className='w-full h-full object-cover'
  />
</div>

<div className=' flex flex-col items-start p-2 sm:w-full  xsm:w-24 gap-y-3 '>
  <p className="font-bold ">SIMPLE WEAR</p>
  <p className="text-lg text-gray-500 ">{product.name}</p>
  <div className="sm:flex    gap-x-2  xsm:gap-y-2">
    <select name="" id="" className="border p-1 "  value={product.sizes} onChange={(e) => updateSize(e.target.value)}>
    <option value="S">Size: S </option>
    <option value="M">Size: M</option>
    <option value="L">Size: L</option>
    <option value="XL">Size: XL</option>
    <option value="XXL">Size: XXL</option>
    </select>
    <select name="" id="" className="border p-1"  value={product.quantity}  onChange={(e) => updateQuantity(e.target.value)}>
    <option value="1">Qty: 1 </option>
    <option value="2">Qty: 2 </option>
    <option value="3">Qty: 3 </option>
    <option value="4">Qty: 4 </option>
    <option value="5">Qty: 5 </option>
    <option value="6">Qty: 6 </option>
    <option value="7">Qty: 7 </option>
    <option value="8">Qty: 8 </option>
    <option value="9">Qty: 9 </option>
    <option value="10">Qty: 10 </option>

  
  
    </select>
  </div>
  <p className='text-lg text-black font-medium '>${product.price}</p>
</div >
<IoCloseOutline  className='text-2xl ' onClick={()=>removeItem(product)}/>
</div>

    

    </>
  )
}

export default CartComponent
