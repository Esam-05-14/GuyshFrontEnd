import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const isAdmin = user?.roles?.is_superuser;
  const isMember = user?.roles?.is_member;
  const isActive = user?.roles?.is_active;

  return (
    <div className="fixed top-0 bg-white/80 backdrop-blur-md flex justify-around items-center h-20 w-screen z-20 p-3 shadow-sm">
      {/* Left: Logo */}
      <div>
        <img
          src="/logo.png"
          alt="Guysh Logo"
          className="h-16 w-16 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Middle: Navigation Links */}
      <ul className="flex gap-6 md:gap-10 text-sm md:text-base font-medium">
        <li className="hover:text-red-400 cursor-pointer" onClick={() => navigate("/about")}>
          About Us
        </li>
        <li className="hover:text-red-400 cursor-pointer" onClick={() => navigate("/services")}>
          Our Services
        </li>
        <li className="hover:text-red-400 cursor-pointer" onClick={() => navigate("/universities")}>
          Universities
        </li>
        <li className="hover:text-red-400 cursor-pointer" onClick={() => navigate("/news")}>
          News
        </li>

        {/* ✅ Show "Events" only to logged-in active members or admins */}
        {isLoggedIn && (isMember || isAdmin || isActive) && (
          <li className="hover:text-red-400 cursor-pointer" onClick={() => navigate("/events")}>
            Events
          </li>
        )}

        {/* ✅ Show "Admin" only to superusers */}
        {isLoggedIn && isAdmin && (
          <li className="hover:text-red-400 cursor-pointer" onClick={() => navigate("/admin")}>
            Admin
          </li>
        )}
      </ul>

      {/* Right: Language + Login/Logout */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-xs md:text-sm mb-1">
          <p>EN</p>
          <p className="text-red-700">|</p>
          <p>AR</p>
        </div>

        {/* ✅ Conditional auth buttons */}
        {!isLoggedIn ? (
          <button
            className="bg-[#193042] h-8 text-white px-3 rounded-md text-sm hover:bg-[#254e6f]"
            onClick={() => navigate("/login")}
          >
            Login / Register
          </button>
        ) : (
          <button
            className="bg-[#912211] h-8 text-white px-3 rounded-md text-sm hover:bg-[#b23a2c]"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
