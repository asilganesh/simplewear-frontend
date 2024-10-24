import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListComponet from "../../Components/admin/ProductListComponet";
import { fetchProducts } from "../../Redux/productReducer";

const ListProducts = () => {
    const dispatch = useDispatch()
    
    const {products} = useSelector(state=>state.productReducer)


    useEffect(()=>{
        dispatch(fetchProducts())
    },[])

  return (
    <>
      <div className="px-20 pt-10 flex flex-col gap-2 ">
        <div >All Products</div>
        <div className="grid grid-cols-6 bg-gray-300 p-1 font-semibold">
          <p className="col-span-1">Image</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-1">Category</p>
          <p className="col-span-1">Price</p>
          <p className="col-span-1">Action</p>
        </div>
        <div  className="flex flex-col gap-2">
{products &&

products.map((val,ind) => <>
<ProductListComponet product={val} key={ind}/>
</>)

}
        </div>
      </div>
    </>
  );
};

export default ListProducts;
