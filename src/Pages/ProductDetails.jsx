import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productReducer";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { addToCart } from "../Redux/cartStore";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const { id: productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImg, setSelectedImg] = useState("")
 const [size,setSize] = useState("")

  useEffect(() => {
    if (products.length > 0) {
      const data = products.filter((product) => product._id === productId);

      if (data.length > 0) {
        setSelectedProduct(data[0]);
        setSelectedImg(data[0].image[0])
      }

      const relePros = products.filter((product) => {
        return (
          product.subCategory === data[0].subCategory &&
          product.category === data[0].category
        );
      });

      if (relePros.length >= 0) {
        setRelatedProducts(relePros);
      }
    }
  }, [products, productId]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);


  const addProductToCart = (product) => {

    if(!size.length){
        alert("select Size")
        return
    }
    
    product = {...product,sizes:size, quantity:1}
   dispatch(addToCart(product))

  }

  return (
    <div className="home max-w-[1200px] w-[80vw] mx-auto">
      <div>
        

        <section className="details">
          <div className="flex  flex-col justify-between gap-10 sm:flex-row">
            <div className="imges  flex sm:flex-row flex-col justify-between gap-4">
            <div  className=" flex sm:flex-col sm:overflow-y-auto  overflow-x-auto flex-row gap-2  sm:order-1 order-2 w-full sm:w-w18" >
                    {
                        selectedProduct.image ?
                        selectedProduct.image.map(val=>(
                            <img src={val} alt="" srcset=""  className="cursor-pointer sm:w-full w-w18" onClick={()=>setSelectedImg(val) }  />
                        ))
                        :""
                    }
                     
                </div>

                <div className="w-full h-auto sm:order-2 order-1 " >
                    <img src={selectedImg} alt="" className="w-full h-auto" />
                </div>
            </div>
            <div className="productDetais  sm:w-1/2 w-full">
              <h1 className="font-medium text-2xl mt-2">{selectedProduct.name}</h1>
              <h1 className="mt-5 text-3xl font-medium">${selectedProduct.price}</h1>
              <p className="mt-5 text-gray-500 md:w-4/5">{selectedProduct.description}</p>

              <p className="my-4">Select Size</p>

              <div className="flex gap-2 my-4">
                {selectedProduct.sizes
                  ? selectedProduct.sizes.map((val, index) => (
                      <button key={index} className={`border py-2 px-4 bg-gray-100 ${val===size?"border-orange-500":""}`} onClick={()=>setSize(val)}>{val}</button>
                    ))
                  : ""}
              </div>
              <button className="bg-black
               text-white 
              px-8 py-3 text-sm
               active:bg-gray-700 my-4"
               onClick={()=>addProductToCart(selectedProduct)}
              >ADD TO CART</button>

              <hr></hr>

              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="reviews">
          <div className="flex flex-col">
            <span className="border-gray-200   p-4 w-44 text-lg  font-bold">
              Description
            </span>

            <p className="border-gray-200 border-t-2  p-4 flex flex-col gap-6 text-gray-500">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellat ex exercitationem quibusdam nulla accusantium ea
                nesciunt, quis doloribus dolore sunt ducimus quam, cupiditate
                eos, tempore perferendis aut libero consequatur inventore!
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellat ex exercitationem quibusdam nulla accusantium ea
                nesciunt, quis doloribus dolore sunt ducimus quam, cupiditate
                eos, tempore perferendis aut libero consequatur inventore!
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellat ex exercitationem quibusdam nulla accusantium ea
                nesciunt, quis doloribus dolore sunt ducimus quam, cupiditate
                eos, tempore perferendis aut libero consequatur inventore!
              </p>
            </p>
          </div>
        </section>

        <section className=" my-20 flex flex-col gap-y-8 items-center">
          <div className="text-5xl sm:text-3xl xsm:text-2xl font-roboto text-gray-600">
            Related <span className="text-gray-600 font-medium"> Products</span>
          </div>

          <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xsm:grid-cols-2 gap-4">
            {selectedProduct
              ? relatedProducts.length > 0
                ? relatedProducts
                    .slice(0, 4)
                    .map((item, index) => (
                      <ProductCard
                        key={index}
                        productId={item._id}
                        imgLink={item.image[0]}
                        title={item.name}
                        price={item.price}
                      />
                    ))
                : "No Related Products"
              : "Loading..."}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
