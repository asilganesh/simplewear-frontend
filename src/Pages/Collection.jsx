import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productReducer";
import { IoMdClose } from "react-icons/io";

const Collection = () => {
  const [productsArr, setProductsArr] = useState([]);
  const { products } = useSelector((state) => state.productReducer);
  const [sortOrder, setSortOrder] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filters
  const [men, setMen] = useState(false);
  const [women, setWomen] = useState(false);
  const [kids, setKids] = useState(false);
  const [topWear, setTopWear] = useState(false);
  const [bottomWear, setBottomWear] = useState(false);
  const [winterWear, setWinterWear] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filteredProducts = [];

    if (men) {
      filteredProducts = [
        ...products.filter((product) => product.category === "Men"),
        ...filteredProducts,
      ];
    }
    if (women) {
      filteredProducts = [
        ...products.filter((product) => product.category === "Women"),
        ...filteredProducts,
      ];
    }
    if (kids) {
      filteredProducts = [
        ...products.filter((product) => product.category === "Kids"),
        ...filteredProducts,
      ];
    }
    if (topWear) {
      filteredProducts = [
        ...products.filter((product) => product.subCategory === "Topwear"),
        ...filteredProducts,
      ];
    }
    if (bottomWear) {
      filteredProducts = [
        ...products.filter((product) => product.subCategory === "Bottomwear"),
        ...filteredProducts,
      ];
    }
    if (winterWear) {
      filteredProducts = [
        ...products.filter((product) => product.subCategory === "Winterwear"),
        ...filteredProducts,
      ];
    }
    if (!men && !women && !kids && !topWear && !bottomWear && !winterWear) {
      filteredProducts = [...products];
    }

    if (sortOrder === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProductsArr(filteredProducts);
  }, [products, men, women, kids, topWear, bottomWear, winterWear, sortOrder]);

  const changeFilter = (filter) => {
    switch (filter) {
      case "men":
        setMen((prev) => !prev);
        break;
      case "women":
        setWomen((prev) => !prev);
        break;
      case "kids":
        setKids((prev) => !prev);
        break;
      case "topWear":
        setTopWear((prev) => !prev);
        break;
      case "bottomWear":
        setBottomWear((prev) => !prev);
        break;
      case "winterWear":
        setWinterWear((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="home max-w-[1200px] w-[80vw] mx-auto ">
        <div className=" my-10 md:flex gap-10">
          <section className="filters  w-1/4 xsm:hidden md:inline">
            <div className="font-sans text-3xl text-gray-600 font-medium text-start mb-10">
              Filters
            </div>
            <div className="border border-gray-300 pl-5 py-3 mt-6 hidden sm:block">
              <p class="mb-3 text-sm font-medium">CATEGORIES</p>
              <div>
                <label htmlFor="men">
                  <input
                    type="checkbox"
                    name="men"
                    id="men"
                    onChange={() => changeFilter("men")}
                    checked={men}
                  />{" "}
                  <span className="ml-2 text-base">Men</span>
                </label>
              </div>
              <div>
                <label htmlFor="women">
                  <input
                    type="checkbox"
                    name="women"
                    id="women"
                    onChange={() => changeFilter("women")}
                    checked={women}
                  />{" "}
                  <span className="ml-2 text-base">Women</span>
                </label>
              </div>
              <div>
                <label htmlFor="kids">
                  <input
                    type="checkbox"
                    name="kids"
                    id="kids"
                    onChange={() => changeFilter("kids")}
                    checked={kids}
                  />{" "}
                  <span className="ml-2 text-base">Kids</span>
                </label>
              </div>
            </div>

            <div className="border border-gray-300 pl-5 py-3 mt-6 hidden sm:block">
              <p class="mb-3 text-sm font-medium">TYPE</p>
              <div>
                <label htmlFor="topWear">
                  <input
                    type="checkbox"
                    name="topWear"
                    id="topWear"
                    onChange={() => changeFilter("topWear")}
                    checked={topWear}
                  />{" "}
                  <span className="ml-2 text-base">Top Wear</span>
                </label>
              </div>
              <div>
                <label htmlFor="bottomWear">
                  <input
                    type="checkbox"
                    name="bottomWear"
                    id="bottomWear"
                    onChange={() => changeFilter("bottomWear")}
                    checked={bottomWear}
                  />{" "}
                  <span className="ml-2 text-base">Bottom Wear</span>
                </label>
              </div>
              <div>
                <label htmlFor="winterWear">
                  <input
                    type="checkbox"
                    name="winterWear"
                    id="winterWear"
                    onChange={() => changeFilter("winterWear")}
                    checked={winterWear}
                  />{" "}
                  <span className="ml-2 text-base">Winter Wear</span>
                </label>
              </div>
            </div>

            <select
              className="border-2 border-gray-300 text-sm px-2 py-2 mt-6"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="">Sort by:</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </section>

          <section className="collections md:w-2/3  xsm:w-full ">
            <div className="md:text-5xl sm:text-3xl xsm:text-2xl font-roboto text-gray-600 mb-10 flex justify-between">
              <p>
                {" "}
                All{" "}
                <span className="text-gray-600 font-medium">Collections</span>
              </p>
              <p className="md:hidden font-sans text-xl text-gray-600 
              font-medium  p-1 px-2 border-black border-2 "
              onClick={toggleDrawer}
              >
                Filters{" "}
              </p>
            </div>

            <div className="collectionsContainer grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xsm:grid-cols-2 gap-4">
              {productsArr.length > 0
                ? productsArr.map((item, index) => (
                    <ProductCard
                      key={index}
                      imgLink={item.image[0]}
                      title={item.name}
                      price={item.price}
                    />
                  ))
                : "Loading..."}
            </div>
          </section>
        </div>
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } duration-100 ease-in-out z-10`}
      >
        {/* Drawer Content */}
        <div className="flex flex-col p-4">
          <button onClick={toggleDrawer} className="text-right mb-4 ">
            <IoMdClose />
          </button>
          <div className="border border-gray-300 pl-5 py-3 mt-6  ">
            <p class="mb-3 text-sm font-medium">CATEGORIES</p>
            <div>
              <label htmlFor="men">
                <input
                  type="checkbox"
                  name="men"
                  id="men"
                  onChange={() => changeFilter("men")}
                  checked={men}
                />{" "}
                <span className="ml-2 text-base">Men</span>
              </label>
            </div>
            <div>
              <label htmlFor="women">
                <input
                  type="checkbox"
                  name="women"
                  id="women"
                  onChange={() => changeFilter("women")}
                  checked={women}
                />{" "}
                <span className="ml-2 text-base">Women</span>
              </label>
            </div>
            <div>
              <label htmlFor="kids">
                <input
                  type="checkbox"
                  name="kids"
                  id="kids"
                  onChange={() => changeFilter("kids")}
                  checked={kids}
                />{" "}
                <span className="ml-2 text-base">Kids</span>
              </label>
            </div>
          </div>

          <div className="border border-gray-300 pl-5 py-3 mt-6  ">
            <p class="mb-3 text-sm font-medium">TYPE</p>
            <div>
              <label htmlFor="topWear">
                <input
                  type="checkbox"
                  name="topWear"
                  id="topWear"
                  onChange={() => changeFilter("topWear")}
                  checked={topWear}
                />{" "}
                <span className="ml-2 text-base">Top Wear</span>
              </label>
            </div>
            <div>
              <label htmlFor="bottomWear">
                <input
                  type="checkbox"
                  name="bottomWear"
                  id="bottomWear"
                  onChange={() => changeFilter("bottomWear")}
                  checked={bottomWear}
                />{" "}
                <span className="ml-2 text-base">Bottom Wear</span>
              </label>
            </div>
            <div>
              <label htmlFor="winterWear">
                <input
                  type="checkbox"
                  name="winterWear"
                  id="winterWear"
                  onChange={() => changeFilter("winterWear")}
                  checked={winterWear}
                />{" "}
                <span className="ml-2 text-base">Winter Wear</span>
              </label>
            </div>
          </div>

          <select
            className="border-2 border-gray-300 text-sm px-2 py-2 mt-6"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="">Sort by:</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Overlay for closing the drawer by clicking outside */}
      {isDrawerOpen && (
        <div
          className="fixed top-0 left-0 h-full bg-black opacity-50"
          style={{ width: `calc(100% - 16rem)` }}
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
};

export default Collection;