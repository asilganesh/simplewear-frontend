import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authReducer";
import { json, useNavigate } from "react-router-dom";
import useAuthManager from "../Composables/useAuthManager";


const Login = () => {

 const {loginWithCredentials} = useAuthManager()
const dispatch = useDispatch()
const auth = useSelector(state => state.authReducer)
const navigate = useNavigate()



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

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!value.match(passwordRegex)) {
      setPasswordError(
        "Password should include at least one special character, one capital letter, and one number"
      );
    } else {
      setPasswordError("");
    }
  };

 

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if ( !mailError && !passwordError ) {
    
      const userInfo = {
        mail,
        password,
      }

      loginWithCredentials(userInfo)
  
      .then((response) => {
        debugger;
        console.log(response)
        const userInfo = response.payload.userDetails.userInfo
        localStorage.setItem('userInfo',JSON.stringify(userInfo))

        if(response.meta.requestStatus === 'fulfilled'){
          toast.success("Login Successfully", {
            position: "top-right",
            autoClose: 1000,
          });
         
          setTimeout(() => {
            navigate('/')
          },1000)
             
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
    setMail('')
    setPassword('')
  }
  return (
    <>
      <div>
      <ToastContainer />
        <form onSubmit={handleSubmit}>
         
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

        

          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
