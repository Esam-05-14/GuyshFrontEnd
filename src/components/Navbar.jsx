import React from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../data/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <div className="fixed top-0 bg-white/80 backdrop-blur-md flex justify-around h-20 w-screen z-20 p-3 shadow-sm">
        <div>
          <img src="/logo.png" alt="Guysh Logo" className="h-16 w-16" />
        </div>
        
        <div>
          <ul className="flex gap-5 md:gap-10 lg:gap-15 pt-3">
            <li className="hover:text-red-400" onClick={()=>navigate('/about')}>About Us</li>
            <li className="hover:text-red-400" onClick={()=>navigate('/services')}>Our Services</li>
            <li className="hover:text-red-400" onClick={()=>navigate('/universities')}>Universities</li>
            <li className="hover:text-red-400" onClick={()=>navigate('/news')}>News</li>
            {auth.isLoggedIn &&  <li className="hover:text-red-400" onClick={() => navigate('/events')}>Events</li> }
            {auth.isLoggedIn  && <li className="hover:text-red-400" onClick={() => navigate('/admin')}>Admin</li> }
          </ul>
        </div>
        
        <div className="flex-col">
          <div className="flex items-center pl-2 pt-1 gap-1 text-sm">
            <p>EN</p> <p className="text-red-700">|</p> <p>AR</p>
          </div>
          {!auth.isLoggedIn  && <button className="bg-[#193042] h-8 text-white px-2 rounded-md" onClick={()=>navigate('/login')}>
            Login / Register
          </button> }
          {auth.isLoggedIn  &&  <button className="bg-[#193042] h-8 text-white px-2 rounded-md" onClick={()=>{
              navigate('/')
              auth.logout()
            }
             }>
            Logout
          </button> }  
        </div>
        
      </div>
    </>
  );
}

export default Navbar;
