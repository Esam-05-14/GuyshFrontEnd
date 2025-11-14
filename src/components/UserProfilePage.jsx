import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "../i18n";
import { getUsersProfiles_id } from "../services/authService";
export default function UserProfilePage() {
  const { universities } = useAuth();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  
  const { t } = useTranslation();
  const [user , setUser] = useState(null);
  useEffect(() => {
    // Fetch the user data by id
    const fetchUser = async () => {
      try {
        const data = await getUsersProfiles_id(id);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);


  // useEffect(() => {
  //     if (i18n.language === "ar") {
  //       document.body.dir = "rtl";
  //       document.body.style.textAlign = "right";
  //     } else {
  //       document.body.dir = "ltr";
  //       document.body.style.textAlign = "left";
  //     }
  //   }, [i18n.language]);

  const universityName =
    user?.university?.name ||
    universities.find((u) => u.id === user?.university)?.name ||
    t("userProfile.notAvailable");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-200 flex justify-center items-center p-8">
      <div className="bg-[#193042] rounded-2xl shadow-lg p-8 w-full max-w-3xl border border-gray-700">
        <h1 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-3 text-center">
          {t("userProfile.title")}
        </h1>

        <div className="space-y-4 text-gray-200">
          {/* English Name */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">
              {t("userProfile.englishName")}
            </span>
            <span>{user?.english_name || t("userProfile.notAvailable")}</span>
          </div>

          {/* Arabic Name */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">
              {t("userProfile.arabicName")}
            </span>
            <span dir="rtl" className="text-right">
              {user?.arabic_name || t("userProfile.notAvailable")}
            </span>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">
              {t("userProfile.phoneNumber")}
            </span>
            <span>{user?.phone_number || t("userProfile.notAvailable")}</span>
          </div>

          {/* Address */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">
              {t("userProfile.address")}
            </span>
            <span className="text-right">
              {user?.address || t("userProfile.notAvailable")}
            </span>
          </div>

          {/* RP Number */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">
              {t("userProfile.rpNumber")}
            </span>
            <span>{user?.rp_number || t("userProfile.notAvailable")}</span>
          </div>

          {/* University */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">
              {t("userProfile.university")}
            </span>
            <span>{universityName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React from "react";
// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../data/AuthContext";
// export default function UserProfilePage() {
//   const {universities } = useAuth();
//   const { id } = useParams();
//   const location = useLocation();
//   const user = location.state?.user ;
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-200 flex justify-center items-center p-8">
//       <div className="bg-[#193042] rounded-2xl shadow-lg p-8 w-full max-w-3xl border border-gray-700">
//         <h1 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-3 text-center">
//           User Profile Information
//         </h1>

//         <div className="space-y-4 text-gray-200">
          

//           {/* English Name */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">English Name:</span>
//             <span>{user.english_name}</span>
//           </div>

//           {/* Arabic Name */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">Arabic Name:</span>
//             <span dir="rtl" className="text-right">{user.arabic_name}</span>
//           </div>

//           {/* Phone Number */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">Phone Number:</span>
//             <span>{user.phone_number}</span>
//           </div>

//           {/* Address */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">Address:</span>
//             <span className="text-right">{user.address}</span>
//           </div>

//           {/* RP Number */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">RP Number:</span>
//             <span>{user.rp_number}</span>
//           </div>

//           {/* University */}
//           <div className="flex justify-between border-b border-gray-700 pb-2">
//             <span className="font-semibold text-gray-400">University:</span>
//             <span>{user.university || universities.find(u => u.id === user.university)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
