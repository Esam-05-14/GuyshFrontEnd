// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../data/AuthContext";
// // import UserAvatar from "./UserAvatar";
// // import { useTranslation } from "react-i18next";

// // export default function Navbar() {
// //   const { t } = useTranslation();
// //   const { user, isLoggedIn, logout, myProfile, language, changeLanguage } = useAuth();
// //   const isAdmin = user?.roles?.is_superuser;
// //   const isMember = user?.roles?.is_member;
// //   const navigate = useNavigate()

// //   return (
// //     <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-20">
// //       <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
        
// //         {/* Logo */}
// //         <div className={`flex items-center space-x-3 cursor-pointer ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`} onClick={() => navigate("/")}>
// //           <img src="/logo.png" alt="Guysh Logo" className="h-14 w-14 object-contain" />
// //           <span className="text-lg font-semibold text-[#193042] hidden sm:block">GUYSH</span>
// //         </div>

// //         {/* Navigation */}
// //         <nav className={`hidden md:flex space-x-8 text-gray-700 font-medium ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
// //           <button onClick={() => navigate("/about")} className="hover:text-[#912211]">{t("nav.about")}</button>
// //           <button onClick={() => navigate("/services")} className="hover:text-[#912211]">{t("nav.services")}</button>
// //           <button onClick={() => navigate("/universities")} className="hover:text-[#912211]">{t("nav.universities")}</button>
// //           <button onClick={() => navigate("/news")} className="hover:text-[#912211]">{t("nav.news")}</button>

// //           {isLoggedIn && (isMember || isAdmin) && (
// //             <button onClick={() => navigate("/events")} className="hover:text-[#912211]">{t("nav.events")}</button>
// //           )}

// //           {isLoggedIn && isAdmin && (
// //             <button onClick={() => navigate("/admin")} className="hover:text-[#912211]">{t("nav.admin")}</button>
// //           )}

// //           {isLoggedIn && !isMember && !myProfile && (
// //             <button
// //               onClick={() => navigate("/membership-form")}
// //               className="bg-[#6e9225] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
// //             >
// //               {t("nav.finishProfile")}
// //             </button>
// //           )}
// //         </nav>

// //         {/* Right: Language & Auth */}
// //         <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
// //           {/* Language Switch */}
// //           <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700">
// //             <span
// //               onClick={() => changeLanguage("en")}
// //               className={`cursor-pointer hover:text-[#912211] ${language === "en" ? "font-bold text-[#912211]" : ""}`}
// //             >EN</span>
// //             <span className="text-gray-400">|</span>
// //             <span
// //               onClick={() => changeLanguage("ar")}
// //               className={`cursor-pointer hover:text-[#912211] ${language === "ar" ? "font-bold text-[#912211]" : ""}`}
// //             >AR</span>
// //           </div>

// //           {/* Login / Logout */}
// //           {!isLoggedIn ? (
// //             <button
// //               className="bg-[#193042] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
// //               onClick={() => navigate("/login")}
// //             >
// //               {t("nav.login")}
// //             </button>
// //           ) : (
// //             <>
// //               <button onClick={() => navigate("/my-profile")}>
// //                 <UserAvatar nameOrEmail={user.name || user.email} />
// //               </button>
// //               <button
// //                 className="bg-[#912211] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#b23a2c] transition"
// //                 onClick={() => {
// //                   logout();
// //                   navigate("/");
// //                 }}
// //               >
// //                 {t("nav.logout")}
// //               </button>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }


// // import React, { useState} from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../data/AuthContext";
// // import UserAvatar from "./UserAvatar";
// // import { useTranslation } from "react-i18next";
// // import { deleteProfile } from "../services/authService";

// // export default function Navbar() {
// //   const { t } = useTranslation();
// //   const {
// //     user,
// //     isLoggedIn,
// //     logout,
// //     myProfile,
// //     language,
// //     changeLanguage,
// //   } = useAuth();
// //   const isAdmin = user?.roles?.is_superuser;
// //   const isMember = user?.roles?.is_member;
// //   const navigate = useNavigate();
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   const isRTL = language === "ar";


// //   const handleDeleteProfile = async () => {
// //     if (window.confirm(t("nav.confirmDelete"))) {
// //       try{
// //         const res = await deleteProfile()
// //         alert(t("nav.profileDeleted"));


// //       }catch(err){
// //         console.log("Cannot delete profile");
        
// //       }
// //       // alert(t("nav.profileDeleted"));
// //     }
// //   };

// //   return (
// //     <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-20">
// //       <div
// //         className={`max-w-7xl mx-auto flex justify-between items-center h-20 px-6 ${
// //           isRTL ? "flex-row-reverse" : ""
// //         }`}
// //       >
// //         {/* Logo */}
// //         <div
// //           className={`flex items-center space-x-3 cursor-pointer ${
// //             isRTL ? "flex-row-reverse space-x-reverse" : ""
// //           }`}
// //           onClick={() => navigate("/")}
// //         >
// //           <img
// //             src="/logo.png"
// //             alt="Guysh Logo"
// //             className="h-14 w-14 object-contain"
// //           />
// //           <span className="text-lg font-semibold text-[#193042] hidden sm:block">
// //             GUYSH
// //           </span>
// //         </div>

// //         {/* Navigation */}
// //         <nav
// //           className={`hidden md:flex space-x-8 text-gray-700 font-medium ${
// //             isRTL ? "flex-row-reverse space-x-reverse" : ""
// //           }`}
// //         >
// //           <button
// //             onClick={() => navigate("/about")}
// //             className="hover:text-[#912211]"
// //           >
// //             {t("nav.about")}
// //           </button>
// //           <button
// //             onClick={() => navigate("/services")}
// //             className="hover:text-[#912211]"
// //           >
// //             {t("nav.services")}
// //           </button>
// //           <button
// //             onClick={() => navigate("/universities")}
// //             className="hover:text-[#912211]"
// //           >
// //             {t("nav.universities")}
// //           </button>
// //           <button
// //             onClick={() => navigate("/news")}
// //             className="hover:text-[#912211]"
// //           >
// //             {t("nav.news")}
// //           </button>

// //           {isLoggedIn && (isMember || isAdmin) && (
// //             <button
// //               onClick={() => navigate("/events")}
// //               className="hover:text-[#912211]"
// //             >
// //               {t("nav.events")}
// //             </button>
// //           )}

// //           {isLoggedIn && isAdmin && (
// //             <button
// //               onClick={() => navigate("/admin")}
// //               className="hover:text-[#912211]"
// //             >
// //               {t("nav.admin")}
// //             </button>
// //           )}

// //           {isLoggedIn && !isMember && !myProfile && (
// //             <button
// //               onClick={() => navigate("/membership-form")}
// //               className="bg-[#6e9225] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
// //             >
// //               {t("nav.finishProfile")}
// //             </button>
// //           )}
// //         </nav>

// //         {/* Right Side */}
// //         <div
// //           className={`flex items-center space-x-4 relative ${
// //             isRTL ? "flex-row-reverse space-x-reverse" : ""
// //           }`}
// //         >
// //           {/* Language Switch */}
// //           <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700">
// //             <span
// //               onClick={() => changeLanguage("ar")}
// //               className={`cursor-pointer hover:text-[#912211] ${
// //                 language === "ar" ? "font-bold text-[#912211]" : ""
// //               }`}
// //             >
// //               AR
// //             </span>
// //             <span className="text-gray-400">|</span>
// //             <span
// //               onClick={() => changeLanguage("en")}
// //               className={`cursor-pointer hover:text-[#912211] ${
// //                 language === "en" ? "font-bold text-[#912211]" : ""
// //               }`}
// //             >
// //               EN
// //             </span>
// //           </div>

// //           {/* Auth Buttons */}
// //           {!isLoggedIn ? (
// //             <button
// //               className="bg-[#193042] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#254e6f] transition"
// //               onClick={() => navigate("/login")}
// //             >
// //               {t("nav.login")}
// //             </button>
// //           ) : (
// //             <div className="relative">
// //               <button onClick={() => setMenuOpen(!menuOpen)}>
// //                 <UserAvatar nameOrEmail={user.name || user.email} />
// //               </button>

// //               {/* Dropdown Menu */}
// //               {menuOpen && (
// //                 <div
// //                   className={`absolute mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-in-out ${
// //                     isRTL ? "right-0" : "-left-38"
// //                   }`}
// //                 >
// //                   <button
// //                     onClick={() => {
// //                       navigate("/my-profile");
// //                       setMenuOpen(false);
// //                     }}
// //                     className={`w-full px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2 ${
// //                       isRTL ? "flex-row-reverse text-right" : "text-left"
// //                     }`}
// //                   >
// //                     👤 {t("nav.viewProfile")}
// //                   </button>

// //                   <button
// //                     onClick={() => {
// //                       handleDeleteProfile();
// //                       logout();
// //                       navigate("/");
// //                       setMenuOpen(false);
// //                     }}
// //                     className={`w-full px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2 ${
// //                       isRTL ? "flex-row-reverse text-right" : "text-left"
// //                     }`}
// //                   >
// //                     🗑️ {t("nav.deleteProfile")}
// //                   </button>

// //                   <button
// //                     onClick={() => {
// //                       logout();
// //                       navigate("/");
// //                       setMenuOpen(false);
// //                     }}
// //                     className={`w-full px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2 ${
// //                       isRTL ? "flex-row-reverse text-right" : "text-left"
// //                     }`}
// //                   >
// //                     🔓 {t("nav.logout")}
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../data/AuthContext";
// // import UserAvatar from "./UserAvatar";
// // import { useTranslation } from "react-i18next";
// // import { deleteProfile } from "../services/authService";
// // import { 
// //   User, 
// //   Trash2, 
// //   LogOut, 
// //   Menu, 
// //   X, 
// //   ChevronRight,
// //   Globe,
// //   Info,
// //   Briefcase,
// //   GraduationCap,
// //   Newspaper,
// //   Calendar,
// //   Shield
// // } from "lucide-react";

// // export default function Navbar() {
// //   const { t } = useTranslation();
// //   const {
// //     user,
// //     isLoggedIn,
// //     logout,
// //     myProfile,
// //     language,
// //     changeLanguage,
// //   } = useAuth();
// //   const isAdmin = user?.roles?.is_superuser;
// //   const isMember = user?.roles?.is_member;
// //   const navigate = useNavigate();
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const menuRef = useRef(null);
// //   const mobileMenuRef = useRef(null);

// //   const isRTL = language === "ar";

// //   // Close menu when clicking outside
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// //         setMenuOpen(false);
// //       }
// //       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
// //         setMobileMenuOpen(false);
// //       }
// //     }

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Prevent body scroll when mobile menu is open
// //   useEffect(() => {
// //     if (mobileMenuOpen) {
// //       document.body.style.overflow = "hidden";
// //     } else {
// //       document.body.style.overflow = "unset";
// //     }
// //     return () => {
// //       document.body.style.overflow = "unset";
// //     };
// //   }, [mobileMenuOpen]);

// //   const handleDeleteProfile = async () => {
// //     if (window.confirm(t("nav.confirmDelete"))) {
// //       try {
// //         await deleteProfile();
// //         alert(t("nav.profileDeleted"));
// //         logout();
// //         navigate("/");
// //       } catch (err) {
// //         console.log("Cannot delete profile");
// //       }
// //     }
// //   };

// //   const navItems = [
// //     { path: "/about", label: t("nav.about"), icon: Info },
// //     { path: "/services", label: t("nav.services"), icon: Briefcase },
// //     { path: "/universities", label: t("nav.universities"), icon: GraduationCap },
// //     { path: "/news", label: t("nav.news"), icon: Newspaper },
// //   ];

// //   if (isLoggedIn && (isMember || isAdmin)) {
// //     navItems.push({ path: "/events", label: t("nav.events"), icon: Calendar });
// //   }

// //   if (isLoggedIn && isAdmin) {
// //     navItems.push({ path: "/admin", label: t("nav.admin"), icon: Shield });
// //   }

// //   const handleNavigation = (path) => {
// //     navigate(path);
// //     setMobileMenuOpen(false);
// //   };

// //   return (
// //     <>
// //       <header className="sticky top-0 left-0 w-full bg-white/95 backdrop-blur-lg shadow-md z-50 border-b border-gray-100">
// //         <div
// //           className={`max-w-7xl mx-auto flex justify-between items-center h-20 px-4 sm:px-6 ${
// //             isRTL ? "flex-row-reverse" : ""
// //           }`}
// //         >
// //           {/* Logo */}
// //           <div
// //             className={`flex items-center space-x-3 cursor-pointer group ${
// //               isRTL ? "flex-row-reverse space-x-reverse" : ""
// //             }`}
// //             onClick={() => navigate("/")}
// //           >
// //             <div className="relative">
// //               <img
// //                 src="/logo.png"
// //                 alt="Guysh Logo"
// //                 className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform duration-300 group-hover:scale-110"
// //               />
// //               <div className="absolute inset-0 bg-[#193042] opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
// //             </div>
// //             <span className="text-xl font-bold text-[#193042] hidden sm:block tracking-tight">
// //               GUYSH
// //             </span>
// //           </div>

// //           {/* Desktop Navigation */}
// //           <nav
// //             className={`hidden lg:flex items-center space-x-1 ${
// //               isRTL ? "flex-row-reverse space-x-reverse" : ""
// //             }`}
// //           >
// //             {navItems.map((item) => {
// //               const Icon = item.icon;
// //               return (
// //                 <button
// //                   key={item.path}
// //                   onClick={() => navigate(item.path)}
// //                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#912211] hover:bg-gray-50 transition-all duration-200 ${
// //                     isRTL ? "flex-row-reverse" : ""
// //                   }`}
// //                 >
// //                   <Icon size={18} />
// //                   <span>{item.label}</span>
// //                 </button>
// //               );
// //             })}

// //             {isLoggedIn && !isMember && !myProfile && (
// //               <button
// //                 onClick={() => navigate("/membership-form")}
// //                 className="ml-2 bg-gradient-to-r from-[#6e9225] to-[#5a7a1e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
// //               >
// //                 {t("nav.finishProfile")}
// //               </button>
// //             )}
// //           </nav>

// //           {/* Right Side */}
// //           <div
// //             className={`flex items-center gap-3 sm:gap-4 ${
// //               isRTL ? "flex-row-reverse" : ""
// //             }`}
// //           >
// //             {/* Language Switch - Desktop */}
// //             <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
// //               <button
// //                 onClick={() => changeLanguage("ar")}
// //                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
// //                   language === "ar"
// //                     ? "bg-white text-[#912211] shadow-sm"
// //                     : "text-gray-600 hover:text-gray-900"
// //                 }`}
// //               >
// //                 AR
// //               </button>
// //               <button
// //                 onClick={() => changeLanguage("en")}
// //                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
// //                   language === "en"
// //                     ? "bg-white text-[#912211] shadow-sm"
// //                     : "text-gray-600 hover:text-gray-900"
// //                 }`}
// //               >
// //                 EN
// //               </button>
// //             </div>

// //             {/* Auth Section */}
// //             {!isLoggedIn ? (
// //               <button
// //                 className="bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
// //                 onClick={() => navigate("/login")}
// //               >
// //                 {t("nav.login")}
// //               </button>
// //             ) : (
// //               <div className="relative" ref={menuRef}>
// //                 <button
// //                   onClick={() => setMenuOpen(!menuOpen)}
// //                   className="hover:opacity-80 transition-opacity duration-200"
// //                 >
// //                   <UserAvatar nameOrEmail={user.name || user.email} />
// //                 </button>

// //                 {/* Dropdown Menu */}
// //                 {menuOpen && (
// //                   <div
// //                     className={`absolute mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 transform transition-all duration-200 ease-out ${
// //                       isRTL ? "right-0 origin-top-right" : "-left-38 origin-top-left"
// //                     }`}
// //                   >
// //                     <div className="px-4 py-3 border-b border-gray-100">
// //                       <p className="text-sm font-semibold text-gray-900 truncate">
// //                         {user.name || user.email}
// //                       </p>
// //                       <p className="text-xs text-gray-500 truncate">{user.email}</p>
// //                     </div>

// //                     <button
// //                       onClick={() => {
// //                         navigate("/my-profile");
// //                         setMenuOpen(false);
// //                       }}
// //                       className={`w-full px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors ${
// //                         isRTL ? "flex-row-reverse text-right" : "text-left"
// //                       }`}
// //                     >
// //                       <User size={18} className="text-gray-500" />
// //                       <span className="text-sm font-medium">{t("nav.viewProfile")}</span>
// //                     </button>

// //                     <button
// //                       onClick={() => {
// //                         handleDeleteProfile();
// //                         setMenuOpen(false);
// //                       }}
// //                       className={`w-full px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors ${
// //                         isRTL ? "flex-row-reverse text-right" : "text-left"
// //                       }`}
// //                     >
// //                       <Trash2 size={18} />
// //                       <span className="text-sm font-medium">{t("nav.deleteProfile")}</span>
// //                     </button>

// //                     <div className="border-t border-gray-100 my-1"></div>

// //                     <button
// //                       onClick={() => {
// //                         logout();
// //                         navigate("/");
// //                         setMenuOpen(false);
// //                       }}
// //                       className={`w-full px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors ${
// //                         isRTL ? "flex-row-reverse text-right" : "text-left"
// //                       }`}
// //                     >
// //                       <LogOut size={18} className="text-gray-500" />
// //                       <span className="text-sm font-medium">{t("nav.logout")}</span>
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {/* Mobile Menu Button */}
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //             >
// //               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Mobile Sidebar Overlay */}
// //       {mobileMenuOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
// //           onClick={() => setMobileMenuOpen(false)}
// //         />
// //       )}

// //       {/* Mobile Sidebar */}
// //       <div
// //         ref={mobileMenuRef}
// //         className={`fixed top-0 ${
// //           isRTL ? "left-0" : "right-0"
// //         } h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out ${
// //           mobileMenuOpen
// //             ? "translate-x-0"
// //             : isRTL
// //             ? "-translate-x-full"
// //             : "translate-x-full"
// //         }`}
// //       >
// //         <div className="flex flex-col h-full">
// //           {/* Sidebar Header */}
// //           <div
// //             className={`flex items-center justify-between p-6 border-b border-gray-100 ${
// //               isRTL ? "flex-row-reverse" : ""
// //             }`}
// //           >
// //             <div
// //               className={`flex items-center gap-3 ${
// //                 isRTL ? "flex-row-reverse" : ""
// //               }`}
// //             >
// //               <img src="/logo.png" alt="Guysh Logo" className="h-10 w-10" />
// //               <span className="text-xl font-bold text-[#193042]">GUYSH</span>
// //             </div>
// //             <button
// //               onClick={() => setMobileMenuOpen(false)}
// //               className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //             >
// //               <X size={24} />
// //             </button>
// //           </div>

// //           {/* User Info (if logged in) */}
// //           {isLoggedIn && (
// //             <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
// //               <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
// //                 <UserAvatar nameOrEmail={user.name || user.email} />
// //                 <div className={isRTL ? "text-right" : "text-left"}>
// //                   <p className="text-sm font-semibold text-gray-900 truncate">
// //                     {user.name || user.email}
// //                   </p>
// //                   <p className="text-xs text-gray-500 truncate">{user.email}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Navigation Items */}
// //           <nav className="flex-1 overflow-y-auto p-4">
// //             <div className="space-y-1">
// //               {navItems.map((item) => {
// //                 const Icon = item.icon;
// //                 return (
// //                   <button
// //                     key={item.path}
// //                     onClick={() => handleNavigation(item.path)}
// //                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#912211] transition-all duration-200 group ${
// //                       isRTL ? "flex-row-reverse text-right" : "text-left"
// //                     }`}
// //                   >
// //                     <Icon size={20} className="text-gray-500 group-hover:text-[#912211] transition-colors" />
// //                     <span className="text-sm font-medium flex-1">{item.label}</span>
// //                     <ChevronRight
// //                       size={18}
// //                       className={`text-gray-400 group-hover:text-[#912211] transition-all ${
// //                         isRTL ? "rotate-180" : ""
// //                       }`}
// //                     />
// //                   </button>
// //                 );
// //               })}

// //               {isLoggedIn && !isMember && !myProfile && (
// //                 <button
// //                   onClick={() => handleNavigation("/membership-form")}
// //                   className="w-full mt-4 bg-gradient-to-r from-[#6e9225] to-[#5a7a1e] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
// //                 >
// //                   {t("nav.finishProfile")}
// //                 </button>
// //               )}
// //             </div>

// //             {/* Language Switch - Mobile */}
// //             <div className="mt-6 pt-6 border-t border-gray-100">
// //               <div className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
// //                 <Globe size={18} className="text-gray-500" />
// //                 <span className="text-sm font-medium text-gray-700">
// //                   {t("nav.language") || "Language"}
// //                 </span>
// //               </div>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => changeLanguage("ar")}
// //                   className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
// //                     language === "ar"
// //                       ? "bg-[#193042] text-white shadow-md"
// //                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //                   }`}
// //                 >
// //                   العربية
// //                 </button>
// //                 <button
// //                   onClick={() => changeLanguage("en")}
// //                   className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
// //                     language === "en"
// //                       ? "bg-[#193042] text-white shadow-md"
// //                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //                   }`}
// //                 >
// //                   English
// //                 </button>
// //               </div>
// //             </div>

// //             {/* User Actions - Mobile */}
// //             {isLoggedIn && (
// //               <div className="mt-6 pt-6 border-t border-gray-100 space-y-1">
// //                 <button
// //                   onClick={() => handleNavigation("/my-profile")}
// //                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
// //                     isRTL ? "flex-row-reverse text-right" : "text-left"
// //                   }`}
// //                 >
// //                   <User size={20} className="text-gray-500" />
// //                   <span className="text-sm font-medium">{t("nav.viewProfile")}</span>
// //                 </button>

// //                 <button
// //                   onClick={() => {
// //                     handleDeleteProfile();
// //                     setMobileMenuOpen(false);
// //                   }}
// //                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
// //                     isRTL ? "flex-row-reverse text-right" : "text-left"
// //                   }`}
// //                 >
// //                   <Trash2 size={20} />
// //                   <span className="text-sm font-medium">{t("nav.deleteProfile")}</span>
// //                 </button>

// //                 <button
// //                   onClick={() => {
// //                     logout();
// //                     navigate("/");
// //                     setMobileMenuOpen(false);
// //                   }}
// //                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
// //                     isRTL ? "flex-row-reverse text-right" : "text-left"
// //                   }`}
// //                 >
// //                   <LogOut size={20} className="text-gray-500" />
// //                   <span className="text-sm font-medium">{t("nav.logout")}</span>
// //                 </button>
// //               </div>
// //             )}

// //             {!isLoggedIn && (
// //               <button
// //                 onClick={() => handleNavigation("/login")}
// //                 className="w-full mt-6 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
// //               >
// //                 {t("nav.login")}
// //               </button>
// //             )}
// //           </nav>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../data/AuthContext";
// import UserAvatar from "./UserAvatar";
// import { useTranslation } from "react-i18next";
// import { deleteProfile } from "../services/authService";
// import { 
//   User, 
//   Trash2, 
//   LogOut, 
//   Menu, 
//   X, 
//   ChevronRight,
//   Globe,
//   Info,
//   Briefcase,
//   GraduationCap,
//   Newspaper,
//   Calendar,
//   Shield
// } from "lucide-react";

// export default function Navbar() {
//   const { t } = useTranslation();
//   const {
//     user,
//     isLoggedIn,
//     logout,
//     myProfile,
//     language,
//     changeLanguage,
//   } = useAuth();
//   const isAdmin = user?.roles?.is_superuser;
//   const isMember = user?.roles?.is_member;
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const menuRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const isRTL = language === "ar";

//   // Close menu when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setMobileMenuOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [mobileMenuOpen]);

//   const handleDeleteProfile = async () => {
//     if (window.confirm(t("nav.confirmDelete"))) {
//       try {
//         await deleteProfile();
//         alert(t("nav.profileDeleted"));
//         logout();
//         navigate("/");
//       } catch (err) {
//         console.log("Cannot delete profile");
//       }
//     }
//   };

//   const navItems = [
//     { path: "/about", label: t("nav.about"), icon: Info },
//     { path: "/services", label: t("nav.services"), icon: Briefcase },
//     { path: "/universities", label: t("nav.universities"), icon: GraduationCap },
//     { path: "/news", label: t("nav.news"), icon: Newspaper },
//   ];

//   if (isLoggedIn && (isMember || isAdmin)) {
//     navItems.push({ path: "/events", label: t("nav.events"), icon: Calendar });
//   }

//   if (isLoggedIn && isAdmin) {
//     navItems.push({ path: "/admin", label: t("nav.admin"), icon: Shield });
//   }

//   const handleNavigation = (path) => {
//     navigate(path);
//     setMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <header className="sticky top-0 left-0 w-full bg-white/95 backdrop-blur-lg shadow-md z-50 border-b border-gray-100">
//         <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 sm:px-6">
//           {/* Logo - Position changes based on language */}
//           <div
//             className={`flex items-center space-x-3 cursor-pointer group ${
//               isRTL ? "order-3 flex-row-reverse space-x-reverse" : "order-3"
//             }`}
//             onClick={() => navigate("/")}
//           >
//             <div className="relative">
//               <img
//                 src="/logo.png"
//                 alt="Guysh Logo"
//                 className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform duration-300 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-[#193042] opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
//             </div>
//             <span className="text-xl font-bold text-[#193042] hidden sm:block tracking-tight">
//               GUYSH
//             </span>
//           </div>

//           {/* Desktop Navigation - Always in center */}
//           <nav
//             className={`hidden lg:flex items-center space-x-1 order-2 ${
//               isRTL ? "flex-row-reverse space-x-reverse" : ""
//             }`}
//           >
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.path}
//                   onClick={() => navigate(item.path)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#912211] hover:bg-gray-50 transition-all duration-200 ${
//                     isRTL ? "flex-row-reverse" : ""
//                   }`}
//                 >
//                   <Icon size={18} />
//                   <span>{item.label}</span>
//                 </button>
//               );
//             })}

//             {isLoggedIn && !isMember && !myProfile && (
//               <button
//                 onClick={() => navigate("/membership-form")}
//                 className="ml-2 bg-gradient-to-r from-[#6e9225] to-[#5a7a1e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
//               >
//                 {t("nav.finishProfile")}
//               </button>
//             )}
//           </nav>

//           {/* Right Side */}
//           <div
//             className={`flex items-center gap-3 sm:gap-4 ${
//               isRTL ? "flex-row-reverse" : ""
//             }`}
//           >
//             {/* Language Switch - Desktop */}
//             <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => changeLanguage("ar")}
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
//                   language === "ar"
//                     ? "bg-white text-[#912211] shadow-sm"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 AR
//               </button>
//               <button
//                 onClick={() => changeLanguage("en")}
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
//                   language === "en"
//                     ? "bg-white text-[#912211] shadow-sm"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 EN
//               </button>
//             </div>

//             {/* Auth Section */}
//             {!isLoggedIn ? (
//               <button
//                 className="bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
//                 onClick={() => navigate("/login")}
//               >
//                 {t("nav.login")}
//               </button>
//             ) : (
//               <div className="relative" ref={menuRef}>
//                 <button
//                   onClick={() => setMenuOpen(!menuOpen)}
//                   className="hover:opacity-80 transition-opacity duration-200"
//                 >
//                   <UserAvatar nameOrEmail={user.name || user.email} />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {menuOpen && (
//                   <div
//                     className={`absolute mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 transform transition-all duration-200 ease-out ${
//                       isRTL ? "right-0 origin-top-right" : "left-0 origin-top-left"
//                     }`}
//                   >
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-semibold text-gray-900 truncate">
//                         {user.name || user.email}
//                       </p>
//                       <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                     </div>

//                     <button
//                       onClick={() => {
//                         navigate("/my-profile");
//                         setMenuOpen(false);
//                       }}
//                       className={`w-full px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors ${
//                         isRTL ? "flex-row-reverse text-right" : "text-left"
//                       }`}
//                     >
//                       <User size={18} className="text-gray-500" />
//                       <span className="text-sm font-medium">{t("nav.viewProfile")}</span>
//                     </button>

//                     <button
//                       onClick={() => {
//                         handleDeleteProfile();
//                         setMenuOpen(false);
//                       }}
//                       className={`w-full px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors ${
//                         isRTL ? "flex-row-reverse text-right" : "text-left"
//                       }`}
//                     >
//                       <Trash2 size={18} />
//                       <span className="text-sm font-medium">{t("nav.deleteProfile")}</span>
//                     </button>

//                     <div className="border-t border-gray-100 my-1"></div>

//                     <button
//                       onClick={() => {
//                         logout();
//                         navigate("/");
//                         setMenuOpen(false);
//                       }}
//                       className={`w-full px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors ${
//                         isRTL ? "flex-row-reverse text-right" : "text-left"
//                       }`}
//                     >
//                       <LogOut size={18} className="text-gray-500" />
//                       <span className="text-sm font-medium">{t("nav.logout")}</span>
//                     </button>
//                     <div className="border-t border-gray-100 my-1"></div>
//                     <button
//                   onClick={() => {
//                     navigate("/rules-rights");
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{t("nav.rules-rights")}</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     navigate("/terms-conditions");
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{t("nav.term-cond")}</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     navigate("/privacy-policy");
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{t("nav.prpo")}</span>
//                 </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Sidebar Overlay */}
//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Sidebar */}
//       <div
//         ref={mobileMenuRef}
//         className={`fixed top-0 ${
//           isRTL ? "left-0" : "right-0"
//         } h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out ${
//           mobileMenuOpen
//             ? "translate-x-0"
//             : isRTL
//             ? "-translate-x-full"
//             : "translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Sidebar Header */}
//           <div
//             className={`flex items-center justify-between p-6 border-b border-gray-100 ${
//               isRTL ? "flex-row-reverse" : ""
//             }`}
//           >
//             <div
//               className={`flex items-center gap-3 ${
//                 isRTL ? "flex-row-reverse" : ""
//               }`}
//             >
//               <img src="/logo.png" alt="Guysh Logo" className="h-10 w-10" />
//               <span className="text-xl font-bold text-[#193042]">GUYSH</span>
//             </div>
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           {/* User Info (if logged in) */}
//           {isLoggedIn && (
//             <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
//               <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
//                 <UserAvatar nameOrEmail={user.name || user.email} />
//                 <div className={isRTL ? "text-right" : "text-left"}>
//                   <p className="text-sm font-semibold text-gray-900 truncate">
//                     {user.name || user.email}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation Items */}
//           <nav className="flex-1 overflow-y-auto p-4">
//             <div className="space-y-1">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.path}
//                     onClick={() => handleNavigation(item.path)}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#912211] transition-all duration-200 group ${
//                       isRTL ? "flex-row-reverse text-right" : "text-left"
//                     }`}
//                   >
//                     <Icon size={20} className="text-gray-500 group-hover:text-[#912211] transition-colors" />
//                     <span className="text-sm font-medium flex-1">{item.label}</span>
//                     <ChevronRight
//                       size={18}
//                       className={`text-gray-400 group-hover:text-[#912211] transition-all ${
//                         isRTL ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>
//                 );
//               })}

//               {isLoggedIn && !isMember && !myProfile && (
//                 <button
//                   onClick={() => handleNavigation("/membership-form")}
//                   className="w-full mt-4 bg-gradient-to-r from-[#6e9225] to-[#5a7a1e] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
//                 >
//                   {t("nav.finishProfile")}
//                 </button>
//               )}
//             </div>

//             {/* Language Switch - Mobile */}
//             <div className="mt-6 pt-6 border-t border-gray-100">
//               <div className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
//                 <Globe size={18} className="text-gray-500" />
//                 <span className="text-sm font-medium text-gray-700">
//                   {t("nav.language") || "Language"}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => changeLanguage("ar")}
//                   className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     language === "ar"
//                       ? "bg-[#193042] text-white shadow-md"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   العربية
//                 </button>
//                 <button
//                   onClick={() => changeLanguage("en")}
//                   className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     language === "en"
//                       ? "bg-[#193042] text-white shadow-md"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   English
//                 </button>
//               </div>
//             </div>

//             {/* User Actions - Mobile */}
//             {isLoggedIn && (
//               <div className="mt-6 pt-6 border-t border-gray-100 space-y-1">
//                 <button
//                   onClick={() => handleNavigation("/my-profile")}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <User size={20} className="text-gray-500" />
//                   <span className="text-sm font-medium">{t("nav.viewProfile")}</span>
//                 </button>

//                 <button
//                   onClick={() => {
//                     handleDeleteProfile();
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <Trash2 size={20} />
//                   <span className="text-sm font-medium">{t("nav.deleteProfile")}</span>
//                 </button>

//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/");
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <LogOut size={20} className="text-gray-500" />
//                   <span className="text-sm font-medium">{t("nav.logout")}</span>
//                 </button>
                
//               </div>
//             )}
//             {
//               <div className="mt-6 pt-6 border-t border-gray-100 space-y-1">
//                 <button
//                   onClick={() => {
//                     navigate("/rules-rights");
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{t("nav.rules-rights")}</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     navigate("/terms-conditions");
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{t("nav.term-cond")}</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     navigate("/privacy-policy");
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
//                     isRTL ? "flex-row-reverse text-right" : "text-left"
//                   }`}
//                 >
//                   <span className="text-sm font-medium">{t("nav.prpo")}</span>
//                 </button>
//               </div>
//             }


//             {!isLoggedIn && (
//               <button
//                 onClick={() => handleNavigation("/login")}
//                 className="w-full mt-6 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
//               >
//                 {t("nav.login")}
//               </button>
//             )}
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import UserAvatar from "./UserAvatar";
import { useTranslation } from "react-i18next";
import { deleteProfile } from "../services/authService";
import { 
  User, 
  Trash2, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Globe,
  Info,
  Briefcase,
  GraduationCap,
  Newspaper,
  Calendar,
  Shield,
  FileText,
  Lock
} from "lucide-react";

export default function Navbar() {
  const { t } = useTranslation();
  const {
    user,
    isLoggedIn,
    logout,
    myProfile,
    language,
    changeLanguage,
  } = useAuth();
  const isAdmin = user?.roles?.is_superuser;
  const isMember = user?.roles?.is_member;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const isRTL = language === "ar";

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  const handleDeleteProfile = async () => {
    if (window.confirm(t("nav.confirmDelete"))) {
      try {
        await deleteProfile();
        alert(t("nav.profileDeleted"));
        logout();
        navigate("/");
      } catch (err) {
        console.log("Cannot delete profile");
      }
    }
  };

  const navItems = [
    { path: "/about", label: t("nav.about"), icon: Info },
    { path: "/services", label: t("nav.services"), icon: Briefcase },
    { path: "/universities", label: t("nav.universities"), icon: GraduationCap },
    { path: "/news", label: t("nav.news"), icon: Newspaper },
  ];

  if (isLoggedIn && (isMember || isAdmin)) {
    navItems.push({ path: "/events", label: t("nav.events"), icon: Calendar });
  }

  if (isLoggedIn && isAdmin) {
    navItems.push({ path: "/admin", label: t("nav.admin"), icon: Shield });
  }

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full bg-white/95 backdrop-blur-lg shadow-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 sm:px-6">
          {/* Logo - Position changes based on language */}
          <div
            className={`flex items-center space-x-3 cursor-pointer group ${
              isRTL ? "order-3 flex-row-reverse space-x-reverse" : "order-1"
            }`}
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <img
                src="/logo.png"
                alt="Guysh Logo"
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#193042] opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold text-[#193042] hidden sm:block tracking-tight">
              GUYSH
            </span>
          </div>

          {/* Desktop Navigation - Always in center */}
          <nav
            className={`hidden lg:flex items-center space-x-1 order-2 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#912211] hover:bg-gray-50 transition-all duration-200 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {isLoggedIn && !isMember && !myProfile && (
              <button
                onClick={() => navigate("/membership-form")}
                className="ml-2 bg-gradient-to-r from-[#6e9225] to-[#5a7a1e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                {t("nav.finishProfile")}
              </button>
            )}
          </nav>

          {/* Right Side - Position changes based on language */}
          <div
            className={`flex items-center gap-3 sm:gap-4 ${
              isRTL ? "order-1 flex-row-reverse" : "order-3"
            }`}
          >
            {/* Language Switch - Desktop */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setSidebarOpen(false); // close before language change
                  changeLanguage("ar");
                }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  language === "ar"
                    ? "bg-white text-[#912211] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                AR
              </button>

              <button
                onClick={() => {
                  setSidebarOpen(false); // close before language change
                  changeLanguage("en");
                }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  language === "en"
                    ? "bg-white text-[#912211] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>

            </div>

            {/* Login Button (if not logged in) */}
            {!isLoggedIn && (
              <button
                className="hidden sm:block bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => navigate("/login")}
              >
                {t("nav.login")}
              </button>
            )}

            {/* Menu Button - Always visible */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out transform
          ${isRTL ?  "left-0" :"right-0"}
          ${sidebarOpen ? "translate-x-0" : isRTL ? "-translate-x-full" : "translate-x-full"}
        `}
        style={{ transitionProperty: "transform" }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div
            className={`flex items-center justify-between p-6 border-b border-gray-100 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex items-center gap-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <img src="/logo.png" alt="Guysh Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-[#193042]">GUYSH</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info (if logged in) */}
          {isLoggedIn && (
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <UserAvatar nameOrEmail={user.name || user.email} />
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#912211] transition-all duration-200 group ${
                      isRTL ? "flex-row-reverse text-right" : "text-left"
                    }`}
                  >
                    <Icon size={20} className="text-gray-500 group-hover:text-[#912211] transition-colors" />
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    <ChevronRight
                      size={18}
                      className={`text-gray-400 group-hover:text-[#912211] transition-all ${
                        isRTL ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                );
              })}

              {isLoggedIn && !isMember && !myProfile && (
                <button
                  onClick={() => handleNavigation("/membership-form")}
                  className="w-full mt-4 bg-gradient-to-r from-[#6e9225] to-[#5a7a1e] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
                >
                  {t("nav.finishProfile")}
                </button>
              )}
            </div>

            {/* Language Switch - Mobile */}
            <div className="mt-6 pt-6 border-t border-gray-100 sm:hidden">
              <div className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Globe size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {t("nav.language") || "Language"}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => changeLanguage("ar")}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    language === "ar"
                      ? "bg-[#193042] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  العربية
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    language === "en"
                      ? "bg-[#193042] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* User Actions - If logged in */}
            {isLoggedIn && (
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-1">
                <button
                  onClick={() => handleNavigation("/my-profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}
                >
                  <User size={20} className="text-gray-500" />
                  <span className="text-sm font-medium">{t("nav.viewProfile")}</span>
                </button>

                <button
                  onClick={() => {
                    handleDeleteProfile();
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}
                >
                  <Trash2 size={20} />
                  <span className="text-sm font-medium">{t("nav.deleteProfile")}</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}
                >
                  <LogOut size={20} className="text-gray-500" />
                  <span className="text-sm font-medium">{t("nav.logout")}</span>
                </button>
              </div>
            )}

            {/* Legal & Information Links - Always visible */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-1">
              <button
                onClick={() => handleNavigation("/rules-rights")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                  isRTL ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <User size={20} className="text-gray-500" />
                <span className="text-sm font-medium">{t("nav.rules-rights")}</span>
              </button>
              
              <button
                onClick={() => handleNavigation("/terms-conditions")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                  isRTL ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <FileText size={20} className="text-gray-500" />
                <span className="text-sm font-medium">{t("nav.term-cond")}</span>
              </button>
              
              <button
                onClick={() => handleNavigation("/privacy-policy")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                  isRTL ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <Lock size={20} className="text-gray-500" />
                <span className="text-sm font-medium">{t("nav.prpo")}</span>
              </button>
            </div>

            {/* Login Button - If not logged in */}
            {!isLoggedIn && (
              <button
                onClick={() => handleNavigation("/login")}
                className="w-full mt-6 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
              >
                {t("nav.login")}
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}