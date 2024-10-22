import React, { useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useAuthManager from "../Composables/useAuthManager";

const ProfileSectionComponent = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const { getUserName,logout } = useAuthManager();
  return (
    <div
      className={`relative  p-4 ${openProfile?" border-b-4 border-black ":""}`}
      onMouseEnter={() => setOpenProfile(true)} 
      onMouseLeave={() => setOpenProfile(false)} 
    >
    
      <HiOutlineUser className="hover:text-gray-500" />

     
      {openProfile && (
        <div className="absolute right-0 mt-5  text-black text-base flex flex-col z-30 p-5 bg-white  shadow-lg">


          
          {
            getUserName() ?
           <>
            <div className="border-gray-400 p-2">Welcome {getUserName()}</div>
            <hr />
            <div
              className="border-gray-400 p-2 cursor-pointer hover:bg-black hover:text-white"
           onClick={()=>logout()}
            >
              Logout
            </div></>
            : 
           <Link to="/auth/login" ><div
           className="border-gray-400 p-2 cursor-pointer hover:bg-black hover:text-white"
         >
           Login
         </div></Link>
          }
          

          
        </div>
      )}
    </div>
  );
};

export default ProfileSectionComponent;
