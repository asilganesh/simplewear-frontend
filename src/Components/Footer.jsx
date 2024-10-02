import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      alert("Email is correct!");
      setError("");
    } else {
      setError("Please Enter Correct Email");
    }
  };

  return (
    <div className="w-full  flex justify-center bg-black p-10">
      <div className="max-w-1500 grow" >
      <footer
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 p-5 xsm:justify-between  w-full max-w-1500 "
       
      >
        <div className="subscription">
          <div className="text-white text-3xl  my-8">Get Exclusive Updates</div>
          <div className="text-gray-500 my-8 ">
            Subscribe for early access, exclusive discounts and partnerships
          </div>
          <div className="relative my-8">
  <form onSubmit={handleSubmit} className="relative flex">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="bg-black border text-white border-gray-500 p-2 w-full outline-none"
      placeholder="Enter your Email"
    />
    <button
      className="p-2  text-white flex items-center justify-center absolute right-1"
      type="submit"
    >
      <FaArrowRightLong className="text-white text-2xl" />
    </button>
   
  </form>
  {error && <p className="text-red-500 mt-1 w-full">{error}</p>}
</div>
          <div className="socialIcons flex gap-x-6 justify-start text-xl my-8">
            <FaFacebookF className="text-white" />
            <FaInstagram className="text-white" />
            <FaPinterestP className="text-white" />
            <FaXTwitter className="text-white" />
          </div>
        </div>

      <div className="flex lg:justify-center">
      <div className="aboutus text-white flex flex-col gap-y-4">
        <h2 className="font-bold">About Us</h2> {/* Adjusted font class */}
          <p className="text-gray-400 hover:text-blue-200">Our Story</p>
          <p className="text-gray-400 hover:text-blue-200">Store Locations</p>
          <p className="text-gray-400 hover:text-blue-200">Careers</p>
          <p className="text-gray-400 hover:text-blue-200">Our Blog</p>
          <p className="text-gray-400 hover:text-blue-200">Brands</p>
          <p className="text-gray-400 hover:text-blue-200">Contact Us</p>
        </div>
      </div>

      <div className="flex lg:justify-center">
        <div className="categories text-white flex flex-col gap-y-4  ">
          <h2 className="font-bold">Shop Categories</h2> {/* Adjusted font class */}
          <p className="text-gray-400 hover:text-blue-200">Men</p>
          <p className="text-gray-400 hover:text-blue-200">Women</p>
          <p className="text-gray-400 hover:text-blue-200">Shoes</p>
          <p className="text-gray-400 hover:text-blue-200">Watches</p>
          <p className="text-gray-400 hover:text-blue-200">Jewelry</p>
          <p className="text-gray-400 hover:text-blue-200">Bags</p>
        </div>
        </div>

        <div className="flex lg:justify-center">
        <div className="customareCare text-white flex flex-col gap-y-4  ">
          <h2 className="font-bold">Customer Care</h2> {/* Adjusted font class */}
          <p className="text-gray-400 hover:text-blue-200">FAQs</p>
          <p className="text-gray-400 hover:text-blue-200">Collections & Delivery</p>
          <p className="text-gray-400 hover:text-blue-200">CarReturns & Refundseers</p>
          <p className="text-gray-400 hover:text-blue-200">Privacy Policy</p>
          <p className="text-gray-400 hover:text-blue-200">Shipping Policy</p>
          <p className="text-gray-400 hover:text-blue-200">Store Locations</p>
        </div>
        </div>


       
      </footer>

      <hr className="bg-gray"></hr>
      <div className="text-gray-400 text-center mt-3">
        <p>&copy; Ganesh Asil, All rights are reserved</p>
      </div>
      </div>
    </div>
  );
};

export default Footer;
