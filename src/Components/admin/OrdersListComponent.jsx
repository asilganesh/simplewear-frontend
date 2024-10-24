import React from 'react'
import { GoPackage } from "react-icons/go";


const OrdersListComponent = ({item, updateOrderStatus}) => {

    const date = new Date(item.orderDate)

   const updateStatus = (value) => {
    updateOrderStatus(item._id, value)
   }


  return (
    <div className='grid grid-cols-7 gap-2 border p-4 text-sm text-gray-800 font-mono' >
        <div className='col-span-1 flex items-center'>

    <GoPackage className='text-4xl'/>
        </div>
        <div className='col-span-2 font-sans flex flex-col gap-2'>
            <p className='flex flex-col gap-1 font-medium text-gray-500'>
                {
                    item.products.map((val,ind)=><>
                    <ItemInfo productInfo={val} key={ind}/>
                    </>)
                }
            </p>

            <p className='font-semibold'>
               {`${item.deliveryDetails.fname} ${item.deliveryDetails.lname}`}
            </p>

            <p>
                {`${item.deliveryDetails.street}`}
            </p>
            <p>
                {`${item.deliveryDetails.state}`}
            </p>
            <p>
                {`${item.deliveryDetails.country}, ${item.deliveryDetails.zipcode}`}
            </p>

        </div>
        <div className='col-span-2 flex flex-col gap-1'>
            <p>Items: {item.products.length} </p>
            <p>Paymemt Method: {item.paymentMethod}</p>
            <p>Payment Status: {item.paymentStatus}</p>
            <p>Date: {date.toLocaleDateString()}</p>
        </div>
        <div className='col-span-1 flex items-center'>{item.totalAmount} Rs</div>
        <div className='col-span-1 flex items-center'>
            {/* {item.orderStatus} */}

            <select
              className="border-2 border-gray-300 text-sm px-2 py-2 mt-6"
              value={item.orderStatus}
              onChange={(e)=>updateStatus(e.target.value)}
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            </div>
       
      
    </div>
  )
}

export default OrdersListComponent


const ItemInfo = ({productInfo}) => {

    return(
        
        <>
       <p> {`${productInfo.productName} X ${productInfo.productQuantity}${productInfo.productSize} `}</p>
        </>
    )
}