import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/cartStore";
import PriceComponent from "../Components/PriceComponent";
import razorPayLogo from "../assets/razorpayLogo.png";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToMyOrders } from "../Redux/myOrdersStore";
import useAuthManager from "../Composables/useAuthManager";
import axios from "axios";
import { RAZORPAY_KEY_ID, SERVER_API } from "../Helper/serverUrl";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const navigate = useNavigate();
  const { getUserId, getUserName, getEmail } = useAuthManager();
  const userId = getUserId();
  //  const history = unstable_HistoryRouter()

  const [paymenttype, setPaymentType] = useState("COD");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const cartTotal = cart.reduce((acc, val) => {
    return acc + val.totalPrice * val.productQuantity;
  }, 0);

  const procedPayment = async () => {
   
    if (
      !formData.fname ||
      !formData.lname ||
      !formData.email ||
      !formData.state ||
      !formData.street ||
      !formData.zipcode ||
      !formData.phone ||
      !formData.country ||
      !formData.city
    ) {
      toast.warning("Enter Delivery Details", {
        position: "top-right",
        autoClose: 500,
      });

      return;
    }

    const myOrdersData = {
      userId,
      deliveryDetails: formData,
      totalAmount: Number(cartTotal) + 40,
      paymentMethod: paymenttype,
    };

    if (paymenttype === "COD") {
      dispatch(addToMyOrders(myOrdersData))
        .then((response) => {
          if (response.payload) {
            toast.success("Order Placed Sucessfully", {
              position: "top-right",
              autoClose: 500,
            });
            dispatch(clearCart(userId));

            setTimeout(() => {
              navigate("/myOrders");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (paymenttype === "RAZORPAY") {
      try {
        // Create order in backend
        const {
          data: { order },
        } = await axios.post(`${SERVER_API}/createOrder`, {
          userId, // Ideally, fetch from context or state
          amount: cartTotal + 40, // Amount in INR
          currency: "INR",
        });
 
       
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Simple Wear",
          description: "Test Transaction",
          order_id: order.id,
          handler: async function (response) {
            const paymentData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              userId,
            };
            await axios.post(`${SERVER_API}/storePaymentDetails`, paymentData);

            dispatch(addToMyOrders({...myOrdersData,paymentStatus:'Completed'}))
            .then((response) => {
              if (response.payload) {

                dispatch(clearCart(userId));
    
                setTimeout(() => {
                  navigate("/myOrders");
                }, 1000);
              }
            })
            .catch((err) => {
              console.log(err);
            });
            
          },
          prefill: {
            name: getUserName(),
            email: getEmail(),
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        
      } catch (error) {
        console.error("Error in payment process", error);
      }
    }
  };

  return (
    <>
      <div className="home max-w-[1200px] w-[80vw] mx-auto ">
        <ToastContainer />
        <form
          className="grid lg:grid-cols-2 xsm:grid-cols-1  justify-between gap-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="xsm:col-span-1  p-4 flex flex-col gap-y-5">
            <div className="text-xl text-gray-500 my-4">
              DELIVERY <span className="font-medium"> INFORMATION</span>
            </div>
            <div class="flex gap-3">
              <input
                required
                name="firstName"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="First name"
                value={formData.fname}
                onChange={(e) =>
                  setFormData({ ...formData, fname: e.target.value })
                }
              ></input>
              <input
                required
                name="lastName"
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Last name"
                value={formData.lname}
                onChange={(e) =>
                  setFormData({ ...formData, lname: e.target.value })
                }
              ></input>
            </div>
            <input
              required
              name="email"
              class="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            ></input>
            <input
              required
              name="street"
              class="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Street"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
            ></input>
            <div class="flex gap-3">
              <input
                required
                name="city"
                class="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              ></input>
              <input
                name="state"
                class="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              ></input>
            </div>
            <div class="flex gap-3">
              <input
                required
                name="zipcode"
                class="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="number"
                placeholder="Zipcode"
                value={formData.zipcode}
                onChange={(e) =>
                  setFormData({ ...formData, zipcode: e.target.value })
                }
              ></input>
              <input
                required
                name="country"
                class="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              ></input>
            </div>
            <input
              required
              name="phone"
              class="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            ></input>
          </div>

          <div className="priceDetails  xsm:col-span-1 ">
            <div className=" ">
              <div className="p-4 text-xl text-gray-700 ">
                <p>
                  {" "}
                  Order <span className="font-medium">Details</span>
                </p>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <p className="flex justify-between">
                  <span className="text-gray-500">Cart Total</span>{" "}
                  <span className="text-black font-medium">
                    &#x20B9;{cartTotal}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Shipping Fee</span>{" "}
                  <span className="text-black font-medium">&#x20B9;40</span>
                </p>
              </div>
              <div className=" p-4 flex flex-col gap-4">
                <p className="flex justify-between text-base font-bold">
                  <span>Total Amount</span>{" "}
                  <span>&#x20B9;{cartTotal + 40}</span>
                </p>
                <div className="text-xl text-gray-700">
                  Payment <span className="font-medium">Method</span>
                </div>
                <div className="flex justify-evenly gap-2">
                  <div
                    className="flex items-center sm:gap-3 xsm:gap1 border sm:p-2  sm:px-3 xsm:px-1 cursor-pointer"
                    onClick={() => setPaymentType("RAZORPAY")}
                  >
                    <p
                      className={`min-w-3.5 h-3.5 border rounded-full ${
                        paymenttype == "RAZORPAY" ? "bg-green-400" : ""
                      }`}
                    ></p>
                    <img className="h-4 mx-4" src={razorPayLogo} alt="" />
                  </div>
                  <div
                    className="flex items-center  sm:gap-3 xsm:gap1 border sm:p-2 sm:px-3 xsm:px-1  cursor-pointer"
                    onClick={() => setPaymentType("COD")}
                  >
                    <p
                      className={`min-w-3.5 h-3.5 border rounded-full ${
                        paymenttype == "COD" ? "bg-green-400" : ""
                      }`}
                    ></p>
                    <p className="text-gray-500 text-sm font-medium mx-4">
                      CASH ON DELIVERY
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="bg-black text-white p-2 text-base w-1/2 "
                    type="submit"
                    onClick={() => procedPayment()}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
