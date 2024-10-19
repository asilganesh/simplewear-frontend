import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useAuthManager from "../Composables/useAuthManager";
import ProfileSectionComponent from "./profileSectionComponent";
import { fetchCartDetails } from "../Redux/cartStore";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cart = useSelector((state) => state.cartReducer.cart);
  const { getEmail, getUserName, getUserId } = useAuthManager();
  const userId = getUserId();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartDetails(userId));
    }
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <nav className="h-28 flex p-5 xsm:justify-between  w-full max-w-1500">
          <div className="logo flex-none w-82 items-center justify-center  ">
            <img
              src={logo}
              alt="SimpleWear"
              className="xsm:h-6 xsm:mt-6 sm:h-8  sm:mt-4"
            />
          </div>

          <div className="navigations flex w-full justify-center items-center gap-x-8 lg:flex xsm:hidden text-1xl text-gray-700 font-sans font-semibold ">
            <Link
              to="/"
              className={`hover:text-blue-500 ${
                isActive("/") ? "border-b-2 border-blue-500 pb-2" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/collection"
              className={`hover:text-blue-500 ${
                isActive("/collection") ? "border-b-2 border-blue-500 pb-2" : ""
              }`}
            >
              Collection
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-500 ${
                isActive("/about") ? "border-b-2 border-blue-500 pb-2" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:text-blue-500 ${
                isActive("/contact") ? "border-b-2 border-blue-500 pb-2" : ""
              }`}
            >
              Contact
            </Link>
            <Link
              to="/myOrders"
              className={`hover:text-blue-500 ${
                isActive("/myOrders") ? "border-b-2 border-blue-500 pb-2" : ""
              }`}
            >
              My Orders
            </Link>
          </div>

          <div className="icons flex sm:gap-x-7 justify-center items-center text-2xl xsm:gap-x-3">
            <Link to="/collection">
              <IoIosSearch className="hover:text-gray-500" />
            </Link>

            <ProfileSectionComponent />

            <Link to="/cart">
              <div className="relative">
                <IoBagOutline className=" hover:text-gray-500" />
                <p
                  className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4
              bg-black text-white aspect-square rounded-full text-[8px]"
                >
                  {cart.length}
                </p>
              </div>
            </Link>
            <CiMenuFries
              className="menuIcon lg:hidden md:flex hover:text-gray-500"
              onClick={toggleDrawer}
            />
          </div>
        </nav>
      </div>
      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } duration-200 ease-in-out z-10`}
      >
        {/* Drawer Content */}
        <div className="flex flex-col p-4">
          <button onClick={toggleDrawer} className="text-right mb-4 ">
            <IoMdClose />
          </button>
          <Link
            to="/"
            className={`mb-4 p-2 border-b-2 text-center ${
              isActive("/") ? "bg-black text-white " : ""
            }`}
            onClick={toggleDrawer}
          >
            Home
          </Link>
          <Link
            to="/collection"
            className={`mb-4 p-2 border-b-2 text-center ${
              isActive("/collection") ? "bg-black text-white " : ""
            }`}
            onClick={toggleDrawer}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className={`mb-4 p-2 border-b-2 text-center ${
              isActive("/about") ? "bg-black text-white " : ""
            }`}
            onClick={toggleDrawer}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`mb-4 p-2 border-b-2 text-center ${
              isActive("/contact") ? "bg-black text-white " : ""
            }`}
            onClick={toggleDrawer}
          >
            Contact
          </Link>
          <Link
            to="/myOrders"
            className={`mb-4 p-2 border-b-2 text-center ${
              isActive("/myOrders") ? "bg-black text-white " : ""
            }`}
            onClick={toggleDrawer}
          >
            My Orders
          </Link>
        </div>
      </div>

      {/* Overlay for closing the drawer by clicking outside */}
      {isDrawerOpen && (
        <div
          className="fixed top-0 left-0 h-full bg-black opacity-50 transfor delay-300"
          style={{ width: `calc(100% - 16rem)` }}
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
};

export default Navbar;
