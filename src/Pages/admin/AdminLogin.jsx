import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { json, Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { adminLogin } from "../../Redux/authReducer";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mail, setMail] = useState("admin@gmail.com");

  const [password, setPassword] = useState("Admin@123");

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminData = {
        mail,
        password
    }

    dispatch(adminLogin(adminData))
    .then(response=>
    {
        if(response.err){
            toast.error(response.err || "Login failed", {
                position: "top-right",
                autoClose: 200,
              });
        }

        localStorage.setItem('adminInfo',JSON.stringify(response.payload.adminDetails.data))

        toast.success( "Login Successful", {
            position: "top-right",
            autoClose: 200,
          });
         setTimeout(() => {
            window.location.reload()
         },300)



    }
       
    )

      
    } 
  


  return (
    <>
      <div
        className="flex flex-col gap-2 justify-center items-center  bg-black "
        style={{ height: "100vh" }}
      >
        <div className="text-white text-3xl">ADMIN LOGIN</div>
         <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-5 border rounded-md border-white xsm:p-10  md:p-20 shadow-white"
        >
          <div className="flex gap-2">
            <CiUser className="text-4xl  text-white" />
            <input
              type="email"
              placeholder="Email"
              value={mail}
              className="border-white border-b-2 bg-black  outline-none text-white p-2 w-full"

              
            />
          </div>
           
          <div className="flex gap-2">
            <RiLockPasswordLine className="text-4xl  text-white" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              className="border-white border-b-2 bg-black text-white p-2 w-full outline-none"
            />
          </div>
           

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 "
          >
            Submit
          </button>
      
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
