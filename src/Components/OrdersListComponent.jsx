import React from "react";

const OrdersListComponent = ({ item }) => {
  return (
    <div className="flex flex-wrap justify-between border p-3 sm:text-base xsm:text-sm gap-4">
      <div className="flex gap-2 justify-between h-28 sm:1/3  xsm:30">
       <div className="sm:w-36">
       <img
          src={item.image[0]}
          alt=""
          className=" w-full h-full object-cover"
        />
       </div>
        <div className="w-full flex flex-col gap-1 ">
          <p  className="font-medium">{item.name}</p>
          <p>
          &#x20B9; {item.price } &nbsp; Quantity: {item.quantity} &nbsp; Size:
            {item.sizes}
          </p>
          <p className="text-gray-500"><span className="text-black"> Date: </span> {item.Date}</p>
          <p className="text-gray-500"><span className="text-black">  Payment:</span> {item.Payment}</p>
         
        </div>
      </div>
     <div className="flex flex-col justify-center ">
     <div className="text-gray-500 flex  gap-2  ">  
        <p className="h-3 w-3 border rounded-lg bg-green-400 mt-2"></p>
        <p>{item.orderStatus}</p>
      </div>
     </div>
      <div className="text-black font-medium flex flex-col justify-center">
        <p className="border p-2 px-4 rounded-sm text-sm">Track Order</p>
      </div>
    </div>
  );
};

export default OrdersListComponent;
