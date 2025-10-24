import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import UserAvatar from "./UserAvatar";

function Navbar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const isAdmin = user?.roles?.is_superuser;
  const isMember = user?.roles?.is_member;
  const isActive = user?.roles?.is_active;

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/logo.png"
            alt="Guysh Logo"
            className="h-14 w-14 object-contain"
          />
          <span className="text-lg font-semibold text-[#193042] hidden sm:block">
            Guysh
          </span>
        </div>

        {/* Middle: Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <button className="hover:text-[#912211]" onClick={() => navigate("/about")}>
            About Us
          </button>
          <button className="hover:text-[#912211]" onClick={() => navigate("/services")}>
            Our Services
          </button>
          <button className="hover:text-[#912211]" onClick={() => navigate("/universities")}>
            Universities
          </button>
          <button className="hover:text-[#912211]" onClick={() => navigate("/news")}>
            News
          </button>

          {isLoggedIn && (isMember || isAdmin || isActive) && (
            <button className="hover:text-[#912211]" onClick={() => navigate("/events")}>
              Events
            </button>
          )}

          {isLoggedIn && isAdmin && (
            <button className="hover:text-[#912211]" onClick={() => navigate("/admin")}>
              Admin
            </button>
          )}
        </nav>

        {/* Right: Language, Auth, and Profile */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="hover:text-[#912211] cursor-pointer">EN</span>
            <span className="text-gray-400">|</span>
            <span className="hover:text-[#912211] cursor-pointer">AR</span>
          </div>

          {/* Login / Logout */}
          {!isLoggedIn ? (
            <button
              className="bg-[#193042] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/my-profile")}>
                <UserAvatar nameOrEmail={user.name || user.email} />
              </button>
              <button
                className="bg-[#912211] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#b23a2c] transition"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
