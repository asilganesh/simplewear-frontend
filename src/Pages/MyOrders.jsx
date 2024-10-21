import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrdersListComponent from '../Components/OrdersListComponent'
import useAuthManager from '../Composables/useAuthManager'
import { getOrders } from '../Redux/myOrdersStore'

const MyOrders = () => {
  const dispatch = useDispatch()
  const {getUserId} = useAuthManager()
  const userId =  getUserId()
console.log(userId)
    const {orders} = useSelector(state=>state.myOrdersReducer)

    useEffect(() => {

      dispatch(getOrders(userId))

    },[dispatch,userId])

    console.log(orders)

  return (
    <div className="home max-w-[1200px] w-[80vw] mx-auto">
      <div  className='flex flex-col gap-6'>
      {
       userId && userId.length>0
        ?
        <>
         {
        orders.length>0
        ?
        orders.map((order,index)=>(
            <OrdersListComponent key={index} order={order}/>
        ))
        :
        <div className="text-center text-xl text-gray-400 font-bold h-96 flex flex-col justify-center items-center ">  No orders found </div>

       }
        </>
        :
        <div className="text-center text-xl text-gray-400 font-bold h-96 flex flex-col justify-center items-center ">  Please login to see your placed orders</div>

      }
      </div>
      
    </div>
  )
}

export default MyOrders
