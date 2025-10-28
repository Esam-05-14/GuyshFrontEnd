import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import UserAvatar from "./UserAvatar";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const { user, isLoggedIn, logout, myProfile, language, changeLanguage } = useAuth();
  const isAdmin = user?.roles?.is_superuser;
  const isMember = user?.roles?.is_member;
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
        
        {/* Logo */}
        <div className={`flex items-center space-x-3 cursor-pointer ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`} onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Guysh Logo" className="h-14 w-14 object-contain" />
          <span className="text-lg font-semibold text-[#193042] hidden sm:block">GUYSH</span>
        </div>

        {/* Navigation */}
        <nav className={`hidden md:flex space-x-8 text-gray-700 font-medium ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <button onClick={() => navigate("/about")} className="hover:text-[#912211]">{t("nav.about")}</button>
          <button onClick={() => navigate("/services")} className="hover:text-[#912211]">{t("nav.services")}</button>
          <button onClick={() => navigate("/universities")} className="hover:text-[#912211]">{t("nav.universities")}</button>
          <button onClick={() => navigate("/news")} className="hover:text-[#912211]">{t("nav.news")}</button>

          {isLoggedIn && (isMember || isAdmin) && (
            <button onClick={() => navigate("/events")} className="hover:text-[#912211]">{t("nav.events")}</button>
          )}

          {isLoggedIn && isAdmin && (
            <button onClick={() => navigate("/admin")} className="hover:text-[#912211]">{t("nav.admin")}</button>
          )}

          {isLoggedIn && !isMember && !myProfile && (
            <button
              onClick={() => navigate("/membership-form")}
              className="bg-[#6e9225] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
            >
              {t("nav.finishProfile")}
            </button>
          )}
        </nav>

        {/* Right: Language & Auth */}
        <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Language Switch */}
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700">
            <span
              onClick={() => changeLanguage("en")}
              className={`cursor-pointer hover:text-[#912211] ${language === "en" ? "font-bold text-[#912211]" : ""}`}
            >EN</span>
            <span className="text-gray-400">|</span>
            <span
              onClick={() => changeLanguage("ar")}
              className={`cursor-pointer hover:text-[#912211] ${language === "ar" ? "font-bold text-[#912211]" : ""}`}
            >AR</span>
          </div>

          {/* Login / Logout */}
          {!isLoggedIn ? (
            <button
              className="bg-[#193042] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
              onClick={() => navigate("/login")}
            >
              {t("nav.login")}
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
                {t("nav.logout")}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

