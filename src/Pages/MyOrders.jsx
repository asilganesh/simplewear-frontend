import React from 'react'
import { useSelector } from 'react-redux'
import OrdersListComponent from '../Components/OrdersListComponent'

const MyOrders = () => {

    const {myOrders} = useSelector(state=>state.myOrdersReducer)

    console.log(myOrders)

  return (
    <div className="home max-w-[1200px] w-[80vw] mx-auto">
      <div  className='flex flex-col gap-6'>
       {
        myOrders.length>0
        ?
        myOrders.map((item,index)=>(
            <OrdersListComponent key={index} item={item}/>
        ))
        :
        ""
       }
      </div>
      
    </div>
  )
}

export default MyOrders
