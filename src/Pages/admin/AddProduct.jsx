import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../../Redux/productReducer";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: [],
    category: "Men",
    subCategory: "Topwear",
    sizes: [],
    bestseller: false,
    isLatest: false,
  });

  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const [sizes, setSizes] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });

  const clearForm = () => {
        
    setProduct({
      name: "",
      description: "",
      price: "",
      image: [],
      category: "",
      subCategory: "",
      sizes: [],
      bestseller: false,
      isLatest: false,
    });
  
    setImages({
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    });
  
    setSizes({
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
    });
  };

  const addProductData = () => {
    if (!product.image.length) {
      for (let i in images) {
        if (images[i]) {
          product.image.push(images[i]);
        }
      }
    }

    if (!product.sizes.length) {
      for (let i in sizes) {
        if (sizes[i]) {
          product.sizes.push(i);
        }
      }
    }


    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.sizes ||
      !product.image ||
      !product.category ||
      !product.subCategory
    ) {
      toast.warning("Please fill all fields", {
        position: "top-right",
        autoClose: 500,
      });

      return;
    }

    dispatch(addProduct(product))
      .then((response) => {
        toast.success(response.payload.data.message, {
          position: "top-right",
          autoClose: 500,
        });
        
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        clearForm()
      })
    
      
  };
  return (
    <div className="px-20 pt-10 flex flex-col gap-2 ">
      <ToastContainer />
      <form className="grid grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-4">
          <FormInputelement
            fieldHeading="Product Name"
            fieldName="name"
            product={product}
            setProduct={setProduct}
          />

          <div>
            <div>Product Description</div>
            <textarea
              type=""
              value={product.description}
              placeholder="Type description"
              onInput={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="border border-gray-500 rounded-sm p-2 w-1/2 mt-2"
            ></textarea>
          </div>

          <div className="flex gap-6">
            <div>
              <div>Category</div>
              <select
                className="border-2 border-gray-300 text-sm px-2 py-2 mt-2"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kid's">Kid's</option>
              </select>
            </div>

            <div>
              <div>Sub category</div>
              <select
                className="border-2 border-gray-300 text-sm px-2 py-2 mt-2"
                value={product.subCategory}
                onChange={(e) =>
                  setProduct({ ...product, subCategory: e.target.value })
                }
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <div>Price</div>
              <input
                placeholder="299"
                type="number"
                value={product.price}
                onInput={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="border-2 border-gray-300 text-sm px-2 py-2 mt-2 w-1/2"
              />
            </div>
          </div>

          <div>
            <div>Product Sizes</div>
            <div className="flex gap-5 mt-2">
              <p
                className={` px-2 text-lg cursor-pointer ${
                  sizes.S ? "bg-pink-200" : "bg-gray-200"
                }`}
                onClick={() => setSizes({ ...sizes, S: !sizes.S })}
              >
                S
              </p>
              <p
                className={` px-2 text-lg cursor-pointer ${
                  sizes.M ? "bg-pink-200" : "bg-gray-200"
                }`}
                onClick={() => setSizes({ ...sizes, M: !sizes.M })}
              >
                M
              </p>
              <p
                className={` px-2 text-lg cursor-pointer ${
                  sizes.L ? "bg-pink-200" : "bg-gray-200"
                }`}
                onClick={() => setSizes({ ...sizes, L: !sizes.L })}
              >
                L
              </p>
              <p
                className={` px-2 text-lg cursor-pointer ${
                  sizes.XL ? "bg-pink-200" : "bg-gray-200"
                }`}
                onClick={() => setSizes({ ...sizes, XL: !sizes.XL })}
              >
                XL
              </p>
              <p
                className={` px-2 text-lg cursor-pointer ${
                  sizes.XXL ? "bg-pink-200" : "bg-gray-200"
                }`}
                onClick={() => setSizes({ ...sizes, XXL: !sizes.XXL })}
              >
                XXL
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <label>
                <input
                  type="checkbox"
                  value={product.bestseller}
                  onClick={() =>
                    setProduct({ ...product, bestseller: !product.bestseller })
                  }
                ></input>{" "}
                Add to bestseller
              </label>
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  value={product.isLatest}
                  onClick={() =>
                    setProduct({ ...product, isLatest: !product.isLatest })
                  }
                ></input>{" "}
                Add to latest collections
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white w-24 p-3"
            onClick={() => addProductData()}
          >
            ADD
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <FormImageUrlElement
            fieldHeading="Image url-1"
            fieldName="image1"
            images={images}
            setImages={setImages}
          />

          <FormImageUrlElement
            fieldHeading="Image url-2"
            fieldName="image2"
            images={images}
            setImages={setImages}
          />

          <FormImageUrlElement
            fieldHeading="Image url-3"
            fieldName="image3"
            images={images}
            setImages={setImages}
          />

          <FormImageUrlElement
            fieldHeading="Image url-4"
            fieldName="image4"
            images={images}
            setImages={setImages}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

const FormInputelement = ({ product, setProduct, fieldHeading, fieldName }) => {
  return (
    <div>
      <div>{fieldHeading}</div>
      <input
        type="text"
        value={product[fieldName]}
        placeholder="Type name"
        onInput={(e) => setProduct({ ...product, [fieldName]: e.target.value })}
        className="border border-gray-500 rounded-sm w-1/2 p-2  mt-2"
      ></input>
    </div>
  );
};

const FormImageUrlElement = ({
  images,
  setImages,
  fieldHeading,
  fieldName,
}) => {

  return (
    <div>
      <div>{fieldHeading}</div>
      <input
        type="text"
        value={images[fieldName]}
        placeholder="Paste image url"
        onInput={(e) => setImages({ ...images, [fieldName]: e.target.value })}
        className="border border-gray-500 rounded-sm p-2 w-1/2 mt-2"
      ></input>
    </div>
  );
};
