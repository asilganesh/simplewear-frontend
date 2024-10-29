import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authReducer";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";

const Register = () => {

const dispatch = useDispatch()
const auth = useSelector(state => state.authReducer)
const navigate = useNavigate()

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (value.length === 0 || value.length > 20) {
      setNameError("User Name must be less than 20 characters");
    } else {
      setNameError("");
    }
  };

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

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!value.match(passwordRegex)) {
      setPasswordError(
        "Password should include at least one special character, one capital letter, and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!nameError && !mailError && !passwordError && !confirmPasswordError) {
    
      const userInfo = {
        name,
        mail,
        password,
      }

    dispatch(registerUser(userInfo))
      .then((response) => {
        console.log(response)
        if(response.meta.requestStatus === 'fulfilled'){
            toast.success("Registered Successfully", {
                position: "top-right",
                autoClose: 2000,
              });
              setTimeout(()=>{
                navigate('/auth/login')

              },2000)
        }
        else{
            toast.error(auth.error, {
                position: "top-right",
                autoClose: 2000,
              });
        }       

        clearForm()

      })
      .catch((error)=>{
        console.log(error)
      })



    } else {
        toast.error("Please enter valid data", {
            position: "top-right",
            autoClose: 2000,
          });
    }
  };

  const clearForm = () => {
    setName('')
    setMail('')
    setPassword('')
    setConfirmPassword('')
  }
  return (
    <>
      <div
        className="flex flex-col gap-2 justify-center items-center  bg-black "
        style={{ height: "100vh" }}
      >
          <div className="text-white text-3xl">SIGN UP</div>
      <ToastContainer />
        <form onSubmit={handleSubmit}
          className=" flex flex-col gap-5 border rounded-md border-white xsm:p-10  md:p-20 shadow-white"
        >
          <div className="flex gap-2">
          <CiUser className="text-4xl  text-white" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              className="border-white border-b-2 bg-black text-white p-2 w-full outline-none"
            />
            {nameError && <span className="text-sm text-white bg-red-500  absolute top-50 right-40 p-2 w-1/4 ">{nameError}</span>}
          </div>

          <div className="flex gap-2">
            <MdAlternateEmail  className="text-4xl  text-white" />
            <input
              type="email"
              placeholder="Email"
              value={mail}
              onChange={handleMailChange}
              className="border-white border-b-2 bg-black text-white p-2 w-full outline-none"
            />
            {mailError && <span className="text-sm text-white bg-red-500  absolute top-50 right-40 p-2 w-1/4 ">{mailError}</span>}
          </div>

          <div className="flex gap-2">
            <RiLockPasswordLine className="text-4xl  text-white" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="border-white border-b-2 bg-black text-white p-2 w-full outline-none"
            />
            {passwordError && <span className="text-sm text-white bg-red-500  absolute top-50 right-40 p-2 w-1/4 ">{passwordError}</span>}
          </div>

          <div className="flex gap-2">
            <RiLockPasswordLine className="text-4xl  text-white" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="border-white border-b-2 bg-black text-white p-2 w-full outline-none"
            />
            {confirmPasswordError && <span className="text-sm text-white bg-red-500  absolute top-50 right-40 p-2 w-1/4 ">{confirmPasswordError}</span>}
          </div>

          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
          <div className="text-white text-md">Already have an account,  
          <Link to="/auth/login"><span className="hover:text-blue-400 cursor-pointer"> Login here</span></Link>
        </div>
        </form>
      </div>
    </>
  );
};

export default Register;
