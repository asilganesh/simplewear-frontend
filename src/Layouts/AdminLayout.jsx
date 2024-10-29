import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import AddProduct from "../Pages/admin/AddProduct";
import ListProducts from "../Pages/admin/ListProducts";
import Orders from "../Pages/admin/Orders";
import AdminLogin from "../Pages/admin/AdminLogin";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const path = useParams()
  const navigate = useNavigate()
  console.log(path)

  const adminLoggedIn = JSON.parse(localStorage.getItem('adminInfo'))

 console.log(adminLoggedIn)



  useEffect(() => {
    document.title = "Simplewear Admin Panel";
    if(!adminLoggedIn) {
      navigate('/adminPanel/login')
     }
    return () => (document.title = "Simplewear");
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const clearAdminToken = () => {
    localStorage.removeItem('adminInfo')
    window.location.reload()
  }

  return (

    <>
      {
        adminLoggedIn
        ?
<>
<section>
        <div className="p-4 flex justify-between align-baseline border-b shadow-sm">
          <div>
            <img
              src={logo}
              alt="SimpleWear"
              className="xsm:h-6 xsm:mt-6 sm:h-8  sm:mt-4"
            />
            <p className="text-start text-lg font-semibold text-purple-600 ml-1 my-2">
              Admin Panel
            </p>
          </div>
          <div className="flex">
            <div>
              <button className="bg-black text-white p-2 border rounded-md mt-4 mr-5"
              onClick={() => clearAdminToken()}
              
              >
                Logout
              </button>
            </div>
            <div className="flex flex-col justify-center lg:hidden xsm:flex mb-3">
              <CiMenuFries onClick={toggleDrawer} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="lg:grid grid-cols-5">
          <div
            className=" col-span-1 border-r min-h-[100vh]
            flex flex-col gap-3  
            items-center py-3 font-sans 
            font-normal text-md
            lg:inline xsm:hidden "
          >
            <Link to="/adminPanel/addProduct" >
              <div
               className={`border-b py-2 px-6 w-full text-black flex gap-2 cursor-pointer ${
                isActive("/adminPanel/addProduct")
                  ? "bg-gray-100 text-black "
                  : ""
              }`}
               >
                <IoMdAddCircleOutline className="mt-1 text-black text-lg " />
                Add Product
              </div>
            </Link>

           <Link to="/adminPanel/listProducts" >
              <div
               className={`border-b py-2 px-6 w-full text-black flex gap-2 cursor-pointer ${
                isActive("/adminPanel/listProducts")
                  ? "bg-gray-100 text-black "
                  : ""
              }`}
               >
              <IoIosList className="mt-1 text-black text-lg " />
              List Products
            </div>
            </Link>


            <Link to="/adminPanel/orders" >
              <div
               className={`border-b py-2 px-6 w-full text-black flex gap-2 cursor-pointer ${
                isActive("/adminPanel/orders")
                  ? "bg-gray-100 text-black "
                  : ""
              }`}
               >
              <MdDone className="mt-1 text-black text-lg " />
              Orders
            </div>
            </Link>
          </div>

          <div className="lg:col-span-4 col-span-1  " >
            <Routes>
              <Route path="/addProduct" element={<AddProduct />} />
              <Route
                path="/listProducts"
                element={<ListProducts />}
              />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </section>

      {/* Side Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } duration-200 ease-in-out z-10`}
      >
        {/* Drawer Content */}
        <div className="flex flex-col p-4">
          <button onClick={toggleDrawer} className="text-right mb-4 ">
            <IoMdClose />
          </button>
          <Link
            to="/adminPanel/addProduct"
            className={`mb-4 p-2  text-center ${
              isActive("/adminPanel/addProduct")
                ? "bg-gray-100 text-white "
                : ""
            }`}
            onClick={toggleDrawer}
          >
            <div className="border-b py-2 px-6 w-full text-black flex gap-2">
              <IoMdAddCircleOutline className="mt-1 text-black text-lg " />
              Add Product
            </div>
          </Link>

          <Link
            to="/adminPanel/listProducts"
            className={`mb-4 p-2  text-center ${
              isActive("/adminPanel/listProducts")
                ? "bg-gray-100 text-white "
                : ""
            }`}
            onClick={toggleDrawer}
          >
            <div className="border-b py-2 px-6 w-full text-black flex gap-2">
              <IoIosList className="mt-1 text-black text-lg " />
              List Products
            </div>
          </Link>

          <Link
            to="/adminPanel/orders"
            className={`mb-4 p-2  text-center ${
              isActive("/adminPanel/orders") ? "bg-gray-100 text-white " : ""
            }`}
            onClick={toggleDrawer}
          >
            <div className="border-b py-2 px-6 w-full text-black flex gap-2">
              <MdDone className="mt-1 text-black text-lg " />
              Orders
            </div>
          </Link>
        </div>
      </div>

      {/* Overlay for closing the drawer by clicking outside */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed top-0 left-0 h-full bg-black opacity-50 transfor delay-300"
          style={{ width: `calc(100% - 16rem)` }}
          onClick={toggleDrawer}
        ></div>
      )}
</>
        :
        <Routes>
          <Route path="/login" element={<AdminLogin/>} />
        </Routes>
      }
    </>
  );
};

export default AdminLayout;
