import React, { useState } from "react";
import { GoPackage } from "react-icons/go";

const OrdersListComponent = ( {order} ) => {

  const [viewItem, setViewItem] = useState(false)

  const deliveryDate = new Date(order.deliveryDate)
 
console.log(deliveryDate)
  console.log(order)
  return (
    <div className="home max-w-[1200px] w-[80vw] mx-auto"> 
  
    {
      order&&
      <div className={ `${viewItem?"bg-gray-100":""} flex gap-2 justify-center border border-gray-300 relative text-base w-full lg:w-1/2 justify-between p-5 my-4 shadow-md`}>
      <div className="flex flex-col justify-between ">
        <div className="absolute top-0 left-0 p-1 border-b border-r shadow-sm font-bold">{order.orderStatus}</div>
        <div className="p-8">
        <GoPackage className="text-5xl"/>
        </div>
        <div className="absolute bottom-0 cursor-pointer hover:text-gray-700 font-medium hover:scale-90"
        onClick={() => setViewItem(!viewItem)}
        > {viewItem ? (
          <>Hide Items </>
        ) : (
          <>View Items </>
        )}</div>
      </div>
      <div className="flex flex-col justify-center">
        <p>
          Delivered by {deliveryDate.toLocaleDateString()}
        </p>

      </div>
      <div className="flex flex-col justify-center">
        <p className="border border-gray-200 rounded-r-sm shadow-sm text-black p-2">Track order</p>
      </div>
    </div>
    
    }

{
   viewItem && order.products.map((val,ind) => <>
   
   <div className={`flex  p-2 gap-5 border-2 my-3  w-full lg:w-1/2`} >
  

  <div className=' h-44 sm:w-36  xsm:30 '>
    <img 
      src={val.productImage[0]}
      alt="product-image" 
      className='w-full h-full object-cover'
    />
  </div>
  
  <div className=' flex flex-col items-start p-2 sm:w-full  xsm:w-full gap-y-3 '>
    <p className="font-bold ">SIMPLE WEAR</p>
    <p className="text-lg text-gray-500 ">{val.productName}</p>
    <p>Size: {val.productSize}</p>
    <p>Quantity: {val.productQuantity}</p>
    <p className='text-lg text-black font-medium '>&#x20B9;{val.productPrice * val.productQuantity}</p>
  </div >
  </div>
   
   </>)
   
}
    

    </div>

  );
};

export default OrdersListComponent;
