import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/cartStore";
import CartComponent from "../Components/CartComponent";
import PriceComponent from "../Components/PriceComponent";
import Loader from "../Components/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const {cart, loading} = useSelector((state) => state.cartReducer);
 
  useEffect(()=>{

  },[cart])

const cartTotal = cart.reduce((acc,val) =>{
  return acc+(val.productPrice*val.productQuantity)

},0)


  const emptyCart = () => {
    dispatch(clearCart());
  };

  return (
   
    <div className="home max-w-[1200px] w-[80vw]  mx-auto ">
      {/* <button onClick={()=>emptyCart()}> Clear Cart</button> */}
     {
      loading
      ?
      <Loader/>
      :
      <div className="grid lg:grid-cols-3 my-5 gap-5 ">
      <div className="yourCart md:col-span-2 " >
        <div className="p-4 text-2xl text-gray-400 ">
         <p> Your <span className="font-medium ">Cart</span></p>
        </div>
       <div className="" >
        {
          cart.length!=0
          ?
          cart.map((item,ind)=>(
            <CartComponent  product = {item} key={ind}/>
          ))
          :
          <div className="text-center text-xl text-gray-400 font-bold h-96 flex flex-col justify-center items-center ">  Your Cart is Empty</div>
        }

       
       </div>
      </div>

      <div className="priceDetails  lg:col-span-1 ">
       {
        cart.length!=0 ? <PriceComponent cartTotal={cartTotal}/>: ""
       }
      </div>
    </div>
     }
    </div>
  );
};

export default Cart;
