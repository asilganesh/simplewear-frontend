import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authReducer";
import { useNavigate } from "react-router-dom";

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
      <div>
      <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              className="border-black border"
            />
            {nameError && <span className="text-sm text-red-400">{nameError}</span>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={mail}
              onChange={handleMailChange}
              className="border-black border"
            />
            {mailError && <span className="text-sm text-red-400">{mailError}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="border-black border"
            />
            {passwordError && <span className="text-sm text-red-400">{passwordError}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="border-black border"
            />
            {confirmPasswordError && <span className="text-sm text-red-400">{confirmPasswordError}</span>}
          </div>

          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
