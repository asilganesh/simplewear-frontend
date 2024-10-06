import React, { useEffect, useState } from "react";
import hangedTshirts from "../assets/hangedTshirts.png";
import hangedShirts from "../assets/hangedShirts.jpg";
import hangedClothes from "../assets/hangedClothes.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import fetchProductsAsync from "../api/products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productReducer";
import ProductCard from "../Components/ProductCard";
import { RiExchangeFundsLine } from "react-icons/ri";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillCustomerService } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
console.log(products)
  const latestCollectionsArr = () => {
    const collections = [];
    for (let i = 1; i <= 10; i++) {
      collections.push(products[i + 3]);
    }
    return collections;
  };

  const bestSellers = () => {
    const collections = products.filter((value) => {
      return value.bestseller === true;
    });
    return collections;
  };

  useEffect(() => {
  
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="home max-w-[1200px] w-[80vw] mx-auto">
      <section
        className="banner relative m-2 mb-20 "
        style={{ height: "70vh" }}
      >
        <img
          src={hangedTshirts}
          alt="Banner Image"
          className="w-full object-cover border-gray-400 border xsm:h-full "
        />

        <div
          className="bannerTitle flex flex-col 
        lg:gap-y-4  md:gap-y-2 
         xsm:gap-y-0 items-center 
         absolute 
        z-10 text-white font-serif top-2/3 left-1/4 
        transform -translate-x-1/2 -translate-y-1/2 text-center p-4"
        >
          <p className="xsm:text-sm md:text-xl lg:text-2xl">
            Sales up to 50% Off
          </p>
          <h1 className="xsm:text-base md:text-3xl lg:text-6xl ">Effortless</h1>
          <h1 className="xsm:text-base md:text-3xl lg:text-6xl">
            Vacation Style
          </h1>
          <button
            className={`bg-white text-black sm:px-4 sm:py-2 md:mt-4 lg:w-1/3 md:w-2/3  
          xsm:w-3/4 xsm:px-1 xsm:py-1 xsm:text-xs sm:text-base 
          flex justify-between drop-shadow-md
         hover:bg-black hover:text-white hover:scale-110 hover:transition-transform`}
          >
            <Link to='/collection'>Shop Now</Link> <FaArrowRightLong className="mt-1" />
          </button>
        </div>
      </section>

      <section className="latestCollections my-20 flex flex-col gap-y-8 items-center">
        <div className="md: text-5xl sm:text-3xl xsm:text-2xl font-roboto text-gray-600">
          Latest <span className="text-gray-600 font-medium"> Collections</span>
        </div>
        <div className=" w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600  text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </div>
        <div className="latestColectionsContainer grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xsm:grid-cols-2 gap-4">
          {products.length
            ? latestCollectionsArr().map((item, index) => (
                <ProductCard
                  key={index}
                  productId={item._id}
                  imgLink={item.image[0]}
                  title={item.name}
                  price={item.price}
                />
              ))
            : "Loading..."}
        </div>
      </section>

      <section className="bestSellers my-20 flex flex-col gap-y-8 items-center">
        <div className="text-5xl sm:text-3xl xsm:text-2xl font-roboto text-gray-600">
          Best <span className="text-gray-600 font-medium"> Sellers</span>
        </div>
        <div className=" w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600  text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </div>
        <div className="latestColectionsContainer grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xsm:grid-cols-2 gap-4">
          {products.length
            ? bestSellers().map((item, index) => (
                <ProductCard
                  key={index}
                  productId={item._id}
                  imgLink={item.image[0]}
                  title={item.name}
                  price={item.price}
                />
              ))
            : "Loading..."}
        </div>
      </section>

      <section className="whyUS my-20 ">
        <div
          className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 
      text-center py-20 xsm:text-xs sm:text-sm md:text-base text-gray-700"
        >
          <div className="flex flex-col items-center">
            <RiExchangeFundsLine className="mb-4 text-5xl" />
            <p className= "font-semibold">Easy Exchange Policy</p>
            <p className= "text-gray-400">We offer hassle free exchange policy</p>
          </div>

          <div className="flex flex-col items-center">
            <RiVerifiedBadgeFill className="mb-4 text-5xl" />
            <p className= "font-semibold">7 Days Return Policy</p>
            <p className= "text-gray-400">We provide 7 days free return policy</p>
          </div>

          <div className="flex flex-col items-center">
            <AiFillCustomerService className="mb-4 text-5xl" />
            <p className= "font-semibold">Best customer support</p>
            <p className= "text-gray-400">we provide 24/7 customer support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
