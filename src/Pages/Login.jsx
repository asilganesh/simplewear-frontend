import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authReducer";
import { json, Link, useNavigate } from "react-router-dom";
import useAuthManager from "../Composables/useAuthManager";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const { loginWithCredentials } = useAuthManager();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleMailChange = (e) => {
    const value = e.target.value;
    setMail(value);

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.match(mailRegex)) {
      setMailError("Please enter a valid email address");
    } else {
      setMailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!value.match(passwordRegex)) {
      setPasswordError(
        "Password should include at least one special character, one capital letter, and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mailError && !passwordError) {
      const userInfo = {
        mail,
        password,
      };

      loginWithCredentials(userInfo)
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            toast.success("Login Successfully", {
              position: "top-right",
              autoClose: 1000,
            });

            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Login failed", {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .finally(() => {
          clearForm();
        });
    } else {
      toast.error("Please enter valid data", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const clearForm = () => {
    setMail("");
    setPassword("");
  };
  return (
    <>
      <div
        className="flex flex-col gap-2 justify-center items-center  bg-black "
        style={{ height: "100vh" }}
      >
        <div className="text-white text-3xl">LOGIN</div>
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
              onChange={handleMailChange}
              className="border-white border-b-2 bg-black text-white p-2 w-full outline-none"
              title={mailError || ""}
            />
          </div>
            {mailError && (
              <p className="text-sm text-white bg-red-500  absolute top-50 right-40 p-2 w-1/4 ">{mailError}</p>
            )}

          <div className="flex gap-2">
            <RiLockPasswordLine className="text-4xl  text-white" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="border-white border-b-2 bg-black text-white p-2 w-full outline-none"
            />
          </div>
            {passwordError && (
              <p className="text-sm text-white bg-red-500  absolute top-50 right-40 p-2 w-1/4">{passwordError}</p>
            )}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 "
          >
            Submit
          </button>
        <div className="text-white text-md">Don't have an account,  
          <Link to="/auth/register"><span className="hover:text-blue-400 cursor-pointer"> Signup here</span></Link>
        </div>
        </form>
      </div>
    </>
  );
};

export default Login;
