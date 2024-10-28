import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersListComponent from "../../Components/admin/OrdersListComponent";
import { getAllOrders, updateOrderStatus } from "../../Redux/myOrdersStore";

const Orders = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    dispatch(getAllOrders()).then((response) =>
      setOrders(response.payload.data)
    );
  }, []);

  const updateStatus = (itemId, status) => {
    console.log(itemId, status);
    dispatch(updateOrderStatus({ itemId, status }))
    .then(response=> {
      if(!response.payload){
        throw new Error(response.error)
      }
      setOrders(response.payload.data)
    })
    .catch(err=>console.log(err))
  };

  return (
    <>
      <div className="px-20 pt-10 flex flex-col gap-3 ">
        <div>Orders</div>
        <div className="flex flex-col gap-3">
          {orders &&
            orders.map((val, ind) => (
              <>
                <OrdersListComponent
                  item={val}
                  key={ind}
                  updateOrderStatus={updateStatus}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
