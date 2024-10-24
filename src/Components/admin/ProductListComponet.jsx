import React from "react";
import { IoMdClose } from "react-icons/io";


const ProductListComponet = ({product}) => {
  return (
    <>
      <div className="grid grid-cols-6  p-1 text-gray-600 tex-sm border-y">

    <div className="col-span-1">
        <div className="w-1/3">
        <img src={product.image[0]}  />
        </div>
    </div>
    <div className="col-span-2 flex items-center">
        {product.name}
    </div>
    <div className="col-span-1 flex items-center">
        {product.category}
    </div>
    <div className="col-span-1 flex items-center">
        {product.price}
    </div>
    <div className="col-span-1 text-center flex items-center justify-start ">
    <IoMdClose/>
    </div>
      </div>
    </>
  );
};

export default ProductListComponet;
