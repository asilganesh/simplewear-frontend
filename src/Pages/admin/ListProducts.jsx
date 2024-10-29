import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListComponet from "../../Components/admin/ProductListComponet";
import { fetchProducts } from "../../Redux/productReducer";
import { deleteProduct } from "../../Redux/productReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader";

const ListProducts = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const removeProduct = (productId) => {
    dispatch(deleteProduct(productId)).then((response) => {
      if (!response.payload) {
        toast.error("Error occurred, try again", {
          position: "top-right",
          autoClose: 500,
        });
      }

      toast.success(response.payload.data.message, {
        position: "top-right",
        autoClose: 500,
      });
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <div className="px-20 pt-10 flex flex-col gap-2 ">
            <div>All Products</div>
            <div className="grid grid-cols-6 bg-gray-300 p-1 font-semibold">
              <p className="col-span-1">Image</p>
              <p className="col-span-2">Name</p>
              <p className="col-span-1">Category</p>
              <p className="col-span-1">Price</p>
              <p className="col-span-1">Action</p>
            </div>
            <div className="flex flex-col gap-2">
              {products &&
                products.map((val, ind) => (
                  <>
                    <ProductListComponet
                      product={val}
                      key={ind}
                      removeProduct={removeProduct}
                    />
                  </>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListProducts;
