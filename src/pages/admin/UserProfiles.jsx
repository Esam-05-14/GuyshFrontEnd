// import { useState } from "react";
// import { useAuth } from "../../data/AuthContext";
// import { Link } from "react-router-dom";

// function UserProfiles() {
//   const auth = useAuth();
//   const profiles = auth.profiles;

//   // Track which user's menu is open
  

  

//   return (
//     <div className="bg-[#f8f9fa]  min-h-screen px-8 py-10">
//       {/* Header */}
      

//       {/* Users Table */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//         <table className="min-w-full text-left border-collapse">
//           <thead className="bg-[#193042] text-white">
//             <tr>
//               <th className="py-3 px-5 border-b border-gray-200">Username</th>
              
//               <th className="py-3 px-5 border-b border-gray-200 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {profiles.length > 0 ? (
//               profiles.map((u, idx) => (
//                 <tr
//                   key={idx}
//                   className="hover:bg-gray-50 transition-colors border-b last:border-0"
//                 >
//                   <td className="py-3 px-5">{u.english_name}</td>
                  
//                   <td className="py-3 px-5 text-center relative">
//                     <Link
//                       to={`/admin/profiles/${u.id}`}
//                       state={{ user: u }}
//                       className="bg-[#193042] text-white px-4 py-2 rounded-md hover:bg-[#234b6a] transition inline-block text-center"
//                     >
//                       View
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No users available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default UserProfiles;

import { useEffect, useState } from "react";
import { useAuth } from "../../data/AuthContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Users, 
  Search, 
  Eye, 
  Filter,
  UserCheck,
  UserX,
  Mail,
  Phone,
  GraduationCap
} from "lucide-react";
import { getUsersProfiles_id, getUsersProfiles } from "../../services/authService";
import React from "react";

function UserProfiles() {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [profiles, setProfiles] = useState([]);
  
  useEffect(  () => {
      const  fetchData = async () =>{ 
        try{
          const data = await getUsersProfiles();
          setProfiles(data);
        }catch(error){
          console.log(error);
        }
      }
    fetchData();
  },[]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, member, non-member

  // Filter profiles based on search and status
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = 
      profile.english_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.arabic_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" ? true :
      statusFilter === "member" ? profile.is_member :
      statusFilter === "non-member" ? !profile.is_member : true;
    
    return matchesSearch && matchesStatus;
  });
  const [user , setUser] = useState(null);
    // Fetch the user data by id
    const fetchUser = async (id) => {
      try {
        const data = await getUsersProfiles_id(id);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div>
            <h1 className="text-3xl font-bold text-[#193042] mb-2">
              {t("userProfiles.title")}
            </h1>
            <p className="text-gray-600">
              {t("userProfiles.subtitle")} ({filteredProfiles.length} {t("userProfiles.users")})
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className={`bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} size={20} />
            <input
              type="text"
              placeholder={t("userProfiles.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-[#193042] focus:border-transparent outline-none ${isRTL ? "pr-10 text-right" : "pl-10"}`}
            />
          </div>

          {/* Status Filter */}
          <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-[#193042] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("userProfiles.all")}
            </button>
            <button
              onClick={() => setStatusFilter("member")}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                statusFilter === "member"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <UserCheck size={18} />
              <span className="hidden sm:inline">{t("userProfiles.members")}</span>
            </button>
            <button
              onClick={() => setStatusFilter("non-member")}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                statusFilter === "non-member"
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <UserX size={18} />
              <span className="hidden sm:inline">{t("userProfiles.nonMembers")}</span>
            </button>
          </div>
        </div>

        {/* Users Cards - Mobile/Tablet View */}
        <div className="lg:hidden space-y-4">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#193042]"
              >
                <div className="p-5">
                  {/* Name and Status */}
                  <div className={`flex items-start justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <h3 className="text-lg font-bold text-[#193042] mb-1">
                        {profile.english_name || t("userProfiles.noName")}
                      </h3>
                      {profile.arabic_name && (
                        <p className="text-sm text-gray-600 mb-2">
                          {profile.arabic_name}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      profile.is_member
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {profile.is_member ? t("userProfiles.member") : t("userProfiles.nonMember")}
                    </span>
                  </div>

                  {/* Info
                  <div className="space-y-2 mb-4">
                    {profile.email && (
                      <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Mail size={16} className="text-gray-400" />
                        <span className="truncate">{profile.email}</span>
                      </div>
                    )}
                    {profile.phone && (
                      <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Phone size={16} className="text-gray-400" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                    {profile.university && (
                      <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <GraduationCap size={16} className="text-gray-400" />
                        <span className="truncate">{profile.university}</span>
                      </div>
                    )}
                  </div> */}

                  {/* Action Button */}
                  <Link
                    to={`/admin/profiles/${profile.id}`}
                    state={{ user: profile }}
                    className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#193042] to-[#254e6f] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Eye size={18} />
                    <span>{t("userProfiles.viewProfile")}</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Users className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">{t("userProfiles.noUsers")}</p>
            </div>
          )}
        </div>

        {/* Users Table - Desktop View */}
        <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-[#193042] to-[#254e6f] text-white">
              <tr>
                <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("userProfiles.name")}
                </th>
                {/* <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("userProfiles.email")}
                </th>
                <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("userProfiles.phone")}
                </th>
                <th className={`py-4 px-6 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                  {t("userProfiles.university")}
                </th> */}
                <th className="py-4 px-6 font-semibold text-center">
                  {t("userProfiles.status")}
                </th>
                <th className="py-4 px-6 font-semibold text-center">
                  {t("userProfiles.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile, idx) => (
                  <tr
                    key={profile.id}
                    className="hover:bg-gray-50 transition-colors border-b last:border-0"
                  >
                    <td className={`py-4 px-6 ${isRTL ? "text-right" : "text-left"}`}>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {profile.english_name || t("userProfiles.noName")}
                        </p>
                        {profile.arabic_name && (
                          <p className="text-sm text-gray-500">{profile.arabic_name}</p>
                        )}
                      </div>
                    </td>
                    {/* <td className={`py-4 px-6 text-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Mail size={16} className="text-gray-400" />
                        <span className="truncate max-w-[200px]">{profile.email || "-"}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-6 text-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Phone size={16} className="text-gray-400" />
                        <span>{profile.phone || "-"}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-6 text-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <GraduationCap size={16} className="text-gray-400" />
                        <span className="truncate max-w-[180px]">{profile.university || "-"}</span>
                      </div>
                    </td> */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        profile.is_member
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {profile.is_member ? t("userProfiles.member") : t("userProfiles.nonMember")}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/admin/profiles/${profile.id}`}
                        state={{ user: profile }}
                        className="inline-flex items-center gap-2 bg-[#193042] text-white px-4 py-2 rounded-lg hover:bg-[#254e6f] transition-colors font-medium"
                      >
                        <Eye size={18} />
                        <span>{t("userProfiles.view")}</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12"
                  >
                    <Users className="mx-auto text-gray-300 mb-4" size={64} />
                    <p className="text-gray-500 text-lg">{t("userProfiles.noUsers")}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserProfiles;