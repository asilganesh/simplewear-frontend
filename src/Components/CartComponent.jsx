import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeProductFromCart, updateItemSize, updateItemQuantity} from '../Redux/cartStore';
import useAuthManager from '../Composables/useAuthManager';


const CartComponent = ({product}) => {

  const{getUserId} = useAuthManager()
  const userId = getUserId()

    const dispatch = useDispatch()

    const removeItem = (itemId ) => {
        dispatch(removeProductFromCart({itemId,userId}))
        
    }

    // const updateSize = (size ) => {
    //     console.log(product)
      
    //     dispatch(updateItemSize({product,size}))
    // }

    // const updateQuantity = (quantity ) => {
       
    //     quantity = Number(quantity)
    //     dispatch(updateItemQuantity({product,quantity}))
    // }

 
  return (
    <>
  <div className='flex  p-2 gap-5 border-2 my-3 '>
  

<div className=' h-44 sm:w-36  xsm:30 '>
  <img 
    src={product.productImage[0]}
    alt="product-image" 
    className='w-full h-full object-cover'
  />
</div>

<div className=' flex flex-col items-start p-2 sm:w-full  xsm:w-24 gap-y-3 '>
  <p className="font-bold ">SIMPLE WEAR</p>
  <p className="text-lg text-gray-500 ">{product.productName}</p>
  <div className="sm:flex    gap-x-2  xsm:gap-y-2">
    <select name="" id="" className="border p-1 "  value={product.productSize} onChange={(e) => updateSize(e.target.value)}>
    <option value="S">Size: S </option>
    <option value="M">Size: M</option>
    <option value="L">Size: L</option>
    <option value="XL">Size: XL</option>
    <option value="XXL">Size: XXL</option>
    </select>
    <select name="" id="" className="border p-1"  value={product.productQuantity}  onChange={(e) => updateQuantity(e.target.value)}>
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
  <p className='text-lg text-black font-medium '>&#x20B9;{product.productPrice * product.productQuantity}</p>
</div >
<IoCloseOutline  className='text-2xl hover:bg-gray-200 hover:border hover:rounded-full' onClick={()=>removeItem(product._id)}/>
</div>

    

    </>
  )
}

export default CartComponent
